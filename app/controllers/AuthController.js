import HttpStatusCode from '#utils/HttpStatusCode'
import Response from '#utils/Response'

class AuthController {
	constructor(userRepository) {
		this.userRepository = userRepository
	}

	async signinView(req, res) {
		res.render('pages/signin', { error: null })
	}

	async signupView(req, res) {
		res.render('pages/signup', { error: null })
	}

	async signin(req, res) {
		const { username, password } = req.body

		const user = await this.userRepository.getByUsername(username)

		if (user == null || user.password !== password) {
			req.flash('error', 'Invalid username or password')
			return res.redirect('signin')
			// return res
			// 	.status(HttpStatusCode.UNAUTHORIZED)
			// 	.json(
			// 		Response(HttpStatusCode.UNAUTHORIZED, 'Invalid username or password')
			// 	)
		}

		req.session.userData = {
			id: user.id,
			username: user.username,
			email: user.email,
			name: user.name,
			role: user.role
		}

		return res.redirect('/select-project')
		// return res
		// 	.status(HttpStatusCode.OK)
		// 	.json(Response(HttpStatusCode.OK, 'Signing in successfully'))
	}

	async signup(req, res) {
		const { username, password, email, name } = req.body

		const isExist = await this.userRepository.isExist(username)

		if (isExist) {
			req.flash('error', 'Username already exists')
			return res.redirect('signup')
			// return res
			// 	.status(HttpStatusCode.CONFLICT)
			// 	.json(Response(HttpStatusCode.CONFLICT, 'Username already exists'))
		}

		await this.userRepository.create({
			username: username,
			password: password,
			email: email,
			name: name
		})

		req.flash(
			'success',
			'Success! Your registration is complete. Log in to get started.'
		)
		return res.redirect('/auth/signin')
		// return res
		// 	.status(HttpStatusCode.CREATED)
		// 	.json(Response(HttpStatusCode.CREATED, 'User registered successfully'))
	}
}

export default AuthController
