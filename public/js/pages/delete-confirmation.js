const deleteButtons = document.querySelectorAll('.btn-delete')
deleteButtons.forEach((button) => {
	button.addEventListener('click', function (event) {
		event.preventDefault()

		Swal2.fire({
			title: 'Confirmation',
			text: 'Are you sure you want to delete this item?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes',
			cancelButtonText: 'No',
			dangerMode: true
		}).then((result) => {
			if (result.isConfirmed) {
				window.location.href = this.getAttribute('href')
			}
		})
	})
})
