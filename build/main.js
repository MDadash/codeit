"use strict";

$(document).ready(function () {
    var companiesArray,
        companiesList = $('.companiesList'),
        companyBlockTemplate = `<li class="list-group-item" data-key="__key__">__name__</li>`,
        partnerBlockTemplate = `
                <div class="partner col-6 col-lg-3">
                    <div class="partnerShare">
                        <p class="partnerPercentage">__value__</p>
                    </div>
                    <div class="unifier"></div>
                    <div class="partnerNameBlock">
                        <p class="partnerName">__name__</p>
                    </div>
                </div>`;

    $.ajax({
        type: "GET",
        url: '//codeit.pro/codeitCandidates/serverFrontendTest/company/getList',
        success: function (data) {
            companiesArray = data.list;
            displayCompanies();
            $('.infoBlock').removeClass('preloader');
        },
        error: function () {
            alert('Something went wrong');
        }
    });

    companiesList.on('click', 'li', function () {
        companiesList.find('li').removeClass('list-group-item-dark');
        displayCompanyPartners($(this).data('key'));
        $(this).addClass('list-group-item-dark');
    });

    function displayCompanies() {
        $('.numberOfCompanies span').text(companiesArray.length);

        $.each(companiesArray, function (key, company) {
            $('.companiesList').append(
                companyBlockTemplate.replace('__name__', company.name)
                    .replace('__key__', key)
            );
        });
    }

    function displayCompanyPartners(companyKey) {
        var partnersData = companiesArray[companyKey].partners,
            companyPartners = $('.companyPartners'),
            partnersContainer = companyPartners.find('.partners');

        $(this).addClass('active');
        companiesList.find('li').removeClass('active');
        partnersContainer.html('');

        $.each(partnersData, function (key, partner) {
            partnersContainer.append(
                partnerBlockTemplate.replace('__value__', partner.value)
                    .replace('__name__', partner.name)
            );
        });

        $(companyPartners).parent().removeClass('hidden');
    }
});
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