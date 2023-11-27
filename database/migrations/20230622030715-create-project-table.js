'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			'project',
			{
				id: {
					type: Sequelize.INTEGER,
					primaryKey: true,
					autoIncrement: true
				},
				name: {
					type: Sequelize.STRING,
					allowNull: false
				}
			},
			{
				timetamps: false
			}
		)
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('project')
	}
}
