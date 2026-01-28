const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const authenticateToken = require('../middleware/authMiddleware');
const ImageModel = require('../models/imageModel');
const { transformImage } = require('../services/imageService');
const path = require('path');

router.get('/', authenticateToken, async (req, res) => {
    try {
        const images = await ImageModel.findByUser(req.user.id);
        res.json(images);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/upload', authenticateToken, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: "No file uploaded" });

        const savedImage = await ImageModel.create(
            req.user.id, 
            req.file.filename, 
            req.file.originalname, 
            {}
        );
        res.status(201).json(savedImage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;