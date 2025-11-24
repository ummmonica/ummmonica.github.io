# Solar System Explorer - Express Web Application

A web application built with Express.js and EJS that showcases information about planets in our solar system.

## Features
- Browse all planets in the solar system
- View detailed information about each planet
- Dynamic background images from Unsplash API
- Responsive navigation
- Uses npm-solarsystem package for planet data

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Add Solar System Image**
   - Place your solar system image named `system.jpg` in the `public/img/` folder

3. **Run the Application**
   ```bash
   npm start
   ```
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

4. **Access the Application**
   Open your browser and navigate to: `http://localhost:3000`

## Project Structure
```
solarSystemApp/
├── index.mjs              # Main Express server file
├── package.json           # Project dependencies
├── public/
│   ├── css/
│   │   └── styles.css     # Stylesheet
│   └── img/
│       └── system.jpg     # Main solar system image (add your own)
└── views/
    ├── partials/
    │   ├── head.ejs       # HTML head section
    │   ├── nav.ejs        # Navigation menu
    │   └── footer.ejs     # Footer section
    ├── index.ejs          # Home page
    ├── mercury.ejs        # Mercury planet page
    ├── venus.ejs          # Venus planet page
    ├── earth.ejs          # Earth planet page
    ├── mars.ejs           # Mars planet page
    ├── jupiter.ejs        # Jupiter planet page
    ├── saturn.ejs         # Saturn planet page
    ├── uranus.ejs         # Uranus planet page
    ├── neptune.ejs        # Neptune planet page
    └── pluto.ejs          # Pluto page
```

## Technologies Used
- **Express.js** - Web application framework
- **EJS** - Templating engine
- **npm-solarsystem** - Planet data package
- **node-fetch** - For API requests to Unsplash
- **Unsplash API** - Random background images

## Course Information
CST336 Internet Programming
California State University Monterey Bay
