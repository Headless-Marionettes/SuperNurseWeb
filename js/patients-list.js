var patientArray;

var load = function () {
    $.ajaxSetup({
        beforeSend: function (request) {
            console.log("before send")
            var token = "JWT " + window.localStorage.getItem("token");
            console.log(token)
            request.setRequestHeader("Authorization", token);
        }
    });

    $.ajax({
        url        : "https://super-nurse.herokuapp.com/patients",
        action     : "GET",
        context    : document.body,
        crossDomain: true,
        success    : function (data) {

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
                                    <p class="details-label">DOB: </p>
                                    <p id="DateOfBirth" class="details-value">${data[i].date_of_birth}</p>
                                </div>
                                <div class="details-row">
                                    <p class="details-label">Room: </p>
                                    <p id="Room" class="details-value">${data[i].room}</p>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>`)
            }
        }
    }).fail(function () {
        $("#patients").html("error");
    })
}

$('#filter-sex').ready(function () {
    var showMale = false
    var showFemales = false
    $("input").change(function () {
        if ($(this).attr("id") == "male") {
            if ($(this).is(":checked")) {
                console.log("male checked")
                showMale = true
            } else {
                console.log("male un-checked")
                showMale = false
            }
        } else if ($(this).attr("id") == "female") {
            if ($(this).is(":checked")) {
                console.log("fem checked")
                showFemales = true
            } else {
                console.log("fem un-checked")
                showFemales = false
            }
        }

        for (var i = 0; i < patientArray.length; i++) {
            if(patientArray[i].first_name == "Aloe" && showFemales) {
                $('#patients').empty();
                $('#patients').append(
                    `<div class="card-wrapper">
                    <a class="card-link row" href="patient-profile.html?id=${patientArray[i]._id}">
                        <div class="image-wraper col-6 col-sm-12">
                            <img src="./images/senior-placeholder.jpg" alt="" class="img-fluid">
                        </div>
                        <div class="content col-6 col-sm-12">
                            <p class="name subheading">${patientArray[i].first_name + " " + patientArray[i].last_name}</p>
                            <div class="details">
                                <div class="details-row">
                                    <p class="details-label">DOB: </p>
                                    <p class="details-value">${patientArray[i].date_of_birth}</p>
                                </div>
                                <div class="details-row">
                                    <p class="details-label">Room: </p>
                                    <p class="details-value">${patientArray[i].room}</p>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>`)
            }
        }
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
}

$('#search-input').on('input', function(e) {
    searchPatient()
});
