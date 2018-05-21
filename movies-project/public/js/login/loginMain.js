$('.input-input').focus(function () {
	$(this).parent().addClass('is-active is-completed')
})

$('.input-input').focusout(function () {
	if ($(this).val() === '') { $(this).parent().removeClass('is-completed') }
	$(this).parent().removeClass('is-active')
})

function validateForm() {
	/* Get input values */
	const username = document.getElementById('username').value
	const password = document.getElementById('password').value

	/* Validate input values */
	/* var result = validateUsername(username); */
	const result = validatePassword(password)

	/* Change view based on validation result */
	/*
    if (result === false) {
        $('.username-div').css('color', 'red');
        $('#username').css('color', 'red');
    }
*/
	if (result === false) {
		$('.password-div').css('color', 'red')
		$('#password').css('color', 'red')
	} else {
		/* Talk with api to add this */
		const userInformationJSON = {
			username,
			password,
		}

		login(userInformationJSON)
	}
}

function colorWhite() {
	$('.username-div').css('color', 'white')
	$('#username').css('color', 'white')
	$('.password-div').css('color', 'white')
	$('#password').css('color', 'white')
}

function validatePassword(password) {
	const regex = /(?=.{8,})/
	return regex.test(String(password))
}

function login(dataJSON) {
	/* POST method */
	jQuery.ajax({
		url: '/api/users/login',
		type: 'POST',
		data: (dataJSON),
		dataType: 'json',
		success(response) {
			console.log(response) /* must receive id and role */
			direct(response)
		},
		error() {
			bootbox.alert({
				size: 'small',
				title: 'Oooops',
				message: 'Bad Login Information',
			})
		},
	})
}


function direct(response) {
	/* The response must contain the user id and role */
	/* Based on the role attribute, we direct him to the correct page */
	const { id } = response
	const { role } = response
	if (role.toLowerCase() === 'client') {
		window.open('/user', '_self')
	} else {
		window.open('/admin', '_self')
	}
}
