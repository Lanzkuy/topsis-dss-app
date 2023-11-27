import { DataTypes } from 'sequelize'
import database from '#config/Database'

const Project = database.define(
	'Project',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	{
		tableName: 'project',
		timestamps: false
	}
)

Project.beforeDestroy(async (project, options) => {
	await Alternative({ where: { project_id: project.id } })
	await Criteria({ where: { project_id: project.id } })
})

export default Project
