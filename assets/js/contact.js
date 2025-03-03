$(document).ready(function() {
    $("#contact-form").submit(function(event) {
        event.preventDefault(); // Prevent form from refreshing the page

        // Get values
        let name = $("#name").val().trim();
        let email = $("#email").val().trim();
        let subject = $("#subject").val().trim();
        let message = $("#message").val().trim();

        // Check fields are filled
        if (name === "" || email === "" || subject === "" || message === "") {
            alert("Please fill in all fields.");
            return;
        }

        // Pop-up message
        alert("Thank you, " + name + "! Your message has been sent.");

        // Clear fields after submission
        $("#contact-form")[0].reset();
    });
});
