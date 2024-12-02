// index.js
// where your node app starts

const express = require("express");
const cors = require("cors");
const app = express();

// Enable CORS
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files
app.use(express.static("public"));

// Serve the index.html file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// API endpoint for timestamp
app.get("/api/:date?", (req, res) => {
  const dateParam = req.params.date;

  // If no date is provided, use the current date
  let date;
  if (!dateParam) {
    date = new Date();
  } else {
    // Check if the parameter is a UNIX timestamp
    if (!isNaN(dateParam)) {
      date = new Date(parseInt(dateParam));
    } else {
      date = new Date(dateParam);
    }
  }

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // Return the response in the required format
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Listen on port set in the environment or default to 3000
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
