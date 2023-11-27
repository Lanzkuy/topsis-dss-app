import HttpStatusCode from '#utils/HttpStatusCode'
import Response from '#utils/Response'

class ResultController {
	constructor(
		alternativeRepository,
		alternativeCriteriaRepository,
		criteriaRepository,
		criteriaValueRepository
	) {
		this.alternativeRepository = alternativeRepository
		this.alternativeCriteriaRepository = alternativeCriteriaRepository
		this.criteriaRepository = criteriaRepository
		this.criteriaValueRepository = criteriaValueRepository
	}

	async view(req, res) {
		const normalizedMatrix = await this.normalizeMatrix(req, res)
		const weightedNormalizedMatrix = await this.weightedNormalizedMatrix(
			req,
			res,
			normalizedMatrix
		)
		const idealPositive = await this.idealPositive(
			req,
			res,
			weightedNormalizedMatrix
		)
		const idealNegative = await this.idealNegative(
			req,
			res,
			weightedNormalizedMatrix
		)
		const euclideanDistance = await this.euclideanDistance(
			req,
			res,
			weightedNormalizedMatrix,
			idealPositive,
			idealNegative
		)
		const preference = await this.preference(req, res, euclideanDistance)

		res.render('pages/result', {
			activePage: 'Result',
			error: null,
			session: req.session,
			criteria: await this.getAllCriteria(req, res),
			alternativeCriteria: await this.getAllAlternativeCriteria(req, res),
			normalizedMatrix: this.transposeMatrix(normalizedMatrix),
			weightedNormalizedMatrix: this.transposeMatrix(weightedNormalizedMatrix),
			idealPositive: idealPositive,
			idealNegative: idealNegative,
			euclideanDistance: euclideanDistance,
			preference: preference
		})
	}

	async getAllAlternative(req, res) {
		const project_id = req.session.project_id
		return await this.alternativeRepository.getAllByProjectId(project_id)
	}

	async getAllCriteria(req, res) {
		const project_id = req.session.project_id
		return await this.criteriaRepository.getAllByProjectId(project_id)
	}

	async getAllAlternativeCriteria(req, res) {
		const project_id = req.session.project_id
		let data = {}

		const alternativeCriteria =
			await this.alternativeCriteriaRepository.getAllByProjectId(project_id)

		alternativeCriteria.forEach((alternativeCriteria) => {
			const alternative = alternativeCriteria.alternative.dataValues
			const criteriaValue = alternativeCriteria.criteria_value.dataValues

			if (!data[alternative.name]) {
				data[alternative.name] = []
			}

			data[alternative.name].push({ alternative, criteriaValue })
		})

		data = Object.entries(data).map(([name, values]) => {
			return { name, values }
		})

		return data
		// return res
		// 	.status(HttpStatusCode.OK)
		// 	.json(Response(HttpStatusCode.OK, 'Alternative data', data))
	}

	async normalizeMatrix(req, res) {
		const criteria = await this.getAllCriteria(req, res)
		const alternativeCriteria = await this.getAllAlternativeCriteria(req, res)
		const unormalized = []
		const matrix = []

		alternativeCriteria.forEach((item) => {
			const mapValue = item.values.map((val) => val.criteriaValue.value)
			mapValue.forEach((value, index) => {
				if (!unormalized[index]) unormalized[index] = []
				unormalized[index].push(value)
			})
		})

		for (let i = 0; i < criteria.length; i++) {
			const sumSquares = unormalized[i].reduce(
				(sum, val) => sum + Math.pow(val, 2),
				0
			)
			const sqrtSumSquares = Math.sqrt(sumSquares)
			const normalize = unormalized[i].map((val) => val / sqrtSumSquares)

			matrix.push(normalize)
		}

		return matrix
	}

	async weightedNormalizedMatrix(req, res, normalizedMatrix) {
		const criteria = await this.getAllCriteria(req, res)
		const matrix = []

		for (let i = 0; i < normalizedMatrix.length; i++) {
			const criteriaData = criteria.map((item) => item.dataValues.weight)
			const weightCriteria = criteriaData[i]
			const weightNormalized = normalizedMatrix[i].map(
				(val) => val * weightCriteria
			)
			matrix.push(weightNormalized)
		}

		return matrix
	}

	async idealPositive(req, res, weightedNormalizedMatrix) {
		const criteria = await this.getAllCriteria(req, res)
		const isBenefitCriteria = criteria.map((c) => c.type === 'Benefit')

		return weightedNormalizedMatrix.map((column, columnIndex) => {
			if (isBenefitCriteria[columnIndex]) {
				return Math.max(...column)
			} else {
				return Math.min(...column)
			}
		})
	}

	async idealNegative(req, res, weightedNormalizedMatrix) {
		const criteria = await this.getAllCriteria(req, res)
		const isBenefitCriteria = criteria.map((c) => c.type === 'Benefit')

		return weightedNormalizedMatrix.map((column, columnIndex) => {
			if (isBenefitCriteria[columnIndex]) {
				return Math.min(...column)
			} else {
				return Math.max(...column)
			}
		})
	}

	async euclideanDistance(
		req,
		res,
		weightedNormalizedMatrix,
		idealPositive,
		idealNegative
	) {
		const alternative = await this.getAllAlternative(req, res)
		const criteria = await this.getAllCriteria(req, res)
		const positive = []
		const negative = []

		for (let i = 0; i < alternative.length; i++) {
			let sumSquaresPositif = 0
			let sumSquaresNegatif = 0
			for (let j = 0; j < criteria.length; j++) {
				sumSquaresPositif += Math.pow(
					weightedNormalizedMatrix[j][i] - idealPositive[j],
					2
				)
				sumSquaresNegatif += Math.pow(
					weightedNormalizedMatrix[j][i] - idealNegative[j],
					2
				)
			}
			positive.push(Math.sqrt(sumSquaresPositif))
			negative.push(Math.sqrt(sumSquaresNegatif))
		}

		return {
			positive,
			negative
		}
	}

	async preference(req, res, euclideanDistance) {
		const alternativeCriteria = await this.getAllAlternativeCriteria(req, res)
		const preference = []

		for (let i = 0; i < alternativeCriteria.length; i++) {
			const preferenceValue =
				euclideanDistance.negative[i] /
				(euclideanDistance.positive[i] + euclideanDistance.negative[i])

			preference.push({
				name: alternativeCriteria[i].name,
				value: preferenceValue.toFixed(4)
			})
		}

		preference.sort((a, b) => b.value - a.value)

		return preference
	}

	transposeMatrix(matrix) {
		const rows = matrix.length
		const cols = matrix[0].length

		const transposedMatrix = []

		for (let col = 0; col < cols; col++) {
			const transposedRow = []
			for (let row = 0; row < rows; row++) {
				transposedRow.push(matrix[row][col])
			}
			transposedMatrix.push(transposedRow)
		}

		return transposedMatrix
	}
}

export default ResultController
