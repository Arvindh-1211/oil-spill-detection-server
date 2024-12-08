const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors())
const PORT = 8000; // You can choose any available port

// Serve the CSV file
app.get('/ais_data', (req, res) => {
    try {
        res.sendFile(path.join("D:\\VSCode\\SIH_FINAL_AIS_SATE\\merged_output_with_paths.csv"))
    } catch (error) {
        res.send("File not found")
        console.log(error);
    }
});

app.get('/image', (req, res) => {
    try {
        const file_path = req.query.path
        res.sendFile(path.join(file_path, 'predicted_mask.jpg'))
    } catch (error) {
        res.send(`File not found in path ${path.join(req.query.path, 'predicted_mask.jpg')}`)
        console.log(error);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});