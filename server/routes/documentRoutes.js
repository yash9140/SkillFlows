const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const textract = require('textract');
const axios = require('axios');
const dotenv = require('dotenv');
const Document = require('../models/Document');

require('dotenv').config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Upload document and save metadata
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const doc = new Document({
      originalname: req.file.originalname,
      filename: req.file.filename,
      uploadedBy: req.user?.id || 'admin', // Adjust as needed
    });
    await doc.save();
    res.json({ filename: req.file.filename, originalname: req.file.originalname });
  } catch (err) {
    res.status(500).json({ error: 'Failed to upload document', details: err.message });
  }
});

// List all documents
router.get('/list', async (req, res) => {
  try {
    const docs = await Document.find().sort({ uploadedAt: -1 });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch documents', details: err.message });
  }
});

// Summarise document using OpenAI
router.post('/summarise', async (req, res) => {
  const { filename } = req.body;
  const filePath = path.join(__dirname, '../uploads', filename);

  let text = '';
  const ext = path.extname(filename).toLowerCase();

  try {
    if (ext === '.pdf') {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdfParse(dataBuffer);
      text = data.text;
    } else if (ext === '.docx') {
      const data = await mammoth.extractRawText({ path: filePath });
      text = data.value;
    } else if (ext === '.txt') {
      text = fs.readFileSync(filePath, 'utf8');
    } else {
      // fallback for other types
      text = await new Promise((resolve, reject) => {
        textract.fromFileWithPath(filePath, (err, txt) => {
          if (err) reject(err);
          else resolve(txt);
        });
      });
    }

    // Call OpenAI API
    const openaiRes = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: `Summarise the following document for a student in simple, clear points:\n\n${text}`,
          },
        ],
        max_tokens: 500,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const summary = openaiRes.data.choices[0].message.content;
    res.json({ summary });
  } catch (err) {
    res.status(500).json({ error: 'Failed to summarise document', details: err.message });
  }
});

module.exports = router;