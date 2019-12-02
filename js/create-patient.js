var createPatient = function() {
    console.log("createPatient()")

    $.ajaxSetup({
        beforeSend: function(request) {
            console.log("before send")
            var token = "JWT " + window.localStorage.getItem("token");
            console.log(token)
            request.setRequestHeader("Authorization", token);
        }
    });

    var jsonRawData = {
        first_name: $("#patientFirstName").val(),
        last_name: $("#patientLastName").val(),
        height: $("#patientHeight").val(),
        weight: $("#patientWeight").val(),
        date_of_birth: $("#patientDateOfBirth").val(),
        room: $("#patientRoom").val(),
        alergies: $("#patientAlergies").val(),
        blood_type: $("#patientBloodType").val(),
        sex: $("#patientSex").val(),

        emergency_contact: {
            name: "Empty for now",
            phonenumber: "1Empty for now",
            email: "Empty for now",
            address: "Empty for now"
        }
    };

    console.log("Before posting")

    $.ajax({
        url: "https://super-nurse.herokuapp.com/patients",
        type: "POST",
        dataType: 'json',
        data: jsonRawData,
        success: function(data) {
            console.log("Patient created")
            window.location.href = "./patients-list.html"
        }
    }).fail(function(data) {
        console.log("Failed to create patient")
        console.log(data)
    })
}
