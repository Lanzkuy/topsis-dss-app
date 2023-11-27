import express from 'express'
import UserValidation from '#validations/UserValidation'
import { Unauthenticated } from '#middlewares/AuthenticationMiddleware'
import ValidationMiddleware from '#middlewares/ValidationMiddleware'
import Container from '#config/Container'

const authController = Container.authController

const AuthRouter = express.Router()
AuthRouter.get(
	'/signin',
	Unauthenticated,
	authController.signinView.bind(authController)
)

AuthRouter.post(
	'/signin',
	Unauthenticated,
	[UserValidation.signin, ValidationMiddleware],
	authController.signin.bind(authController)
)

AuthRouter.get(
	'/signup',
	Unauthenticated,
	authController.signupView.bind(authController)
)

AuthRouter.post(
	'/signup',
	Unauthenticated,
	[UserValidation.upsert, ValidationMiddleware],
	authController.signup.bind(authController)
)

export default AuthRouter
