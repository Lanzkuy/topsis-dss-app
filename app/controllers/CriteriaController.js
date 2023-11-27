import HttpStatusCode from '#utils/HttpStatusCode'
import Response from '#utils/Response'

class CriteriaController {
	constructor(criteriaRepository) {
		this.criteriaRepository = criteriaRepository
	}

	async view(req, res) {
		res.render('pages/criteria-header', {
			activePage: 'Criteria Header',
			error: null,
			session: req.session,
			data: await this.getAll(req, res)
		})
	}

	async create(req, res) {
		const project_id = req.session.project_id
		const { code, name, weight, type } = req.body

		await this.criteriaRepository.create({
			project_id: project_id,
			code: code,
			name: name,
			weight: weight,
			type: type
		})

		req.flash('success', 'Criteria created successfully')
		return res.redirect('/dashboard/criteria/header')
		// return res
		// 	.status(HttpStatusCode.CREATED)
		// 	.json(Response(HttpStatusCode.CREATED, 'Criteria created successfully'))
	}

	async getAll(req, res) {
		const project_id = req.session.project_id
		return await this.criteriaRepository.getAllByProjectId(project_id)
		// return res
		// 	.status(HttpStatusCode.OK)
		// 	.json(Response(HttpStatusCode.OK, 'Criteria data', data))
	}

	async update(req, res) {
		const { criteria_id } = req.params
		const { code, name, weight, type } = req.body

		await this.criteriaRepository.update(criteria_id, {
			code: code,
			name: name,
			weight: weight,
			type: type
		})

		req.flash('success', 'Criteria updated successfully')
		return res.redirect('/dashboard/criteria/header')
		// return res
		// 	.status(HttpStatusCode.OK)
		// 	.json(Response(HttpStatusCode.OK, 'Criteria updated successfully'))
	}

	async delete(req, res) {
		const { criteria_id } = req.params

		await this.criteriaRepository.delete(criteria_id)

		req.flash('success', 'Criteria deleted successfully')
		return res.redirect('/dashboard/criteria/header')
		// return res
		// 	.status(HttpStatusCode.OK)
		// 	.json(Response(HttpStatusCode.OK, 'Criteria deleted successfully'))
	}
}

export default CriteriaController
