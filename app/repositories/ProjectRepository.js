class ProjectRepository {
	constructor(project) {
		this.project = project
	}

	async create(data) {
		return await this.project.create(data)
	}

	async getAll() {
		return await this.project.findAll()
	}

	async getById(id) {
		return await this.project.findByPk(id)
	}

	async update(id, data) {
		await this.project.update(data, {
			where: { id },
			fields: 'name'
		})
	}

	async delete(id) {
		await this.project.destroy({
			where: { id }
		})
	}

	async isExist(id) {
		const result = await this.project.findOne({ where: { id } })
		return !!result
	}
}

export default ProjectRepository
