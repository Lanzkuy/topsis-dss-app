const editButtons = document.querySelectorAll('.btn-edit')
const editModal = new bootstrap.Modal(
	document.getElementById('evaluationModal')
)
const alternative_id = document.getElementById('alternative_id')
editButtons.forEach((button) => {
	button.addEventListener('click', function () {
		const alternative = JSON.parse(button.getAttribute('data-alternative'))

		alternative_id.value = alternative.id

		editModal.show()
	})
})
