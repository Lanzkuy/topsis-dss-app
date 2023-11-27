import express from 'express'
import ProjectValidation from '#validations/ProjectValidation'
import { Authenticated } from '#middlewares/AuthenticationMiddleware'
import ValidationMiddleware from '#middlewares/ValidationMiddleware'
import Container from '#config/Container'

const projectController = Container.projectController

const ProjectRouter = express.Router()
ProjectRouter.get(
	'/',
	Authenticated,
	projectController.view.bind(projectController)
)

ProjectRouter.get(
	'/select/:project_id',
	Authenticated,
	projectController.select.bind(projectController)
)

ProjectRouter.post(
	'/create',
	Authenticated,
	[ProjectValidation, ValidationMiddleware],
	projectController.create.bind(projectController)
)

ProjectRouter.post(
	'/update/:project_id',
	Authenticated,
	[ProjectValidation, ValidationMiddleware],
	projectController.update.bind(projectController)
)

ProjectRouter.get(
	'/delete/:project_id',
	Authenticated,
	projectController.delete.bind(projectController)
)

export default ProjectRouter
