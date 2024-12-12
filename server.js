const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json()); // For parsing JSON in POST requests
const PORT = 8000; // Choose any available port

// In-memory storage for nearby ships data
const nearbyShipsData = {};

// Serve the AIS data CSV file
app.get('/ais_data', (req, res) => {
    try {
        const filePath = path.resolve("D:/VSCode/SIH_FINAL_AIS_SATE/merged_output_with_paths.csv");
        console.log(`Serving AIS data from: ${filePath}`);
        res.sendFile(filePath);
    } catch (error) {
        console.error(error);
        res.status(404).send("File not found");
    }
});

// Serve the specific image (predicted_mask.tiff)
app.get('/image', (req, res) => {
    try {
        const folderPath = req.query.path; // Get folder path from query
        if (!folderPath) {
            return res.status(400).send("No path specified");
        }

        // Append the file name
        const imagePath = path.resolve(folderPath, 'predicted_mask.jpg');

        // Check if the file exists
        if (fs.existsSync(imagePath)) {
            console.log(`Serving image from: ${imagePath}`);
            res.sendFile(imagePath);
        } else {
            res.status(404).send(`File not found: ${imagePath}`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});

// Endpoint to store nearby ships data
app.get('/nearby_ships', (req, res) => {
    try {
        // const filePath = path.resolve("D:\\VSCode\\OilSpill\\nearby_ships_220634000.csv");
        const filePath = path.resolve(req.query.file_path);
        res.sendFile(filePath);
    } catch (error) {
        console.error(error);
        res.status(404).send("File not found");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
