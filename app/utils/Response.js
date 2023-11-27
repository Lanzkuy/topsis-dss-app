export default (code, message, data = null) => {
	const response = {
		code: code,
		message: message
	}

	if (data != null) {
		response.data = data
	}

	return response
}
