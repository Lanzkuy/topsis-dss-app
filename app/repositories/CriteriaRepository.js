class CriteriaRepository {
	constructor(criteria) {
		this.criteria = criteria
	}

	async create(data) {
		return await this.criteria.create(data)
	}

	async getAll() {
		return await this.criteria.findAll({
			order: [['id', 'ASC']]
		})
	}

	async getAllByProjectId(project_id) {
		return await this.criteria.findAll({
			where: { project_id },
			order: [['id', 'ASC']]
		})
	}

	async getById(id) {
		return await this.criteria.findByPk(id)
	}

	async update(id, data) {
		await this.criteria.update(data, {
			where: { id },
			fields: ['code', 'name', 'weight', 'type']
		})
	}

	async delete(id) {
		await this.criteria.destroy({
			where: { id }
		})
	}

	async isExist(id) {
		const result = await this.criteria.findOne({ where: { id } })
		return !!result
	}
}

export default CriteriaRepository
