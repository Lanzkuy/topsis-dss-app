const editButtons = document.querySelectorAll('.btn-edit')
const editModal = new bootstrap.Modal(document.getElementById('editModal'))
const editForm = document.getElementById('editForm')
const editCode = document.getElementById('editCode')
const editName = document.getElementById('editName')
const editWeight = document.getElementById('editWeight')
const editType = document.getElementById('editType')
editButtons.forEach((button) => {
	button.addEventListener('click', function () {
		const criteria = JSON.parse(button.getAttribute('data-criteria'))

		editForm.method = 'POST'
		editForm.action = `/criteria/header/update/${criteria.id}`
		editCode.value = criteria.code
		editName.value = criteria.name
		editWeight.value = criteria.weight
		editType.value = criteria.type

		editModal.show()
	})
})
