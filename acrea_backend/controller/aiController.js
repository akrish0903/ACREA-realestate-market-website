const { spawn } = require('child_process');
const path = require('path');

const predictPrice = async (req, res) => {
    try {
        const {
            userListingType,
            usrListingSquareFeet,
            location,
            usrExtraFacilities,
            usrAmenities,
            ageOfProperty,
            commercialZone,
            gatedCommunity,
            floorNumber
        } = req.body;

        // Prepare input data for the model
        const inputData = {
            property_type: userListingType,
            square_feet: usrListingSquareFeet,
            city: location.city,
            state: location.state,
            beds: usrExtraFacilities.beds,
            baths: usrExtraFacilities.bath,
            amenities_count: usrAmenities.length,
            age_of_property: ageOfProperty,
            floor_level: floorNumber,
            commercial_zone: commercialZone ? 1 : 0,
            gated_community: gatedCommunity ? 1 : 0
        };

        // Spawn Python process
        const pythonProcess = spawn('python', [
            path.join(__dirname, '../ai/predict.py'),
            JSON.stringify(inputData)
        ]);

        let result = '';

        pythonProcess.stdout.on('data', (data) => {
            result += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error(`Error: ${data}`);
        });

        pythonProcess.on('close', (code) => {
            if (code !== 0) {
                return res.status(500).json({ error: 'Price prediction failed' });
            }
            const predictedPrice = parseFloat(result.trim());
            res.json({ predictedPrice });
        });

    } catch (error) {
        console.error('Price prediction error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    predictPrice
}; 