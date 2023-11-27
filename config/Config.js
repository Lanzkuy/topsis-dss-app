import 'dotenv/config'

export default {
	dialect: process.env.DB_DRIVER,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
}
