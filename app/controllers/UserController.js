import HttpStatusCode from '#utils/HttpStatusCode'
import Response from '#utils/Response'

class UserController {
	constructor(userRepository) {
		this.userRepository = userRepository
	}

	async view(req, res) {
		res.render('pages/user', {
			activePage: 'Users',
			error: null,
			session: req.session,
			data: await this.getAll()
		})
	}

	async create(req, res) {
		const { username, password, email, name, role } = req.body

		const isExist = await this.userRepository.isExist(username)

		if (isExist) {
			req.flash('error', 'Username already exists')
			return res.redirect('/dashboard/user')
			// return res
			// 	.status(HttpStatusCode.CONFLICT)
			// 	.json(Response(HttpStatusCode.CONFLICT, 'Username already exists'))
		}

		await this.userRepository.create({
			username: username,
			password: password,
			email: email,
			name: name,
			role: role
		})

		req.flash('success', 'User created successfully')
		return res.redirect('/dashboard/user')
		// return res
		// 	.status(HttpStatusCode.CREATED)
		// 	.json(Response(HttpStatusCode.CREATED, 'User created successfully'))
	}

	async getAll(req, res) {
		return await this.userRepository.getAll()
		// return res
		// 	.status(HttpStatusCode.OK)
		// 	.json(Response(HttpStatusCode.OK, 'User data', data))
	}

	async update(req, res) {
		const { user_id } = req.params
		const { lastUsername, username, password, email, name } = req.body

		if (lastUsername != username) {
			const isExist = await this.userRepository.isExist(username)

			if (isExist) {
				req.flash('error', 'Username already exists')
				return res.redirect('/dashboard/user')
				// return res
				// 	.status(HttpStatusCode.CONFLICT)
				// 	.json(Response(HttpStatusCode.CONFLICT, 'Username already exists'))
			}
		}

		await this.userRepository.update(user_id, {
			username: username,
			password: password,
			email: email,
			name: name
		})

		req.flash('success', 'User updated successfully')
		return res.redirect('/dashboard/user')
		// return res
		// 	.status(HttpStatusCode.OK)
		// 	.json(Response(HttpStatusCode.OK, 'User updated successfully'))
	}

	async delete(req, res) {
		const { user_id } = req.params
		const { session_user_id } = req.session.userData

		if (user_id == session_user_id) {
			req.flash('error', 'You cant delete your account')
			return res.redirect('/dashboard/user')
			// return res
			// 	.status(HttpStatusCode.CONFLICT)
			// 	.json(Response(HttpStatusCode.CONFLICT, 'Username already exists'))
		}

		await this.userRepository.delete(user_id)

		req.flash('success', 'User deleted successfully')
		return res.redirect('/dashboard/user')
		// return res
		// 	.status(HttpStatusCode.OK)
		// 	.json(Response(HttpStatusCode.OK, 'User deleted successfully'))
	}
}

export default UserController
