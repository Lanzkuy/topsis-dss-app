import Alternative from '#models/Alternative'
import AlternativeCriteria from '#models/AlternativeCriteria'
import Criteria from '#models/Criteria'
import CriteriaValue from '#models/CriteriaValue'
import Project from '#models/Project'
import User from '#models/User'
import AlternativeRepository from '#repositories/AlternativeRepository'
import AlternativeCriteriaRepository from '#repositories/AlternativeCriteriaRepository'
import CriteriaRepository from '#repositories/CriteriaRepository'
import CriteriaValueRepository from '#repositories/CriteriaValueRepository'
import ProjectRepository from '#repositories/ProjectRepository'
import UserRepository from '#repositories/UserRepository'
import AlternativeController from '#controllers/AlternativeController'
import AuthController from '#controllers/AuthController'
import CriteriaController from '#controllers/CriteriaController'
import CriteriaValueController from '#controllers/CriteriaValueController'
import EvaluationController from '#controllers/EvaluationController'
import ResultController from '#controllers/ResultController'
import ProjectController from '#controllers/ProjectController'
import UserController from '#controllers/UserController'

const alternativeRepository = new AlternativeRepository(Alternative)
const alternativeCriteriaRepository = new AlternativeCriteriaRepository(
	AlternativeCriteria
)
const criteriaRepository = new CriteriaRepository(Criteria)
const criteriaValueRepository = new CriteriaValueRepository(CriteriaValue)
const projectRepository = new ProjectRepository(Project)
const userRepository = new UserRepository(User)

const alternativeController = new AlternativeController(alternativeRepository)
const authController = new AuthController(userRepository)
const criteriaController = new CriteriaController(criteriaRepository)
const criteriaValueController = new CriteriaValueController(
	criteriaRepository,
	criteriaValueRepository
)
const evaluationController = new EvaluationController(
	alternativeRepository,
	alternativeCriteriaRepository,
	criteriaRepository,
	criteriaValueRepository
)
const projectController = new ProjectController(projectRepository)
const resultController = new ResultController(
	alternativeRepository,
	alternativeCriteriaRepository,
	criteriaRepository,
	criteriaValueRepository
)
const userController = new UserController(userRepository)

const container = {
	alternativeController,
	authController,
	criteriaController,
	criteriaValueController,
	evaluationController,
	projectController,
	resultController,
	userController
}

export default container
