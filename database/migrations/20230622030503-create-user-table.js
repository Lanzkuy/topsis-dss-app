'use strict'

/** @type {import('sequelize').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			'user',
			{
				id: {
					type: Sequelize.INTEGER,
					primaryKey: true,
					autoIncrement: true
				},
				username: {
					type: Sequelize.STRING,
					allowNull: false,
					unique: true
				},
				password: {
					type: Sequelize.STRING,
					allowNull: false
				},
				email: {
					type: Sequelize.STRING,
					allowNull: false,
					unique: true
				},
				name: {
					type: Sequelize.STRING,
					allowNull: false
				},
				role: {
					type: Sequelize.ENUM('admin', 'user'),
					allowNull: false,
					defaultValue: 'user'
				}
			},
			{
				timetamps: false
			}
		)
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('user')
	}
}
