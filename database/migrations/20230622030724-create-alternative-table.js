'use strict'

/** @type {import('sequelize').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			'alternative',
			{
				id: {
					type: Sequelize.INTEGER,
					primaryKey: true,
					autoIncrement: true
				},
				project_id: {
					allowNull: false,
					type: Sequelize.INTEGER,
					references: {
						model: 'project',
						key: 'id'
					},
					onUpdate: 'CASCADE',
					onDelete: 'CASCADE'
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
		await queryInterface.dropTable('alternative')
	}
}
