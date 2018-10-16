"use strict";

$(document).ready(function () {
    $('#formSignUp').validate({
        rules: {
            username: {
                required: true,
                minlength: 3,
                maxlength: 25
            },
            secondname: {
                required: true,
                minlength: 3,
                maxlength: 60
            },
            email: {
                required: true,
                email: true
            },
            pass: {
                required: true,
                minlength: 6,
                maxlength: 20,
            },
            agreement: "required",
            gender: "required",
        },
        messages: {
            username: {
                required: "Please enter your name",
                minlength: "Please enter at least 3 characters",
                maxlength: "Please enter no more 25 characters",
            },
            secondname: {
                required: "Please enter your second name",
                minlength: "Please enter at least 3 characters",
                maxlength: "Please enter no more 60 characters",
            },
            email: {
                required: "Please enter email",
                email: "Please check your email is correct"
            },
            pass: {
                required: "Please enter your password",
                minlength: "Please enter at least 6 characters",
                maxlength: "Please enter no more 20 characters",
            },
            gender: {
                required: "Please select your gender"
            },
            agreement: {
                required: "Please confirm that you agree with conditions of agreement"
            }
        }
    });

    $("#formSignUp").submit(function (e) {
        e.preventDefault();

        var form = $(this);

        if (!form.valid()) {
            return;
        }
        var url = form.attr('action'),
            serverErrorContainer = $('.serverError');

        $.ajax({
            type: "POST",
            url: url,
            data: form.serialize(),
            success: function (data) {
                serverErrorContainer.addClass('hidden');

                if (data.status === 'OK') {
                    window.location.replace("companies.html");

                    return;
                }

                if (data.status === 'Error' || data.status === 'Form Error') {
                    serverErrorContainer.html(data.message);
                    serverErrorContainer.removeClass('hidden');
                }
            },
            error: function () {
                alert('Something went wrong');
            }
        });
    });
});