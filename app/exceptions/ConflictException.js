import HttpStatusCode from '#utils/HttpStatusCode'

class ConflictException extends Error {
	constructor(message) {
		super()
		this.code = HttpStatusCode.CONFLICT
		this.message = message
	}
}

export default ConflictException
