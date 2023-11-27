import { DataTypes } from 'sequelize'
import database from '#config/Database'
import Alternative from '#models/Alternative'
import CriteriaValue from '#models/CriteriaValue'

const AlternativeCriteria = database.define(
	'AlternativeCriteria',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		}
	},
	{
		tableName: 'alternative_criteria',
		timestamps: false
	}
)

AlternativeCriteria.belongsTo(Alternative, {
	foreignKey: 'alternative_id',
	as: 'alternative'
})

AlternativeCriteria.belongsTo(CriteriaValue, {
	foreignKey: 'criteria_id',
	as: 'criteria_value'
})

export default AlternativeCriteria
