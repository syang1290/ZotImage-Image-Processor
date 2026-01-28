require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const imageRoutes = require('./routes/imageRoutes');

const upload = require('./middleware/upload');
const authenticateToken = require('./middleware/authMiddleware');
const authController = require('./controllers/authController');
const ImageModel = require('./models/imageModel');
const { transformImage } = require('./services/imageService');

const app = express();
const PORT = process.env.PORT || 5000;
app.use('/api/auth', authRoutes); 
app.use('/api/images', imageRoutes); 

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.post('/api/register', authController.register);
app.post('/api/login', authController.login);

app.post('/api/images/upload', authenticateToken, upload.single('image'), async (req, res) => {
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

app.post('/api/images/transform', authenticateToken, async (req, res) => {
    try {
        const { filename, transformations } = req.body;
        const inputPath = path.join(__dirname, '../uploads', filename);
        
        const result = await transformImage(inputPath, transformations);
        
        const savedImage = await ImageModel.create(
            req.user.id, 
            result.filename, 
            filename, 
            transformations
        );

        res.json(savedImage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => console.log(`🚀 Server on http://localhost:${PORT}`));