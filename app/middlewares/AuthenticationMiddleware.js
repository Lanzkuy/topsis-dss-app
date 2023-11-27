const Authenticated = (req, res, next) => {
	const session = req.session

	if (session.userData != null) {
		next()
	} else {
		res.redirect('/auth/signin')
	}
}

const Unauthenticated = (req, res, next) => {
	const session = req.session

	if (session.userData == null) {
		next()
	} else {
		res.redirect('/select-project')
	}
}

export { Authenticated, Unauthenticated }
