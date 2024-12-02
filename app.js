const express = require('express');
const path = require('path');
const app = express();

// Serve static files (if any)
app.use(express.static(path.join(__dirname, 'views')));

app.get('/api/:date?', (req, res) => {
  let { date } = req.params;

  // Handle empty date parameter
  if (!date) {
    date = new Date();
  } else if (!isNaN(date)) {
    // If date is a Unix timestamp
    date = new Date(parseInt(date));
  } else {
    // Parse as a standard date string
    date = new Date(date);
  }

  // Handle invalid dates
  if (date.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  // Return valid JSON response
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Set up the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
