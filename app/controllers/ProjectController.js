import HttpStatusCode from '#utils/HttpStatusCode'
import Response from '#utils/Response'

class ProjectController {
	constructor(projectRepository) {
		this.projectRepository = projectRepository
	}

	async view(req, res) {
		res.render('pages/select-project', {
			error: null,
			data: await this.getAll()
		})
	}

	async select(req, res) {
		req.session.project_id = req.params.project_id
		return res.redirect('/dashboard')
	}

	async create(req, res) {
		const { project_name } = req.body

		await this.projectRepository.create({
			name: project_name
		})

		req.flash('success', 'Project created successfully')
		return res.redirect('/select-project')
		// return res
		// 	.status(HttpStatusCode.CREATED)
		// 	.json(Response(HttpStatusCode.CREATED, 'Project created successfully'))
	}

	async getAll(req, res) {
		return await this.projectRepository.getAll()
		// return res
		// 	.status(HttpStatusCode.OK)
		// 	.json(Response(HttpStatusCode.OK, 'Project data', data))
	}

	async update(req, res) {
		const { project_id } = req.params
		const { project_name } = req.body

		await this.projectRepository.update(project_id, {
			name: project_name
		})

		req.flash('success', 'Project updated successfully')
		return res.redirect('/select-project')
		// return res
		// 	.status(HttpStatusCode.OK)
		// 	.json(Response(HttpStatusCode.OK, 'Project updated successfully'))
	}

	async delete(req, res) {
		const { project_id } = req.params

		await this.projectRepository.delete(project_id)

		req.flash('success', 'Project deleted successfully')
		return res.redirect('/select-project')
		// return res
		// 	.status(HttpStatusCode.OK)
		// 	.json(Response(HttpStatusCode.OK, 'Project deleted successfully'))
	}
}

export default ProjectController
