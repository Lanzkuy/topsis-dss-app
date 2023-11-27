const addButtons = document.querySelectorAll('.btn-add')
const addModal = new bootstrap.Modal(document.getElementById('addModal'))
const addForm = document.getElementById('addForm')
const criteria_id = document.getElementById('criteria_id')
addButtons.forEach((button) => {
	button.addEventListener('click', function () {
		const criteria = JSON.parse(button.getAttribute('data-criteria'))
		console.log(criteria)
		addForm.method = 'POST'
		addForm.action = `/criteria/value/create`
		criteria_id.value = criteria.id

		addModal.show()
	})
})

const editButtons = document.querySelectorAll('.btn-edit')
const editModal = new bootstrap.Modal(document.getElementById('editModal'))
const editForm = document.getElementById('editForm')
const editValue = document.getElementById('editValue')
editButtons.forEach((button) => {
	button.addEventListener('click', function () {
		const criteriaValue = JSON.parse(button.getAttribute('data-criteria-value'))

		editForm.method = 'POST'
		editForm.action = `/criteria/value/update/${criteriaValue.id}`
		editValue.value = criteriaValue.value

		editModal.show()
	})
})
