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
        url: "https://super-nurse.herokuapp.com/patients",
        action: "GET",
        context: document.body,
        crossDomain: true,
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                $('#patients').append(
                    `<div class="card-wrapper">
                    <a class="card-link row" href="patient-profile.html?id=${data[i]._id}">
                        <div class="image-wraper col-6 col-sm-12">
                            <img src="./images/senior-placeholder.jpg" alt="" class="img-fluid">
                        </div>
                        <div class="content col-6 col-sm-12">
                            <p class="name subheading">${data[i].first_name + " " + data[i].last_name}</p>
                            <div class="details">
                                <div class="details-row">
                                    <p class="details-label">Date of birth: </p>
                                    <p class="details-value">${data[i].date_of_birth}</p>
                                </div>
                                <div class="details-row">
                                    <p class="details-label">Room: </p>
                                    <p class="details-value">${data[i].room}</p>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>`)
            }
        }
    }).fail(function() {
        $("#patients").html("error");
    })
}

