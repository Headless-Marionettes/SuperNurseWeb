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

    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
    console.log(id);

    $.ajax({
        url: "https://super-nurse.herokuapp.com/patients/" + id,
        action: "GET",
        context: document.body,
        crossDomain: true,
        success: function(data) {
            $('#patient-name').html(data[0].first_name + " " + data[0].last_name)
            $("#patient-room").html(data[0].room);
            $("#patient-birth").html(data[0].date_of_birth);
            $("#patient-height").html(data[0].height);
            $("#patient-weight").html(data[0].weight);
            $("#patient-allergies").html(data[0].alergies);
        },
        error: function() {
            $("#patient-name").html("error");
            $("#patient-room").html("error");
            $("#patient-birth").html("error");
            $("#patient-height").html("error");
            $("#patient-weight").html("error");
            $("#patient-allergies").html("error");
        }
    })

    $.ajax({
        url: "https://super-nurse.herokuapp.com/patients/" + id + "/records",
        action: "GET",
        context: document.body,
        crossDomain: true,
        success: function(data) {
            if (data.length == 0) {
                $('#listReports').append(`<h2>There are no reports</h2>`)
            }
            for (var i = data.length - 1; i >= 0; i--) {
                $('#listReports').append(
                    `<div class="shadow border rounded p-3 mb-3">
                    <h3 class="text-dark-primary"><span lang="en">Report from: </span><span lang="ru">Отчет от: </span>${data[i].date}</h3>
                    <div class="row">
                        <div class="col-md font-weight-bold mt-4"><span lang="en">Blood Pressure: </span><span lang="ru">Давление: </span>${data[i].blood_pressure}</div>
                        <div class="col-md font-weight-bold mt-4"><span lang="en">Respiratory Rate: </span><span lang="ru">Частота дыхания: </span>${data[i].respiratory_rate}</div>
                    </div>
                    <div class="row">
                        <div class="col-md font-weight-bold mt-4"><span lang="en">Blood Oxygen: </span><span lang="ru">Кислород в крови: </span>${data[i].blood_oxygen_level}</div>
                        <div class="col-md font-weight-bold mt-4"><span lang="en">Heart Beat Rate: </span><span lang="ru">Пульс: </span>${data[i].heart_beat_rate}</div>
                    </div>
                    <div class="row">
                        <div class="col-md font-weight-bold mt-4"><span lang="en">Additional Information: </span><span lang="ru">Доп информация: </span>${data[i].additional_info}</div>
                    </div>
                </div>`
                )

                if (currentLanguage == "ru") {
                    $('[lang="en"]').hide();
                } else {
                    $('[lang="ru"]').hide();
                }
            }
        },
        error: function() {
            $('#listReports').html('Error')
        }
    })
}

$("#new-report-form").ready(function() {
    $("#new-report-form").submit(function(e) {
        e.preventDefault();

        $.ajaxSetup({
            beforeSend: function(request) {
                console.log("before send")
                var token = "JWT " + window.localStorage.getItem("token");
                console.log(token)
                request.setRequestHeader("Authorization", token);
            }
        });

        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");

        var url = "https://super-nurse.herokuapp.com/patients/" + id + "/records";
        console.log(url);

        var ajax_form = $(this);
        var reportJson = ajax_form.serialize();

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }
        today = dd + '/' + mm + '/' + yyyy;
        reportJson += "&date=" + today
        console.log(reportJson)

        $.ajax({
            type: "POST",
            url: url,
            data: reportJson,
            success: function(data) {
                console.log("Report added")
                location.reload();
            },
            error: function() {
                console.log("Error adding report")
            }
        })
    });
})