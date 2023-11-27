import HttpStatusCode from '#utils/HttpStatusCode'

class UnauthorizedException extends Error {
	constructor(message) {
		super()
		this.code = HttpStatusCode.UNAUTHORIZED
		this.message = message
	}
}

export default UnauthorizedException
