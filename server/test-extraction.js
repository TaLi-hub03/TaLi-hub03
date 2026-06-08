const fs = require('fs');
const pdf = require('pdf-parse');

async function testPdf() {
    const dataBuffer = fs.readFileSync('test.pdf');
    const data = await pdf(dataBuffer);
    console.log('Extracted text length:', data.text.length);
    console.log('Preview:', data.text.substring(0, 100));
}

// Create a dummy text file to test
fs.writeFileSync('test.txt', 'This is a test academic material about Artificial Intelligence.');

async function testText() {
    const text = fs.readFileSync('test.txt', 'utf8');
    console.log('Extracted text:', text);
}

testText();
// testPdf(); // Need a real pdf file for this
