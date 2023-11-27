'use strict'

/** @type {import('sequelize').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			'alternative_criteria',
			{
				id: {
					type: Sequelize.INTEGER,
					primaryKey: true,
					autoIncrement: true
				},
				alternative_id: {
					allowNull: false,
					type: Sequelize.INTEGER,
					references: {
						model: 'alternative',
						key: 'id'
					},
					onUpdate: 'CASCADE',
					onDelete: 'CASCADE'
				},
				criteria_id: {
					allowNull: false,
					type: Sequelize.INTEGER,
					references: {
						model: 'criteria_value',
						key: 'id'
					},
					onUpdate: 'CASCADE',
					onDelete: 'CASCADE'
				}
			},
			{
				timetamps: false
			}
		)
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('alternative_criteria')
	}
}
