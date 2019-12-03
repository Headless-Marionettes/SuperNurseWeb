// $("#userInfo").addEventListener("invalid", function(event) {
//     console.log('adding listener')
//     event.preventDefault();
// }, true);

$("#userInfo").submit(function (event) {
    // alert( "Handler for .submit() called." );
    event.preventDefault();

    console.log("createPatient()");

    var form = this;

    $("input", form).each(function() {
        var field = $(this).css('border-color', '#ced4da')
            .parent().next("span.form-error-message").addClass("hidden");;
    });

    var invalidFields = $(":invalid", form).each(function() {
        if ($(this)[0].validationMessage.length > 2) {
            var error = $(this).parent().next("span.form-error-message")
            error.removeClass("hidden");
        }
        $(this).css('border-color', '#e53935')

        console.log('invalid forms')
    });

    if (invalidFields.length <= 0) {
        event.preventDefault();
        console.log('sending')
    }

    $.ajaxSetup({
        beforeSend: function (request) {
            console.log("before send");
            var token = "JWT " + window.localStorage.getItem("token");
            console.log(token)
            request.setRequestHeader("Authorization", token);
        }
    });

    var jsonRawData = {
        first_name   : $("#patientFirstName").val(),
        last_name    : $("#patientLastName").val(),
        height       : $("#patientHeight").val(),
        weight       : $("#patientWeight").val(),
        date_of_birth: $("#patientDateOfBirth").val(),
        room         : $("#patientRoom").val(),
        alergies     : $("#patientAlergies").val(),
        blood_type   : $("#patientBloodType").val(),
        sex          : $("#patientSex").val(),

        emergency_contact: {
            name       : "Empty for now",
            phonenumber: "Empty for now",
            email      : "Empty for now",
            address    : "Empty for now"
        }
    };

    console.log("Before posting")

    $.ajax({
        url     : "https://super-nurse.herokuapp.com/patients",
        type    : "POST",
        dataType: 'json',
        data    : jsonRawData,
        success : function (data) {
            console.log("Patient created")
            window.location.href = "./patients-list.html"
        }
    }).fail(function (data) {
        console.log("Failed to create patient")
        console.log(data)
    })
});

$("#userInfo").bind("reset", function(){
    var form = this;

    console.log("reset")
    $("input", form).each(function() {
        var field = $(this).css('border-color', '#ced4da')
            .parent().next("span.form-error-message").text("no error")
            .addClass("hidden");;
    });
});
