'use strict'

/** @type {import('sequelize').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			'criteria_value',
			{
				id: {
					type: Sequelize.INTEGER,
					primaryKey: true,
					autoIncrement: true
				},
				criteria_id: {
					allowNull: false,
					type: Sequelize.INTEGER,
					references: {
						model: 'criteria',
						key: 'id'
					},
					onUpdate: 'CASCADE',
					onDelete: 'CASCADE'
				},
				value: {
					type: Sequelize.DOUBLE,
					allowNull: false
				}
			},
			{
				timetamps: false
			}
		)
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('criteria_value')
	}
}
