$('.input-input').focus(function () {
	$(this).parent().addClass('is-active is-completed')
})

$('input').focus(() => {
	colorWhite()
})

$('.input-input').focusout(function () {
	$(this).parent().removeClass('is-active')
	if ($(this).val() === '') {
		$(this).parent().removeClass('is-completed')
	}
})

function validateForm() {
	const username = document.getElementById('username').value
	const email = document.getElementById('email').value
	const password = document.getElementById('password').value
	const result = validateEmail(email)
	const result2 = validatePassword(password)

	if (result === false) {
		$('.email-div').css('color', 'red')
		$('#email').css('color', 'red')
	}

	if (result2 === false) {
		$('.password-div').css('color', 'red')
		$('#password').css('color', 'red')
	}

	/* Talk with api to add this */
	const userInformationJSON = {
		username,
		email,
		password,
	}

	if (result && result2) {
		addNewUser(userInformationJSON)
	}
}

function validateEmail(email) {
	const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return regex.test(String(email).toLowerCase())
}

function colorWhite() {
	$('.username-div').css('color', 'white')
	$('#username').css('color', 'white')
	$('.email-div').css('color', 'white')
	$('#email').css('color', 'white')
	$('.password-div').css('color', 'white')
	$('#password').css('color', 'white')
}

function validatePassword(password) {
	const regex = /(?=.{8,})/
	return regex.test(String(password))
}

function addNewUser(dataJSON) {
	/* POST method */
	jQuery.ajax({
		url: '/api/users',
		type: 'POST',
		data: (dataJSON),
		dataType: 'json',
		success() {
			openNewPage()
		},
		error() {
			bootbox.alert({
				size: 'small',
				title: 'Oooops',
				message: 'Bad Signup Information',
			})
		},
	})
}

function openNewPage() {
	window.open('../../../html/user.html', '_self')
}
