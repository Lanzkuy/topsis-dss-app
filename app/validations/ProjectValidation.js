import { check } from 'express-validator'

export default [
	check('project_name').notEmpty().withMessage('Project name is required')
]
