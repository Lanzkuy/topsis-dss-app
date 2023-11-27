export default async (error, req, res, next) => {
	const errorResponse = {
		code: error.code || 500,
		message: error.message || 'Internal Server Error'
	}

	req.flash('error', errorResponse.message)

	return res.redirect(req.originalUrl)

	// return res.status(error.code).json(errorResponse)
}
