import { DataTypes } from 'sequelize'
import database from '#config/Database'
import Criteria from '#models/Criteria'

const CriteriaValue = database.define(
	'CriteriaValue',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
		value: {
			type: DataTypes.DOUBLE,
			allowNull: false
		}
	},
	{
		tableName: 'criteria_value',
		timestamps: false
	}
)

CriteriaValue.belongsTo(Criteria, { foreignKey: 'criteria_id', as: 'criteria' })

export default CriteriaValue
