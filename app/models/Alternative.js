import { DataTypes } from 'sequelize'
import database from '#config/Database'
import Project from '#models/Project'

const Alternative = database.define(
	'Alternative',
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
		tableName: 'alternative',
		timestamps: false
	}
)

Alternative.belongsTo(Project, { foreignKey: 'project_id' })

export default Alternative
