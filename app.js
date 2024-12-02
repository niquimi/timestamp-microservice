const express = require('express');
const app = express();

app.get('/api/:date?', (req, res) => {
  let { date } = req.params;

  // Handle empty date parameter (current date/time)
  if (!date) {
    date = new Date();
  } else if (!isNaN(date)) {
    // If the date is a Unix timestamp, parse it
    date = new Date(parseInt(date));
  } else {
    // Otherwise, parse it as an ISO date string
    date = new Date(date);
  }

  // Check for invalid date
  if (date.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  // Return the response in the expected format
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
