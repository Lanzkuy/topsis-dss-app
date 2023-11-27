import Alternative from '#models/Alternative'
import Criteria from '#models/Criteria'
import CriteriaValue from '#models/CriteriaValue'

class AlternativeCriteriaRepository {
	constructor(alternativeCriteria) {
		this.alternativeCriteria = alternativeCriteria
	}

	async create(data) {
		return await this.alternativeCriteria.create(data)
	}

	async getAll() {
		return await this.alternativeCriteria.findAll({
			include: ['alternative', 'criteria_value']
		})
	}

	async getAllByProjectId(project_id) {
		return await this.alternativeCriteria.findAll({
			include: [
				{
					model: Alternative,
					as: 'alternative',
					where: { project_id }
				},
				{
					model: CriteriaValue,
					as: 'criteria_value',
					include: {
						model: Criteria,
						as: 'criteria',
						where: { project_id }
					}
				}
			],
			order: [
				[
					{ model: CriteriaValue, as: 'criteria_value' },
					{ model: Criteria, as: 'criteria' },
					'code',
					'ASC'
				]
			]
		})
	}

	async getById(id) {
		return await this.alternativeCriteria.findByPk(id)
	}

	async update(id, data) {
		await this.alternativeCriteria.update(data, {
			where: { id },
			fields: 'name'
		})
	}

	async delete(id) {
		await this.alternativeCriteria.destroy({
			where: { id }
		})
	}

	async isExist(id) {
		const result = await this.alternativeCriteria.findOne({ where: { id } })
		return !!result
	}
}

export default AlternativeCriteriaRepository
