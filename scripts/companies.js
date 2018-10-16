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