var createError = require('http-errors')
var express = require('express')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var helmet = require('helmet')
var cors = require('cors') // cross origin resource sharing
var session = require('express-session')
var path = require('path')
var bodyParser = require('body-parser')

// Routers
// var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var moviesRouter = require('./routes/movies')
var imagesRouter = require('./routes/image')
var indexRouter = require('./routes/index')
var apiRouter = require('./routes/api')

var app = express()
// security 
app.disable('x-powered-by') // for minimum security purposes
app.use(cors())
app.use(helmet())
app.use(helmet.noSniff())
// app.use(helmet.noCache())
app.use(helmet.frameguard())
app.use(helmet.xssFilter())

// view engine setup
app.set('views', path.join(__dirname, 'views'))
// app.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: true
}))
// session and cookies settings
var sessionOptions = {
	secret: 'season 4 is here',
	resave: true,
	saveUninitialized: true,
	cookie: {}
}

if (app.get('env') === 'production') {
	app.set('trust proxy', 1) // trust first proxy
	sessionOptions.cookie.secure = true // serve secure cookies
	sessionOptions.cookie.httpOnly = false
}

app.use(session(sessionOptions))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({
	extended: false
}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
// Routing
app.use('/', indexRouter)
app.use('/api', apiRouter)
app.use('/api/users', usersRouter)
app.use('/api/movies', moviesRouter)
app.use('/api/img', imagesRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	//res.locals.message = err.message;
	//res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500)
	res.json(err)
	// res.render('error');
})

module.exports = app