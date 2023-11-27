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
		res.render('pages/result', {
			activePage: 'Result',
			error: null
		})
	}
}

export default ResultController
