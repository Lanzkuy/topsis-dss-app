import { check } from 'express-validator'

export default [check('name').notEmpty().withMessage('Name is required')]
