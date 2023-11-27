import HttpStatusCode from '#utils/HttpStatusCode'

class BadRequestException extends Error {
	constructor(message) {
		super()
		this.code = HttpStatusCode.BAD_REQUEST
		this.message = message
	}
}

export default BadRequestException
