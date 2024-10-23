// On the back end, the application should include a searchHistory.json file that will be used to store and retrieve cities using the fs module.

// The following HTML route should be created:

// GET * should return the index.html file.
// The following API routes should be created:

// GET /api/weather/history should read the searchHistory.json file and return all saved cities as JSON.

// POST /api/weather should receive a city name to save on the request body, add it to the searchHistory.json file, and then return associated weather data to the client. You'll need to find a way to give each city name a unique id when it's saved (look into npm packages that could do this for you).

// Refer to the Full-Stack Blog on deploying to Render https://coding-boot-camp.github.io/full-stack/render/render-deployment-guide
// and the Render documentation on setting environment variables https://docs.render.com/configure-environment-variables.https://docs.render.com/configure-environment-variables
