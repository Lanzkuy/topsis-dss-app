import express from 'express'
import UserValidation from '#validations/UserValidation'
import { Authenticated } from '#middlewares/AuthenticationMiddleware'
import ValidationMiddleware from '#middlewares/ValidationMiddleware'
import Container from '#config/Container'

const userController = Container.userController

const UserRouter = express.Router()
UserRouter.post(
	'/create',
	Authenticated,
	[UserValidation.upsert, ValidationMiddleware],
	userController.create.bind(userController)
)

UserRouter.post(
	'/update/:user_id',
	Authenticated,
	[UserValidation.upsert, ValidationMiddleware],
	userController.update.bind(userController)
)

UserRouter.get(
	'/delete/:user_id',
	Authenticated,
	userController.delete.bind(userController)
)

export default UserRouter
