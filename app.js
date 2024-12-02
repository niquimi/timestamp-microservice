const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/:date?', (req, res) => {
  let { date } = req.params;

  if (!date) {
    date = new Date();
  } else if (!isNaN(date)) {
    date = new Date(parseInt(date));
  } else {
    date = new Date(date);
  }

  if (date.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
