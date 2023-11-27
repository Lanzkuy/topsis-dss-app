import HttpStatusCode from '#utils/HttpStatusCode'
import Response from '#utils/Response'

class CriteriaValueController {
	constructor(criteriaRepository, criteriaValueRepository) {
		this.criteriaRepository = criteriaRepository
		this.criteriaValueRepository = criteriaValueRepository
	}

	async view(req, res) {
		res.render('pages/criteria-value', {
			activePage: 'Criteria Value',
			error: null,
			session: req.session,
			data: await this.getAll(req, res)
		})
	}

	async create(req, res) {
		const { criteria_id, value } = req.body

		await this.criteriaValueRepository.create({
			criteria_id: criteria_id,
			value: value
		})

		req.flash('success', 'Criteria value created successfully')
		return res.redirect('/dashboard/criteria/value')
		// return res
		// 	.status(HttpStatusCode.CREATED)
		// 	.json(Response(HttpStatusCode.CREATED, 'Criteria value created successfully'))
	}

	async getAll(req, res) {
		const project_id = req.session.project_id
		const criterias = await this.criteriaRepository.getAllByProjectId(
			project_id
		)
		const data = []

		for (const criteria of criterias) {
			const criteriaValues =
				await this.criteriaValueRepository.getAllByCriteriaId(criteria.id)

			const dataItem = {
				id: criteria.id,
				name: criteria.name,
				values: criteriaValues
			}

			data.push(dataItem)
		}

		return data
		// return res
		// 	.status(HttpStatusCode.OK)
		// 	.json(Response(HttpStatusCode.OK, 'Criteria value data', data))
	}

	async update(req, res) {
		const { criteria_value_id } = req.params
		const { criteria_id, value } = req.body

		await this.criteriaValueRepository.update(criteria_value_id, {
			criteria_id: criteria_id,
			value: value
		})

		req.flash('success', 'Criteria value updated successfully')
		return res.redirect('/dashboard/criteria/value')
		// return res
		// 	.status(HttpStatusCode.OK)
		// 	.json(Response(HttpStatusCode.OK, 'Criteria value updated successfully'))
	}

	async delete(req, res) {
		const { criteria_value_id } = req.params

		await this.criteriaValueRepository.delete(criteria_value_id)

		req.flash('success', 'Criteria value deleted successfully')
		return res.redirect('/dashboard/criteria/value')
		// return res
		// 	.status(HttpStatusCode.OK)
		// 	.json(Response(HttpStatusCode.OK, 'Criteria value deleted successfully'))
	}
}

export default CriteriaValueController
