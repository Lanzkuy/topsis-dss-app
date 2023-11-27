import HttpStatusCode from '#utils/HttpStatusCode'
import Response from '#utils/Response'

class EvaluationController {
	constructor(
		alternativeRepository,
		alternativeCriteriaRepository,
		criteriaRepository,
		criteriaValueRepository
	) {
		this.alternativeRepository = alternativeRepository
		this.alternativeCriteriaRepository = alternativeCriteriaRepository
		this.criteriaRepository = criteriaRepository
		this.criteriaValueRepository = criteriaValueRepository
	}

	async view(req, res) {
		const data = await this.getAll(req, res)
		res.render('pages/evaluation', {
			activePage: 'Evaluation',
			error: null,
			session: req.session,
			data: await this.getAll(req, res)
		})
	}

	async evaluate(req, res) {
		const formData = req.body

		const data = []
		Object.keys(formData).forEach((key) => {
			if (key.startsWith('criteria_')) {
				const criteriaId = key.split('_')[1]
				const criteriaValueId = formData[key]
				const alternativeId = formData.alternative_id
				data.push({
					criteriaValueId,
					alternativeId
				})
			}
		})

		data.forEach(async (x) => {
			await this.alternativeCriteriaRepository.create({
				alternative_id: x.alternativeId,
				criteria_id: x.criteriaValueId
			})
		})

		req.flash('success', 'Evaluate data success')
		return res.redirect('/dashboard/evaluation')
		// return res
		// 	.status(HttpStatusCode.CREATED)
		// 	.json(Response(HttpStatusCode.CREATED, 'Evaluate data success'))
	}

	async getAll(req, res) {
		const project_id = req.session.project_id

		const alternativeData = await this.alternativeRepository.getAllByProjectId(
			project_id
		)

		const criteriaData = await this.criteriaRepository.getAllByProjectId(
			project_id
		)

		const criteriaValueData = await this.criteriaValueRepository.getAll()

		const alternativeCriteriaData =
			await this.alternativeCriteriaRepository.getAll()

		const data = {
			alternative: alternativeData,
			criteria: criteriaData,
			criteriaValue: criteriaValueData,
			alternativeCriteria: alternativeCriteriaData
		}

		return data
		// return res
		// 	.status(HttpStatusCode.OK)
		// 	.json(Response(HttpStatusCode.OK, 'Alternative data', data))
	}
}

export default EvaluationController
