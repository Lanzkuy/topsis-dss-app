const editButtons = document.querySelectorAll('.btn-edit')
const editModal = new bootstrap.Modal(document.getElementById('editModal'))
const editForm = document.getElementById('editForm')
const editLastUsername = document.getElementById('editLastUsername')
const editUsername = document.getElementById('editUsername')
const editPassword = document.getElementById('editPassword')
const editEmail = document.getElementById('editEmail')
const editName = document.getElementById('editName')
const editRole = document.getElementById('editRole')

editButtons.forEach((button) => {
	button.addEventListener('click', function () {
		const user = JSON.parse(button.getAttribute('data-user'))

		editForm.method = 'POST'
		editForm.action = `/user/update/${user.id}`
		editLastUsername.value = user.username
		editUsername.value = user.username
		editPassword.value = user.password
		editEmail.value = user.email
		editName.value = user.name
		editRole.value = user.role

		editModal.show()
	})
})
