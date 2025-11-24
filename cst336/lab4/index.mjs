// import Express framework
import express from 'express';
import fetch from 'node-fetch';

// mport the solar system package for planet data
const planets = (await import('npm-solarsystem')).default;

// Initialize  application
const app = express();

// config ejs as the templating engine
app.set("view engine", "ejs");

// static files from the public directory
app.use(express.static("public"));

// displays main solar system page with random background (root)
app.get('/', async(req, res) => {
    let apiKey = "7756a1e81f817c186cf57294e1c19b37b49c54b8f34e7c499ee0ce5cd86cd16e";
    let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&featured=true&query=solar-system`;
    let response = await fetch(apiUrl);
    let jsonData = await response.json();
    let backgroundImg = jsonData.urls.full;
    res.render("index", {backgroundImg});
});

// Mercury route
app.get('/mercury', (req, res) => {
    let planetData = planets.getMercury();
    res.render('mercury', {planetData});
});

// Venus route
app.get('/venus', (req, res) => {
    let planetData = planets.getVenus();
    res.render('venus', {planetData});
});

// Earth route
app.get('/earth', (req, res) => {
    let planetEarth = planets.getEarth();
    console.log(planetEarth);
    res.render('earth', {planetEarth});
});

// Mars route
app.get('/mars', (req, res) => {
    let planetMars = planets.getMars();
    res.render('mars', {planetMars});
});

// Jupiter route
app.get('/jupiter', (req, res) => {
    let planetData = planets.getJupiter();
    res.render('jupiter', {planetData});
});

// Saturn route
app.get('/saturn', (req, res) => {
    let planetData = planets.getSaturn();
    res.render('saturn', {planetData});
});

// Uranus route
app.get('/uranus', (req, res) => {
    let planetData = planets.getUranus();
    res.render('uranus', {planetData});
});

// Neptune route
app.get('/neptune', (req, res) => {
    let planetData = planets.getNeptune();
    res.render('neptune', {planetData});
});

// Pluto route (dwarf planet)
app.get('/pluto', (req, res) => {
    let planetData = planets.getPluto();
    res.render('pluto', {planetData});
});

// Start server on port 3000
app.listen(3000, () => {
    console.log('Express server is running on port 3000');
});
