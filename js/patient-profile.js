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
}