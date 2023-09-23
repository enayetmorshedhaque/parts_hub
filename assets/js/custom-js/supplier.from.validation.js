$(document).ready(function () {
    $("form").addClass("was-validate");

    // Add New Supplier validation starts here
    $("#supplier_name_english").on("blur", function () {
        let bengaliCharacterPattern = /^[\u0980-\u09FF\s]+$/;
        let bengaliNumberPattern = /^[\u09E6-\u09EF]+$/;
        let numbers = /([0-9])/;
        let specialCharacters = /[^\w\s]/gi;

        if ($(this).val() === "" || $.trim(($(this).val())) === "") {

            $("#supplier_name_english_feedback").html("Enter Supplier Name.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#supplier_name_english").removeClass("is-valid").addClass("is-invalid");

        } else if (bengaliNumberPattern.test($(this).val())) {

            $("#supplier_name_english_feedback").html("Bengali Numbers are not Allowed.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#supplier_name_english").removeClass("is-valid").addClass("is-invalid");

        } else if (bengaliCharacterPattern.test($(this).val())) {

            $("#supplier_name_english_feedback").html("Bengali Characters are not Allowed.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#supplier_name_english").removeClass("is-valid").addClass("is-invalid");

        } else if ($(this).val().match(numbers)) {

            $("#supplier_name_english_feedback").html("English Numbers are not Allowed.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#supplier_name_english").removeClass("is-valid").addClass("is-invalid");

        } else if (($(this).val()).charAt(0).match(specialCharacters)) {

            $("#supplier_name_english_feedback").html("Special Characters are not allowed.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#supplier_name_english").removeClass("is-valid").addClass("is-invalid");

        } else {

            $("#supplier_name_english_feedback").html("Looks Good!").removeClass("invalid-feedback").addClass("valid-feedback");
            $("#supplier_name_english").removeClass("is-invalid").addClass("is-valid");

        }
    });

    $("#supplier_address").on("blur", function () {
        let bengaliCharacterPattern = /^[\u0980-\u09FF\s]+$/;
        let bengaliNumberPattern = /^[\u09E6-\u09EF]+$/;
        let numbers = /([0-9])/;
        let specialCharacters = /[^\w\s]/gi;

        if ($(this).val() === "" || $.trim(($(this).val())) === "") {

            $("#supplier_address_feedback").html("Enter Supplier Address.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#supplier_address").removeClass("is-valid").addClass("is-invalid");

        } else if (bengaliNumberPattern.test($(this).val())) {

            $("#supplier_address_feedback").html("Bengali Numbers are not Allowed.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#supplier_address").removeClass("is-valid").addClass("is-invalid");

        } else if (bengaliCharacterPattern.test($(this).val())) {

            $("#supplier_address_feedback").html("Bengali Characters are not Allowed.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#supplier_address").removeClass("is-valid").addClass("is-invalid");

        } else if (($(this).val()).charAt(0).match(specialCharacters)) {

            $("#supplier_address_feedback").html("Special Characters at beginning are not allowed.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#supplier_address").removeClass("is-valid").addClass("is-invalid");

        } else {

            $("#supplier_address_feedback").html("Looks Good!").removeClass("invalid-feedback").addClass("valid-feedback");
            $("#supplier_address").removeClass("is-invalid").addClass("is-valid");

        }
    });

    $("#supplier_contact").on("blur", function () {
        let phone_number_validation = /([1-9])/;

        if ($(this).val() === "" || $.trim(($(this).val())) === "") {

            $("#supplier_contact_feedback").html("Enter Supplier Contact Number.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#supplier_contact").removeClass("is-valid").addClass("is-invalid");

        } else if (($(this).val()).length != 11 || ($(this).val()).charAt(0).match(phone_number_validation)) {

            $("#supplier_contact_feedback").html("Enter Valid Contact Number.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#supplier_contact").removeClass("is-valid").addClass("is-invalid");

        } else {

            $("#supplier_contact_feedback").html("Looks Good!").removeClass("invalid-feedback").addClass("valid-feedback");
            $("#supplier_contact").removeClass("is-invalid").addClass("is-valid");

        }
    });

    $("#createNewSupplier").on("click", function (event) {

        // Perform validation

        // Supplier Information
        let supplier_name_english = $("#supplier_name_english").val();
        let supplier_address = $("#supplier_address").val();
        let supplier_contact = $("#supplier_contact").val();

        // ===========================================================================================================

        // Supplier Information Length
        let supplier_name_english_input_length = supplier_name_english.length;
        let supplier_address_input_length = supplier_address.length;
        let supplier_contact_input_length = supplier_contact.length;

        if (supplier_name_english_input_length <= 0) {
            $("#supplier_name_english_feedback").html("This field is required.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#supplier_name_english").removeClass("is-valid").addClass("is-invalid");
            isValid = false;
        }

        if (supplier_address_input_length <= 0) {
            $("#supplier_address_feedback").html("This field is required.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#supplier_address").removeClass("is-valid").addClass("is-invalid");
            isValid = false;
        }

        if (supplier_contact_input_length <= 0) {
            $("#supplier_contact_feedback").html("This field is required.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#supplier_contact").removeClass("is-valid").addClass("is-invalid");
            isValid = false;
        }

        // Prevent form submission if there are errors
        if ($(".is-invalid:visible").length > 0 || $(".invalid-feedback:visible").length > 0) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();

            // Serialize the form data into a JSON object
            let supplierFormData = $("#addNewSupplierForm").serialize();

            $.ajax({
                type: "POST",
                url: '../assets/db/add-new-supplier-customer-submit.php', // Change this to the path of your PHP script
                data: supplierFormData,
                success: function (response) {
                    Swal.fire({
                        toast: true,
                        title: 'New supplier ' + response,
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
            $("#addNewSupplierForm input").val("").removeClass("is-valid");
            $("#addNewSupplierForm select").val("").removeClass("is-valid");
            $("#addNewSupplierForm textarea").val("").removeClass("is-valid");
            $(".feedback").html("").removeClass("valid-feedback");
        }
    });
    // Add New Supplier validation ends here   
});