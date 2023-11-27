const editButtons = document.querySelectorAll('.btn-edit')
const editModal = new bootstrap.Modal(document.getElementById('editModal'))
const editForm = document.getElementById('editForm')
const editName = document.getElementById('editName')
editButtons.forEach((button) => {
	button.addEventListener('click', function () {
		const alternative = JSON.parse(button.getAttribute('data-alternative'))

		editForm.method = 'POST'
		editForm.action = `/alternative/update/${alternative.id}`
		editName.value = alternative.name

		editModal.show()
	})
})
