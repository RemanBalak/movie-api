const express = require('express');
const app = express();

let topBooks = [
  {
    title: "Harry Potter and the Sorcerer's Stone",
    author: 'J.K. Rowling',
  },
  {
    title: 'Lord of the Rings',
    author: 'J.R.R. Tolkien',
  },
  {
    title: 'Twilight',
    author: 'Stephanie Meyer',
  },
  {
    title: 'Police Story',
    author: 'Jackie Chan',
  },
  {
    title: 'The Machinist',
    author: 'Scott Kosar',
  },
  {
    title: 'Good Will Hunting',
    author: 'Gus Van Sant',
  },
  {
    title: 'Triangle',
    author: 'Christopher Smith',
  },
  {
    title: 'Fractured',
    author: 'Karin Slaughter',
  },
  {
    title: 'Fight Club',
    author: 'Chuck Palahniuk',
  },
  {
    title: 'Spirited Away',
    author: 'Hayao Miyazaki',
  },
];

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to my book club!');
});

app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/books', (req, res) => {
  res.json(topBooks);
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
