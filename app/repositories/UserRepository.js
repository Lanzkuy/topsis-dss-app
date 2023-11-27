class UserRepository {
	constructor(user) {
		this.user = user
	}

	async create(data) {
		return await this.user.create(data)
	}

	async getAll() {
		return await this.user.findAll()
	}

	async getById(id) {
		return await this.user.findByPk(id)
	}

	async getByUsername(username) {
		return await this.user.findOne({ where: { username: username } })
	}

	async update(id, data) {
		await this.user.update(data, {
			where: { id },
			fields: ['password', 'email', 'name', 'role']
		})
	}

	async delete(id) {
		await this.user.destroy({
			where: { id }
		})
	}

	async isExist(identifier) {
		const whereClause = {}

		if (Number.isInteger(Number(identifier))) {
			whereClause.id = identifier
		} else {
			whereClause.username = identifier
		}

		const result = await this.user.findOne({ where: whereClause })

		return !!result
	}
}

export default UserRepository
