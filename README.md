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

Installation
Clone the repository:

git clone https://github.com/kal40/movie-api.git
cd movie-api
Create a file and name it .env.development.local for environment variables and add the next content:

CONNECTION_URI="your mongo DB connection string"
PORT=your port number
HOST="your host name with the used http protocol together"
then run the next commands:

npm install
npm run dev
Testing
The endpoints can be tested directly from the documentation or the openapi definitions can be imported to Postman from this link

<h3> Key Features </h3>
- Express library for endpoint routing
- Uses MongoDB noSQL database deployed on MongoDB Atlas
- Basic HTTP auth for first login then JWT (token-based) authentication for further API calls.
- User's password hashing
<h3> Dependencies </h3>
See <a href="package.json"> package.json </a>
</p>
