// controllers/routeDataController.js
const fs = require('fs');
const path = require('path');

exports.getRouteData = (req, res) => {
    const filePath = path.join(__dirname, '../data/routeData.json'); // Adjust the path if needed

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading route data:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        try {
            const routeData = JSON.parse(data); // Parse JSON data
            res.json(routeData); // Send JSON response
        } catch (parseError) {
            console.error('Error parsing JSON data:', parseError);
            res.status(500).json({ message: 'Error parsing route data' });
        }
    });
};
