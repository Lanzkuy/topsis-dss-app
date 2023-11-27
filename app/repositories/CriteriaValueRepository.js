class CriteriaValueRepository {
	constructor(criteriaValue) {
		this.criteriaValue = criteriaValue
	}

	async create(data) {
		return await this.criteriaValue.create(data)
	}

	async getAll() {
		return await this.criteriaValue.findAll({
			include: 'criteria',
			order: [['criteria_id', 'DESC']]
		})
	}

	async getAllByCriteriaId(criteria_id) {
		return await this.criteriaValue.findAll({
			include: 'criteria',
			where: { criteria_id },
			order: [['criteria_id', 'DESC']]
		})
	}

	async getById(id) {
		return await this.criteriaValue.findByPk(id)
	}

	async update(id, data) {
		await this.criteriaValue.update(data, {
			where: { id },
			fields: 'value'
		})
	}

	async delete(id) {
		await this.criteriaValue.destroy({
			where: { id }
		})
	}

	async deleteByCriteriaId(criteriaId) {
		await this.criteriaValue.destroy({
			where: { criteriaId }
		})
	}

	async isExist(id) {
		const result = await this.criteriaValue.findOne({
			where: { id }
		})
		return !!result
	}
}

export default CriteriaValueRepository
