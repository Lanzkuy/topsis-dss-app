import express from 'express'
import { Authenticated } from '#middlewares/AuthenticationMiddleware'
import ValidationMiddleware from '#middlewares/ValidationMiddleware'
import Container from '#config/Container'

const evaluationController = Container.evaluationController

const EvaluationRouter = express.Router()
EvaluationRouter.post(
	'/evaluate',
	Authenticated,
	[ValidationMiddleware],
	evaluationController.evaluate.bind(evaluationController)
)

export default EvaluationRouter
