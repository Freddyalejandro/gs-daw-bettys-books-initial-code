var express = require ('express')
var ejs = require('ejs')
var session = require('express-session');
//Import mysql module
// added comment
var mysql = require('mysql2')
var validator = require ('express-validator');
const expressSanitizer = require('express-sanitizer');
// Create the express application object
const app = express()
const port = 8000



// Tell Express that we want to use EJS as the templating engine
app.set('view engine', 'ejs')
// Create an input sanitizer
app.use(expressSanitizer());


// Set up the body parser 
app.use(express.urlencoded({ extended: true }))

// Set up public folder (for css and statis js)
app.use(express.static(__dirname + '/public'))

app.use(session({
    secret: 'somerandomstuff',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}))


// Define the database connection
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'bettys_books_app',
    password: 'qwertyuiop',
    database: 'bettys_books'
})
// Connect to the database
db.connect((err) => {
    if (err) {
        throw err
    }
    console.log('Connected to database')
})
global.db = db;

// Define our application-specific data
app.locals.shopData = {shopName: "Bettyss Books",
}
app.engine('html', ejs.renderFile);
// Load the route handlers
const mainRoutes = require("./routes/main")(db, app);
app.use('/', mainRoutes)

// Load the route handlers for /users
const usersRoutes = require('./routes/users')(db, app);
app.use('/users', usersRoutes)

// Load the route handlers for /books
const booksRoutes = require('./routes/books')(db, app);
app.use('/books', booksRoutes)

const profileRoutes = require('./routes/profile')(db, app);
app.use('/profile', profileRoutes)

// Start the web app listening
app.listen(port, () => console.log(`Node app listening on port ${port}!`))