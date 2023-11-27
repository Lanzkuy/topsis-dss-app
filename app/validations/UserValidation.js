import { check } from 'express-validator'

export default {
	signin: [
		check('username').notEmpty().withMessage('Username is required'),
		check('password').notEmpty().withMessage('Password is required')
	],
	upsert: [
		check('username').notEmpty().withMessage('Username is required'),
		check('password').notEmpty().withMessage('Password is required'),
		check('email')
			.notEmpty()
			.withMessage('Email is required')
			.isEmail()
			.withMessage('Invalid email address'),
		check('name').notEmpty().withMessage('Name is required')
	]
}
