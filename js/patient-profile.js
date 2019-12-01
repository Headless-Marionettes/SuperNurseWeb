var load = function() {
    $.ajaxSetup({
        beforeSend: function(request) {
            console.log("before send")
            var token = "JWT " + window.localStorage.getItem("token");
            console.log(token)
            request.setRequestHeader("Authorization", token);
        }
    });

    $.ajax({
        url: "https://super-nurse.herokuapp.com/patients/5ddaf723792621001758fb8d",
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
        }
    }).fail(function() {
        $("#patient-name").html("error");
        $("#patient-room").html("error");
        $("#patient-birth").html("error");
    })
}