import { validationResult } from 'express-validator'
import BadRequestException from '#exceptions/BadRequestException'

export default async (req, res, next) => {
	const error = validationResult(req).formatWith(({ msg }) => msg)

	if (!error.isEmpty()) {
		return next(new BadRequestException(error.array()[0]))
	}

	next()
}
