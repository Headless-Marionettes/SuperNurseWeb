var load = function() {
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
                    <h3 class="text-dark-primary">Report from ${data[i].date}</h3>
                    <div class="row">
                        <div class="col-md font-weight-bold mt-4">Blood Pressure: ${data[i].blood_pressure}</div>
                        <div class="col-md font-weight-bold mt-4">Respiratory Rate: ${data[i].respiratory_rate}</div>
                    </div>
                    <div class="row">
                        <div class="col-md font-weight-bold mt-4">Blood Oxygen: ${data[i].blood_oxygen_level}</div>
                        <div class="col-md font-weight-bold mt-4">Heart Beat Rate: ${data[i].heart_beat_rate}</div>
                    </div>
                    <div class="row">
                        <div class="col-md font-weight-bold mt-4">Additional Information: ${data[i].additional_info}</div>
                    </div>
                </div>`
                )
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