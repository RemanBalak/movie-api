const express = require('express');
const app = express();

const movies = [
  {
    id: 1,
    title: 'The Shawshank Redemption',
    year: 1994,
    rating: 9.2,
  },
  {
    id: 2,
    title: 'The Godfather',
    year: 1972,
    rating: 9.2,
  },
  {
    id: 3,
    title: 'The Godfather: Part II',
    year: 1974,
    rating: 9.0,
  },
  {
    id: 4,
    title: 'The Dark Knight',
    year: 2008,
    rating: 9.0,
  },
];

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to my movie club!');
});

app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/movies', (req, res) => {
  res.json(movies);
});

// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});

app.use(express.static('public'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
