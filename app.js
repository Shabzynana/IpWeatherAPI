const express = require('express');
const app = express();


app.set('trust proxy', true)


app.get('/api/hello', (req, res, next) => {

    try{
        const visitorName = req.query.visitor_name || 'Guest';
        const client_ip = req.headers['x-forwarded-for'] || req.ip;;
        const greeting = `Hello, ${visitorName}!`;
        res.json({ client_ip: client_ip, greeting: greeting });
    } catch (error) {
        next(error);
    }
    
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});