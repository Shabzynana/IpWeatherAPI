const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();require
('dotenv').config();


// 
app.use(cors());
app.set('trust proxy', true)

const apiKey = process.env.api_Key;
const weatherApiKey = process.env.weatherApi_Key;

app.get('/api/hello', async (req, res, next) => {

    try{
        const client_ip = req.headers['x-forwarded-for'] || req.ip;;

        const visitorName = req.query.visitor_name || 'Guest';


        // Get location data from IPGeolocation API
        // const response = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${client_ip}`);
        const response = await axios.get(`https://ipapi.co/${client_ip}/json/`);
        const location = response.data;

        // Get weather data from OpenWeatherMap API
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&units=metric&appid=${weatherApiKey}`);
        const weather = weatherResponse.data;

        const greeting = `Hello, ${visitorName}!, the temperature is ${weather.main.temp} degrees Celsius in ${location.city}.`;

        res.json({ client_ip: client_ip,          
            location: location.city,
            greeting: greeting,
         });
    } catch (error) {
        next(error);
    }
    
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});