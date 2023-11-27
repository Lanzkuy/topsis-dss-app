import HttpStatusCode from '#utils/HttpStatusCode'

class ForbiddenException extends Error {
	constructor(message) {
		super()
		this.code = HttpStatusCode.FORBIDDEN
		this.message = message
	}
}

export default ForbiddenException
