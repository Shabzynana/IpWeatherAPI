const express = require('express');
const app = express();
app.set('trust proxy', true)

// app.get('api/hellovisitor_name/:name', (req, res) => {
//     const client_ip = req.ip;
//     const {name} = req.params;
//     // const username = req.query.username || 'Unknown User';  // Get the username from query parameters
//     res.json({ client_ip: client_ip, 'greeting':  `Hello, ${name}`, name });
// });

app.get('/api/hello', (req, res) => {
    const visitorName = req.query.visitor_name || 'Guest';
    const client_ip = req.ip;
    const greeting = `Hello, ${visitorName}!`;
    res.json({ client_ip: client_ip, greeting: greeting });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});