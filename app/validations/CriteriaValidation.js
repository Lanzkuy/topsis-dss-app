import { check } from 'express-validator'

export default [
	check('code').notEmpty().withMessage('Code is required'),
	check('name').notEmpty().withMessage('Name is required'),
	check('weight').notEmpty().withMessage('Weight is required'),
	check('type').notEmpty().withMessage('Type is required')
]
