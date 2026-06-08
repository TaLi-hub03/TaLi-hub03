const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { exec } = require('child_process');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

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

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.post('/api/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
        const { filename, mimetype } = req.file;
        const query = `INSERT INTO study_materials (filename, file_type, status) VALUES ('${filename}', '${mimetype}', 'pending')`;
        await runQuery(query);
        res.json({ message: 'File uploaded successfully', filename });
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
