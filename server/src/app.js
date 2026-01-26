const ImageModel = require('./models/imageModel');

app.post('/api/images/transform', async (req, res) => {
    try {
        const { filename, transformations } = req.body;
        const inputPath = path.join(__dirname, '../uploads', filename);

        const result = await transformImage(inputPath, transformations);

        const savedImage = await ImageModel.create(
            1, 
            result.filename, 
            filename, 
            transformations
        );

        res.json({
            message: "Transformation successful and saved to DB",
            data: savedImage,
            url: `http://localhost:${process.env.PORT}/uploads/${result.filename}`
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});