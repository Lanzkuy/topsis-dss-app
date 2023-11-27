import HttpStatusCode from '#utils/HttpStatusCode'

class NotFoundException extends Error {
	constructor(message) {
		super()
		this.code = HttpStatusCode.NOT_FOUND
		this.message = message
	}
}

export default NotFoundException
