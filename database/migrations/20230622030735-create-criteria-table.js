'use strict'

/** @type {import('sequelize').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			'criteria',
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
				code: {
					type: Sequelize.STRING,
					allowNull: false,
					unique: true
				},
				name: {
					type: Sequelize.STRING,
					allowNull: false
				},
				weight: {
					type: Sequelize.INTEGER,
					allowNull: false
				},
				type: {
					type: Sequelize.ENUM('Cost', 'Benefit'),
					allowNull: false
				}
			},
			{
				timetamps: false
			}
		)
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('criteria')
	}
}
