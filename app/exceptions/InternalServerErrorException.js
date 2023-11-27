import HttpStatusCode from '#utils/HttpStatusCode'

class InternalServerErrorException extends Error {
	constructor(message) {
		super()
		this.code = HttpStatusCode.INTERNAL_SERVER_ERROR
		this.message = message
	}
}

export default InternalServerErrorException
