// index.js
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to check if the request is within working hours
function checkWorkingHours(req, res, next) {
    const now = new Date();
    const day = now.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday
    const hour = now.getHours();

    // Check if it's Monday to Friday and between 9 and 17
    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        next();
    } else {
        res.status(403).send('Sorry, the application is only available during working hours (Monday to Friday, 9 AM to 5 PM).');
    }
}

// Apply middleware
app.use(checkWorkingHours);

// Set up static file serving
app.use(express.static(path.join(__dirname, 'public')));

// Set up EJS for templating
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/services', (req, res) => {
    res.render('services');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
