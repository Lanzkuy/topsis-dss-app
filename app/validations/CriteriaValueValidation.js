import { check } from 'express-validator'

export default [check('value').notEmpty().withMessage('Value is required')]
