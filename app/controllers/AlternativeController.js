import HttpStatusCode from '#utils/HttpStatusCode'
import Response from '#utils/Response'

class AlternativeController {
	constructor(alternativeRepository) {
		this.alternativeRepository = alternativeRepository
	}

	async view(req, res) {
		res.render('pages/alternative', {
			activePage: 'Alternative',
			error: null,
			session: req.session,
			data: await this.getAll(req, res)
		})
	}

	async create(req, res) {
		const project_id = req.session.project_id
		const { name } = req.body

		await this.alternativeRepository.create({
			project_id: project_id,
			name: name
		})

		req.flash('success', 'Alternative created successfully')
		return res.redirect('/dashboard/alternative')
		// return res
		// 	.status(HttpStatusCode.CREATED)
		// 	.json(Response(HttpStatusCode.CREATED, 'Alternative created successfully'))
	}

	async getAll(req, res) {
		const project_id = req.session.project_id
		return await this.alternativeRepository.getAllByProjectId(project_id)
		// return res
		// 	.status(HttpStatusCode.OK)
		// 	.json(Response(HttpStatusCode.OK, 'Alternative data', data))
	}

	async update(req, res) {
		const { alternative_id } = req.params
		const { name } = req.body

		await this.alternativeRepository.update(alternative_id, {
			name: name
		})

		req.flash('success', 'Alternative updated successfully')
		return res.redirect('/dashboard/alternative')
		// return res
		// 	.status(HttpStatusCode.OK)
		// 	.json(Response(HttpStatusCode.OK, 'Alternative updated successfully'))
	}

	async delete(req, res) {
		const { alternative_id } = req.params

		await this.alternativeRepository.delete(alternative_id)

		req.flash('success', 'Alternative deleted successfully')
		return res.redirect('/dashboard/alternative')
		// return res
		// 	.status(HttpStatusCode.OK)
		// 	.json(Response(HttpStatusCode.OK, 'Alternative deleted successfully'))
	}
}

export default AlternativeController
