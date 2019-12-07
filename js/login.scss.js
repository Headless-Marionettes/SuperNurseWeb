var load = function() {
    window.localStorage.removeItem("token");
};

$("#sign-in-form").each(function() {
    var form = this;
    var ajax_form = $(this);

    // Suppress the default bubbles
    form.addEventListener("invalid", function(event) {
        event.preventDefault();
    }, true);

    $("button[type=submit]", form).on("click", function(event) {

        //Destroy error message from previous runs
        $("input", form).each(function() {
            var field = $(this).css('border-color', '#ced4da')
                .parent().next("span.form-error-message").text("no error")
                .addClass("hidden");;
        });

        //loop through all invalid fields
        var invalidFields = $(":invalid", form).each(function() {
            if ($(this)[0].validationMessage.length > 2) {
                $(this).parent().next("span.form-error-message")
                    .html('&#9785; ' + $(this)[0].validationMessage)
                    .removeClass("hidden");
            }
            $(this).css('border-color', '#e53935')
        });

        if (invalidFields.length <= 0) {
            event.preventDefault();

            var url = "https://super-nurse.herokuapp.com/auth/signin"; //form.attr('action');

            $.ajax({
                type: "POST",
                url: url,
                data: ajax_form.serialize(), // serializes the form's elements.
                success: function(data) {
                    let token = data.token;
                    window.localStorage.setItem("token", token);
                    window.location.href = "./patients-list.html";

                    window.localStorage.setItem("language", "en");
                    // console.log(token);
                }
            }).fail(function(data) {
                var authGroup = document.getElementById('auth-group');
                authGroup.nextElementSibling.style.display = "block";

                console.log(data);
            });

            event.preventDefault();
        }
    });
});