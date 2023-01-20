const mongoose = require('mongoose');
const Models = require('./models.js');
const Movies = Models.Movie;
const Users = Models.User;
const express = require('express');
const morgan = require('morgan');
const app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const { check, validationResult } = require('express-validator');
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {
  flags: 'a',
});
const cors = require('cors');

// mongoose.connect('mongodb://localhost:27017/myFlixDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
mongoose.connect(process.env.CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');


app.use(morgan('combined', { stream: accessLogStream }));

let users = [
  {
    id: '63ca3c65563d00584379520b',
    name: 'Kim',
    favoriteMovies: [],
  },

  {
    id: '63ca3c6e82479ffeaf7609be',
    name: 'deven',
    password: '1234',
    email: 'deven27@gmail.com',
    birthday: '05-06-1999',
    favoriteMovies: ['kill bill'],
  },
];

let movies = [
  {
    id: '63c819403aee38373fc7e579',
    Title: 'mean girls',
    Description: ' a drama about a girl making friends with mean girls',
    Genre: {
      Name: 'drama',
      Description:
        ' a movie that makes you gasp and people taking behind their back.',
    },
    Director: {
      Name: ' Mary',
      Bio: ' shes a director',
      Birth: ' 1994.0',
    },

    ImgURL: 'URL for an image goes here',
    featured: false, //dont know what this means.
  },

  {
    id: '63c81956fb636a8be1058ee7',
    Title: 'the simpsons movie',
    Description: 'A movie about the simpsons but longer',
    Genre: {
      Name: 'comedy',
      Description: ' A movie that makes you laugh.',
    },
    Director: {
      Name: 'Steven',
      Bio: 'hes the director',
      Birth: ' 1975',
    },
    ImgURL: 'URL for an image goes here',
    featured: false, //dont know what this means.
  },

  {
    id: '63c8195f1b0b1b0b1b0b1b0b',
    Title: 'kill bill',
    Description: 'A movie about a person who wants to get revenge.',
    Genre: {
      Name: 'action',
      Description: ' A movie that makes you wanna start a fight.',
    },
    Director: {
      Name: 'Quentin',
      Bio: 'he makes alot of action movies.',
      Birth: ' 1963',
    },

    ImgURL: 'URL for an image goes here',
    featured: false, //dont know what this means.
  },

  {
    id: '63c8196f3ee22010fe71e256',
    Title: 'nightmare on elm street',
    Description: 'a guy who kills you in his dreams',
    Genre: {
      Name: 'Horror',
      Description: ' A movie that gets your heart beating.',
    },
    Director: {
      Name: ' Micheal',
      Bio: 'a person that makes scary movies',
      Birth: ' 1936',
    },

    ImgURL: 'URL for an image goes here',
    featured: false, //dont know what this means.
  },
];

app.use(express.static('public'));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(
    'Welcome to my movie app where you can find movies that were the most popular when they came out'
  );
});

//CREATE
app.post('/users', (req, res) => {
  const newUser = req.body;
  if (!newUser) {
    return res.status(400).send('User not provided');
  }

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    return res.status(201).json(newUser);
  } else {
    return res.status(400).send('name is required');
  }
});

//UPDATE
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  if (!id) {
    return res.status(400).send('id is required');
  }

  if(!updatedUser) {
    return res.status(400).send('User not provided');
  }

  let user = users.find((user) => user.id == id);

  if (!user) {
    return res.status(404).send('User not found');
  }

  if (user) {
    user.name = updatedUser.name;
    res.status(201).json(user);
  } else {
    res.status(400).send('user does not exist');
  }
});

app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  if (!id) {
    return res.status(400).send('id is required');
  }

  if(!updatedUser) {
    return res.status(400).send('User not provided');
  }

  let user = users.find((user) => user.id == id);

  if (!user) {
    return res.status(404).send('User not found');
  }

  if (user) {
    user.name = updatedUser.name;
    res.status(201).json(user);
  } else {
    res.status(400).send('user does not exist');
  }
});

//POST
app.post('/users/:id/:movieId', (req, res) => {
  const { id, movieId } = req.params;

  if (!id) {
    return res.status(400).send('user id is required');
  }

  if (!movieId) {
    return res.status(400).send('movie id is required');
  }
  let user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).send('user not found');
  }

  if (user) {
    user.favoriteMovies.push(movieId);
    res.status(201).send(`${movieId} has been added to user ${id}'s array`);
  } else {
    res.status(400).send('user does not exist');
  }
});

//DELETE
app.delete('/users/:id/:movieId', (req, res) => {
  const { id, movieId } = req.params;

  if (!id) {
    return res.status(400).send('user id is required');
  }
  if (!movieId) {
    return res.status(400).send('movie id is required');
  }

  let user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).send('user not found');
  }

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter(
      (title) => title !== movieId
    );
    res
      .status(201)
      .send(`${movieId} has been removed from user ${id}'s array`);
  } else {
    res.status(400).send('user does not exist');
  }
});


app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send('id is required');
  }

  let user = users.find((user) => user.id === id);

  if (user) {
    users = users.filter((user) => user.id !== id);
    res.status(201).send(` user ${id} has been deleted `);
  } else {
    res.status(400).send('user does not exist');
  }
});

//READ
app.get('/movies', (req, res) => {
  res.status(200).json(movies);
});

//READ
app.get('/movies/:title', (req, res) => {
  const { title } = req.params;
  const movie = movies.find((movie) => movie.Title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send('movie not found');
  }
});

//READ
app.get('/movies/genre/:genreName', (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find((movie) => movie.Genre.Name === genreName).Genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send('genre not found');
  }
});

//READ
app.get('/movies/directors/:directorName', (req, res) => {
  const { directorName } = req.params;
  const director = movies.find(
    (movie) => movie.Director.Name === directorName
  ).Director;

  if (director) {
    return res.status(200).json(director);
  } else {
    res.status(400).send('director not found');
  }
});

app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log('Listening on Port ' + port);
});
