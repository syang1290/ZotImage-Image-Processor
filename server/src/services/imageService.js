const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;


const transformImage = async (inputPath, transformations) => {
    const { width, height, format, greyscale, rotate } = transformations;
    
    const outputFilename = `processed-${Date.now()}.${format || 'webp'}`;
    const outputPath = path.join(__dirname, '../../uploads', outputFilename);

    let pipeline = sharp(inputPath);

    if (width || height) {
        pipeline = pipeline.resize(
            parseInt(width) || null, 
            parseInt(height) || null
        );
    }

    if (greyscale === 'true' || greyscale === true) {
        pipeline = pipeline.grayscale();
    }

    if (rotate) {
        pipeline = pipeline.rotate(parseInt(rotate));
    }

    if (format) {
        pipeline = pipeline.toFormat(format);
    } else {
        pipeline = pipeline.toFormat('webp');
    }

    await pipeline.toFile(outputPath);
    
    return {
        filename: outputFilename,
        path: outputPath
    };
};

module.exports = { transformImage };