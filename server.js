// const express = require('express');
// const bodyParser = require('body-parser');
// const html_routes = require('./routes/html-routes');
// const api_routes = require('./routes/api-routes');

// const PORT = process.env.PORT || 3001;
// const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(express.static("public"));
// app.use(html_routes);
// app.use(api_routes);

// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });

// module.exports = app;

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const html_routes = require('./routes/html-routes');
const api_routes = require('./routes/api-routes');

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use(html_routes);
app.use(api_routes);

// Root Route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;

