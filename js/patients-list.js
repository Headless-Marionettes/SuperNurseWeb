var patientArray;

var load = function() {
    var currentLanguage = window.localStorage.getItem("language")

    if (currentLanguage == "ru") {
        $('[lang="en"]').hide();
    } else {
        $('[lang="ru"]').hide();
    }


    $.ajaxSetup({
        beforeSend: function(request) {
            console.log("before send")
            var token = "JWT " + window.localStorage.getItem("token");
            console.log(token)
            request.setRequestHeader("Authorization", token);
        }
    });

    $.ajax({
        url: "https://super-nurse.herokuapp.com/patients",
        action: "GET",
        context: document.body,
        crossDomain: true,
        success: function(data) {

            patientArray = data;

            for (var i = 0; i < data.length; i++) {
                $('#patients').append(
                    `<div class="card-wrapper">
                    <a class="card-link row" href="patient-profile.html?id=${data[i]._id}">
                        <div class="image-wraper col-6 col-sm-12">
                            <img src="./images/senior-placeholder.jpg" alt="" class="img-fluid">
                        </div>
                        <div class="content col-6 col-sm-12">
                            <p id="FullNameID" class="name subheading">${data[i].first_name + " " + data[i].last_name}</p>
                            <div class="details">
                                <div class="details-row">
                                    <p class="details-label"><span lang="en">DOB: </span><span lang="ru">ДР: </span></p>
                                    <p id="DateOfBirth" class="details-value">${data[i].date_of_birth}</p>
                                </div>
                                <div class="details-row">
                                    <p class="details-label"><span lang="en">Room: </span><span lang="ru">Палата: </span></p>
                                    <p id="Room" class="details-value">${data[i].room}</p>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>`)
            }

            if (currentLanguage == "ru") {
                $('[lang="en"]').hide();
            } else {
                $('[lang="ru"]').hide();
            }
        }
    }).fail(function() {
        $("#patients").html("error");
    })
};

$('#filters').ready(function() {

    $(".btn").click(function(event) {
        event.preventDefault();
    });

    var showMales = $("#male:checked").length;
    var showFemales = $("#female:checked").length;

    var showAge1 = $("#age1:checked").length;
    var showAge2 = $("#age2:checked").length;
    var showAge3 = $("#age3:checked").length;
    var showAge4 = $("#age4:checked").length;
    var showAge5 = $("#age5:checked").length;

    $("#filters input").change(function() {
        showMales = $("#male:checked").length;
        showFemales = $("#female:checked").length;

        showAge1 = $("#age1:checked").length;
        showAge2 = $("#age2:checked").length;
        showAge3 = $("#age3:checked").length;
        showAge4 = $("#age4:checked").length;
        showAge5 = $("#age5:checked").length;

        $('#patients').empty();

        var currentYear = new Date().getFullYear();

        for (var i = 0; i < patientArray.length; i++) {
            var patientBirthYear = (patientArray[i].date_of_birth).match(/[0-9]{4}$/g);
            // console.log(patientBirthYear);
            var age = currentYear - patientBirthYear;
            console.log(age);

            if ((patientArray[i].sex == "F" && showFemales) || (patientArray[i].sex == "M" && showMales)) {
                if ((age <= 60 && showAge1) ||
                    (age > 60 && age <= 70 && showAge2) ||
                    (age > 70 && age <= 80 && showAge3) ||
                    (age > 80 && age <= 90 && showAge4) ||
                    (age > 90 && showAge5)) {

                    $('#patients').append(
                        `<div class="card-wrapper">
                    <a class="card-link row" href="patient-profile.html?id=${patientArray[i]._id}">
                        <div class="image-wraper col-6 col-sm-12">
                            <img src="./images/senior-placeholder.jpg" alt="" class="img-fluid">
                        </div>
                        <div class="content col-6 col-sm-12">
                            <p id="FullNameID" class="name subheading">${patientArray[i].first_name + " " + patientArray[i].last_name}</p>
                            <div class="details">
                                <div class="details-row">
                                    <p class="details-label">DOB: </p>
                                    <p id="DateOfBirth" class="details-value">${patientArray[i].date_of_birth}</p>
                                </div>
                                <div class="details-row">
                                    <p class="details-label">Room: </p>
                                    <p id="Room" class="details-value">${patientArray[i].room}</p>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>`)
                }
            }
        }

        $("#sort input").trigger("change");

    });
});

$('#sort').ready(function() {
    var fnAsc = $("#sort-fn-asc:checked").length;
    var fnDesc = $("#sort-fn-desc:checked").length;
    var lnAsc = $("#sort-ln-asc:checked").length;
    var lnDesc = $("#sort-ln-desc:checked").length;

    $("#sort input").change(function() {
        fnAsc = $("#sort-fn-asc:checked").length;
        fnDesc = $("#sort-fn-desc:checked").length;
        lnAsc = $("#sort-ln-asc:checked").length;
        lnDesc = $("#sort-ln-desc:checked").length;

        var patients = $(".card-wrapper").toArray();

        patients.sort(function(a, b) {
            var keyA = a.querySelector("#FullNameID").innerHTML;
            var keyB = b.querySelector("#FullNameID").innerHTML;

            if (lnAsc || lnDesc) {
                keyA = keyA.match(/(\w+)$/g);
                keyB = keyB.match(/(\w+)$/g);
            }

            if ((keyA < keyB && (fnAsc || lnAsc)) || (keyA > keyB && (fnDesc || lnDesc))) {
                return -1;
            }
            if ((keyA > keyB && (fnAsc || lnAsc)) || (keyA < keyB && (fnDesc || lnDesc))) {
                return 1;
            }
            return 0;

        });

        var container = $('#patients');
        $.each(patients, function(i, patient) {
            container.append(patient);
        });
    });
});



var searchPatient = function() {
    var request = $("#search-input").val().toLowerCase()

    $('.card-wrapper').each(function(i, obj) {
        var fullName = obj.querySelector("#FullNameID").innerHTML;
        var dateOfBirth = obj.querySelector("#DateOfBirth").innerHTML;
        var room = obj.querySelector("#Room").innerHTML;

        if (fullName.toLowerCase().includes(request) ||
            dateOfBirth.toLowerCase().includes(request) ||
            room.toLowerCase().includes(request)) {
            obj.style.display = "block"
        } else {
            obj.style.display = "none"
        }
    });
};

$('#search-input').on('input', function(e) {
    searchPatient()
});
