import express from 'express'
import AlternativeValidation from '#validations/AlternativeValidation'
import { Authenticated } from '#middlewares/AuthenticationMiddleware'
import ValidationMiddleware from '#middlewares/ValidationMiddleware'
import Container from '#config/Container'

const alternativeController = Container.alternativeController

const UserRouter = express.Router()
UserRouter.post(
	'/create',
	Authenticated,
	[AlternativeValidation, ValidationMiddleware],
	alternativeController.create.bind(alternativeController)
)

UserRouter.post(
	'/update/:alternative_id',
	Authenticated,
	[AlternativeValidation, ValidationMiddleware],
	alternativeController.update.bind(alternativeController)
)

UserRouter.get(
	'/delete/:alternative_id',
	Authenticated,
	alternativeController.delete.bind(alternativeController)
)

export default UserRouter
