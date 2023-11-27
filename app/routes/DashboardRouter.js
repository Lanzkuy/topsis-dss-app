import express from 'express'
import { Authenticated } from '#middlewares/AuthenticationMiddleware'
import Container from '#config/Container'

const alternativeController = Container.alternativeController
const criteriaController = Container.criteriaController
const criteriaValueController = Container.criteriaValueController
const evaluationController = Container.evaluationController
const resultController = Container.resultController
const userController = Container.userController

const DashboardRouter = express.Router()
DashboardRouter.get('/', Authenticated, function (req, res) {
	res.render('pages/home', {
		activePage: 'Home',
		error: null,
		session: req.session
	})
})

DashboardRouter.get('/case-study', Authenticated, function (req, res) {
	res.render('pages/case-study', {
		activePage: 'Case Study',
		error: null,
		session: req.session
	})
})

DashboardRouter.get(
	'/alternative',
	Authenticated,
	alternativeController.view.bind(alternativeController)
)

DashboardRouter.get(
	'/criteria/header',
	Authenticated,
	criteriaController.view.bind(criteriaController)
)

DashboardRouter.get(
	'/criteria/value',
	Authenticated,
	criteriaValueController.view.bind(criteriaValueController)
)

DashboardRouter.get(
	'/evaluation',
	Authenticated,
	evaluationController.view.bind(evaluationController)
)

DashboardRouter.get(
	'/result',
	Authenticated,
	resultController.view.bind(resultController)
)

DashboardRouter.get(
	'/user',
	Authenticated,
	userController.view.bind(userController)
)

DashboardRouter.get('/logout', Authenticated, function (req, res) {
	req.session.destroy()
	res.redirect('/auth/signin')
})

export default DashboardRouter
