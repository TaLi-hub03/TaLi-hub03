const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { exec } = require('child_process');
const fs = require('fs');
const pdf = require('pdf-parse');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.use(cors());
app.use(express.json());

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

const runQuery = (query) => {
    return new Promise((resolve, reject) => {
        const command = `team-db "${query.replace(/"/g, '\\"')}"`;
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return reject(error);
            }
            try {
                const result = JSON.parse(stdout);
                resolve(result);
            } catch (e) {
                resolve(stdout);
            }
        });
    });
};

const processFile = async (filePath, fileType) => {
    let text = '';
    if (fileType === 'application/pdf') {
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdf(dataBuffer);
        text = data.text;
    } else {
        text = fs.readFileSync(filePath, 'utf8');
    }

    const prompt = `
        Analyze the following academic material and provide:
        1. A concise summary.
        2. A list of key concepts.
        3. A structured study guide.

        Material:
        ${text.substring(0, 30000)} // Limit text length for safety
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiText = response.text();

    // Simple parsing (could be improved with JSON mode)
    const sections = aiText.split('\n\n');
    const summary = sections.find(s => s.toLowerCase().includes('summary')) || 'Summary not found';
    const keyConcepts = sections.find(s => s.toLowerCase().includes('key concepts')) || 'Key concepts not found';
    const studyGuide = aiText; // Use full text as study guide for now

    return { summary, keyConcepts, studyGuide, content: text };
};

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.post('/api/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const { filename, mimetype, path: filePath } = req.file;

    try {
        // Initial DB entry
        const insertQuery = `INSERT INTO study_materials (filename, file_type, status) VALUES ('${filename}', '${mimetype}', 'processing')`;
        const result = await runQuery(insertQuery);
        // team-db doesn't return the lastID easily in the JSON output we see, so we might need a workaround or just query by filename
        
        // Start background processing
        processFile(filePath, mimetype).then(async (aiData) => {
            const updateQuery = `UPDATE study_materials SET 
                status = 'completed', 
                content = '${aiData.content.replace(/'/g, "''")}', 
                summary = '${aiData.summary.replace(/'/g, "''")}', 
                key_concepts = '${aiData.key_concepts?.replace(/'/g, "''") || aiData.keyConcepts.replace(/'/g, "''")}', 
                study_guide = '${aiData.studyGuide.replace(/'/g, "''")}' 
                WHERE filename = '${filename}'`;
            await runQuery(updateQuery);
        }).catch(async (error) => {
            console.error('Processing error:', error);
            const errorQuery = `UPDATE study_materials SET status = 'error' WHERE filename = '${filename}'`;
            await runQuery(errorQuery);
        });

        res.json({ message: 'File uploaded and processing started', filename });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to save to database' });
    }
});

app.get('/api/materials', async (req, res) => {
    try {
        const query = `SELECT * FROM study_materials ORDER BY created_at DESC`;
        const materials = await runQuery(query);
        res.json(materials);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch materials' });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});
