import mysql2 from 'mysql2'
import { Sequelize } from 'sequelize'
import config from '#config/Config'

const { dialect, host, port, username: user, password, database, pool } = config

export const createDatabase = async () => {
	try {
		const connection = await mysql2.createConnection({
			host,
			port,
			user,
			password
		})
		connection.query(`CREATE DATABASE IF NOT EXISTS ${database}`)
		console.log('Database created or already exists')
	} catch (error) {
		console.error(`Failed to create database : ${error.message}`)
	}
}

const sequelize = new Sequelize(database, user, password, {
	host: host,
	dialect: dialect,
	pool: pool,
	logging: false
})

export const connect = async () => {
	try {
		await sequelize.authenticate()
		console.log('Connection has been established successfully')
	} catch (error) {
		console.error(`Unable to connect to the database : ${error.message}`)
	}
}

export default sequelize
