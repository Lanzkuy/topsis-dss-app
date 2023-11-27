class AlternativeRepository {
	constructor(alternative) {
		this.alternative = alternative
	}

	async create(data) {
		return await this.alternative.create(data)
	}

	async getAll() {
		return await this.alternative.findAll()
	}

	async getAllByProjectId(project_id) {
		return await this.alternative.findAll({ where: { project_id } })
	}

	async getById(id) {
		return await this.alternative.findByPk(id)
	}

	async update(id, data) {
		await this.alternative.update(data, {
			where: { id },
			fields: 'name'
		})
	}

	async delete(id) {
		await this.alternative.destroy({
			where: { id }
		})
	}

	async isExist(id) {
		const result = await this.alternative.findOne({ where: { id } })
		return !!result
	}
}

export default AlternativeRepository
