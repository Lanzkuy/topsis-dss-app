import 'dotenv/config'
import path from 'path'
import { fileURLToPath } from 'url'
import bodyParser from 'body-parser'
import express from 'express'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import flash from 'express-flash'
import { createDatabase, connect } from '#config/Database'
import ErrorHandlerMiddleware from '#middlewares/ErrorHandlerMiddleware'
import AlternativeRouter from '#routes/AlternativeRouter'
import AuthRouter from '#routes/AuthRouter'
import CriteriaRouter from '#routes/CriteriaRouter'
import EvaluationRouter from '#routes/EvaluationRouter'
import DashboardRouter from '#routes/DashboardRouter'
import ProjectRouter from '#routes/ProjectRouter'
import UserRouter from '#routes/UserRouter'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Express Server
 */
const app = express()
const port = process.env.APP_PORT || 8000

/**
 * Configuration
 */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../public')))
app.use(cookieParser())
app.use(
	session({
		secret: 'secret-key',
		resave: false,
		cookie: { maxAge: 3600000 },
		saveUninitialized: true
	})
)
app.use(flash())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

/**
 * Routes
 */
app.use('/alternative', AlternativeRouter)
app.use('/auth', AuthRouter)
app.use('/criteria', CriteriaRouter)
app.use('/evaluation', EvaluationRouter)
app.use('/dashboard', DashboardRouter)
app.use('/select-project', ProjectRouter)
app.use('/user', UserRouter)

/**
 * Error Handler
 */
app.use(ErrorHandlerMiddleware)

app.listen(port, () => {
	createDatabase()
	connect()
	console.log(`Server running on port ${port}`)
})
