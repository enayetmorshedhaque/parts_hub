$(document).ready(function () {
    $("form").addClass("was-validate");

    $("#customer_name_english").on("blur", function () {
        let bengaliCharacterPattern = /^[\u0980-\u09FF\s]+$/;
        let bengaliNumberPattern = /^[\u09E6-\u09EF]+$/;
        let numbers = /([0-9])/;
        let specialCharacters = /[^\w\s]/gi;

        if ($(this).val() === "" || $.trim(($(this).val())) === "") {
            $("#customer_name_english_feedback").html("Enter Customer Name.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#customer_name_english").removeClass("is-valid").addClass("is-invalid");
        } else if (bengaliNumberPattern.test($(this).val())) {
            $("#customer_name_english_feedback").html("Bengali Numbers are not Allowed.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#customer_name_english").removeClass("is-valid").addClass("is-invalid");
        } else if (bengaliCharacterPattern.test($(this).val())) {
            $("#customer_name_english_feedback").html("Bengali Characters are not Allowed.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#customer_name_english").removeClass("is-valid").addClass("is-invalid");
        } else if (($(this).val()).charAt(0).match(numbers)) {
            $("#customer_name_english_feedback").html("English Numbers are not Allowed.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#customer_name_english").removeClass("is-valid").addClass("is-invalid");
        } else if (($(this).val()).charAt(0).match(specialCharacters)) {
            $("#customer_name_english_feedback").html("Special Characters are not allowed.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#customer_name_english").removeClass("is-valid").addClass("is-invalid");
        } else {
            $("#customer_name_english_feedback").html("Looks Good!").removeClass("invalid-feedback").addClass("valid-feedback");
            $("#customer_name_english").removeClass("is-invalid").addClass("is-valid");
        }
    });

    $("#customer_address").on("blur", function () {
        let bengaliCharacterPattern = /^[\u0980-\u09FF\s]+$/;
        let bengaliNumberPattern = /^[\u09E6-\u09EF]+$/;
        let numbers = /([0-9])/;
        let specialCharacters = /[^\w\s]/gi;

        if ($(this).val() === "" || $.trim(($(this).val())) === "") {
            $("#customer_address_feedback").html("Enter Customer Address.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#customer_address").removeClass("is-valid").addClass("is-invalid");
        } else if (bengaliNumberPattern.test($(this).val())) {
            $("#customer_address_feedback").html("Bengali Numbers are not Allowed.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#customer_address").removeClass("is-valid").addClass("is-invalid");
        } else if (bengaliCharacterPattern.test($(this).val())) {
            $("#customer_address_feedback").html("Bengali Characters are not Allowed.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#customer_address").removeClass("is-valid").addClass("is-invalid");
        } else if (($(this).val()).charAt(0).match(specialCharacters)) {
            $("#customer_address_feedback").html("Special Characters at beginning are not allowed.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#customer_address").removeClass("is-valid").addClass("is-invalid");
        } else {
            $("#customer_address_feedback").html("Looks Good!").removeClass("invalid-feedback").addClass("valid-feedback");
            $("#customer_address").removeClass("is-invalid").addClass("is-valid");
        }
    });

    $("#customer_contact").on("blur", function () {
        let phone_number_validation = /([1-9])/;

        if ($(this).val() === "" || $.trim(($(this).val())) === "") {
            $("#customer_contact_feedback").html("Enter Customer Contact Number.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#customer_contact").removeClass("is-valid").addClass("is-invalid");
        } else if (($(this).val()).length != 11 || ($(this).val()).charAt(0).match(phone_number_validation)) {
            $("#customer_contact_feedback").html("Enter Valid Contact Number.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#customer_contact").removeClass("is-valid").addClass("is-invalid");
        } else {
            $("#customer_contact_feedback").html("Looks Good!").removeClass("invalid-feedback").addClass("valid-feedback");
            $("#customer_contact").removeClass("is-invalid").addClass("is-valid");
        }
    });

    $("#createNewCustomer").on("click", function (event) {

        // Perform validation

        // Business Information
        let Customer_name_english = $("#customer_name_english").val();
        let Customer_address = $("#customer_address").val();
        let Customer_contact = $("#customer_contact").val();

        // ===========================================================================================================

        // Customer Information Length
        let Customer_name_english_input_length = Customer_name_english.length;
        let Customer_address_input_length = Customer_address.length;
        let Customer_contact_input_length = Customer_contact.length;

        let isValid = true;

        if (Customer_name_english_input_length <= 0) {
            $("#customer_name_english_feedback").html("This field is required.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#customer_name_english").removeClass("is-valid").addClass("is-invalid");
            isValid = false;
        }

        if (Customer_address_input_length <= 0) {
            $("#customer_address_feedback").html("This field is required.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#customer_address").removeClass("is-valid").addClass("is-invalid");
            isValid = false;
        }

        if (Customer_contact_input_length <= 0) {
            $("#customer_contact_feedback").html("This field is required.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#customer_contact").removeClass("is-valid").addClass("is-invalid");
            isValid = false;
        }

        // Prevent form submission if there are errors
        if ($(".is-invalid:visible").length > 0 || $("invalid-feedback:visible").length > 0) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();

            // Serialize the form data into a JSON object
            let customerFormData = $("#addNewCustomerForm").serialize();

            $.ajax({
                type: "POST",
                url: '../assets/db/add-new-supplier-customer-submit.php', // Change this to the path of your PHP script
                data: customerFormData,
                success: function (response) {
                    Swal.fire({
                        toast: true,
                        title: 'New customer ' + response,
                        position: 'top-end', // Change position as needed (top-start, top-end, bottom-start, bottom-end)
                        showConfirmButton: false,
                        timer: 2000, // Duration in milliseconds (2 seconds in this example)
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    });
                },
            });
            $("#addNewCustomerForm input").val("").removeClass("is-valid");
            $("#addNewCustomerForm select").val("").removeClass("is-valid");
            $("#addNewCustomerForm textarea").val("").removeClass("is-valid");
            $(".feedback").html("").removeClass("valid-feedback");
        }
    });
    // Add New Customer validation ends here   
});