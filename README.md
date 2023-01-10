<h1> myFlix API </h1>

<h2> Description </h2>

<p> A REST API for an application called “myFlix” that interacts with a database that stores data about different movies.

This is a he server-side component of a “movies” web application. The web application will provide users with access to information about different movies, directors, and genres. Users will be able to sign up, update their personal information, and create a list of their favorite movies.

The main purpose of this app is to present how I create a REST API architecture.

This site was built using Heroku GitHub Deploys.

<h3> Getting started</h3>
 <h4> Prerequisites</h4>
Install nodejs LTS or the latest version.

Setup a mongodb database.

<h3> Installation </h3>
Clone the repository:

git clone https://github.com/RemanBalak/movie-api.git <br/>
<strong> cd </strong> movie_api <br/>
<br/>
Create a file and name it .env.development.local for environment variables and add the next content:

CONNECTION_URI="your mongo DB connection string" <br/>
PORT=your port number <br/>
HOST="your host name with the used http protocol together"<br/>
then run the next commands:<br/>

npm install <br/>
npm run dev


<h3> Key Features </h3>
- Express library for endpoint routing<br />
- Uses MongoDB noSQL database deployed on MongoDB Atlas<br />
- Basic HTTP auth for first login then JWT (token-based) authentication for further API calls.<br />
- User's password hashing<br />
<h3> Dependencies </h3>
See <a href="package.json" target="_blank"> package.json </a>
</p>
