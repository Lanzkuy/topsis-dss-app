import express from 'express'
import CriteriaValidation from '#validations/CriteriaValidation'
import CriteriaValueValidation from '#validations/CriteriaValueValidation'
import { Authenticated } from '#middlewares/AuthenticationMiddleware'
import ValidationMiddleware from '#middlewares/ValidationMiddleware'
import Container from '#config/Container'

const criteriaController = Container.criteriaController
const criteriaValueController = Container.criteriaValueController

const CriteriaRouter = express.Router()
CriteriaRouter.post(
	'/header/create',
	Authenticated,
	[CriteriaValidation, ValidationMiddleware],
	criteriaController.create.bind(criteriaController)
)

CriteriaRouter.post(
	'/header/update/:criteria_id',
	Authenticated,
	[CriteriaValidation, ValidationMiddleware],
	criteriaController.update.bind(criteriaController)
)

CriteriaRouter.get(
	'/header/delete/:criteria_id',
	Authenticated,
	criteriaController.delete.bind(criteriaController)
)

CriteriaRouter.post(
	'/value/create',
	Authenticated,
	[CriteriaValueValidation, ValidationMiddleware],
	criteriaValueController.create.bind(criteriaValueController)
)

CriteriaRouter.post(
	'/value/update/:criteria_value_id',
	Authenticated,
	[CriteriaValueValidation, ValidationMiddleware],
	criteriaValueController.update.bind(criteriaValueController)
)

CriteriaRouter.get(
	'/value/delete/:criteria_value_id',
	Authenticated,
	criteriaValueController.delete.bind(criteriaValueController)
)

export default CriteriaRouter
