import { check } from 'express-validator'

export default [
	check('alternative_id')
		.notEmpty()
		.withMessage('The alternative has not been selected'),
	check('criteria_value_id')
		.notEmpty()
		.withMessage('The criteria value has not been selected')
]
