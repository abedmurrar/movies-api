var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var helmet = require('helmet')
var cors = require('cors') // cross origin resource sharing
var session = require('express-session')

// Routers
// var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var moviesRouter = require('./routes/movies')
var imagesRouter = require('./routes/image')

var app = express()
app.disable('x-powered-by') // for minimum security purposes
app.use(cors())
app.use(helmet())
app.use(helmet.noSniff())
app.use(helmet.noCache())
app.use(helmet.frameguard())
app.use(helmet.xssFilter())
// session and cookies settings
var sessionOptions = {
	secret: 'season 4 is here',
	resave:true,
	saveUninitialized: true,
	cookie: {}
}
   
if (app.get('env') === 'production') {
	app.set('trust proxy', 1) // trust first proxy
	sessionOptions.cookie.secure = true // serve secure cookies
	sessionOptions.cookie.httpOnly = false
}
   
app.use(session(sessionOptions))

// view engine setup
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// Routing
app.use('/api/users', usersRouter)
app.use('/api/movies',moviesRouter)
app.use('/api/img',imagesRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	//res.locals.message = err.message;
	//res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500)
	res.json(err)
	// res.render('error');
})

module.exports = app
