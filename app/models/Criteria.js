import { DataTypes } from 'sequelize'
import database from '#config/Database'
import Project from '#models/Project'

const Criteria = database.define(
	'Criteria',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
		code: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		weight: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		type: {
			type: DataTypes.ENUM('Cost', 'Benefit'),
			allowNull: false
		}
	},
	{
		tableName: 'criteria',
		timestamps: false
	}
)

Criteria.belongsTo(Project, { foreignKey: 'project_id' })

Criteria.beforeDestroy(async (criteria, options) => {
	await CriteriaValue({ where: { criteria_id: criteria.id } })
})

export default Criteria
