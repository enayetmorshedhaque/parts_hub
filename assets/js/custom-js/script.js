$(document).ready(function () {
    $("form").addClass("was-validate");

    // Courier company validation starts here
    $("#add_new_courier_name").on("blur", function () {
        let numbers = /([0-9])/;
        let specialCharacters = /[^\w\s]/gi;

        if ($(this).val() === "" || $.trim(($(this).val())) === "") {

            $("#add_new_courier_feedback").html("Enter Courier Name.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#add_new_courier_name").removeClass("is-valid").addClass("is-invalid");

        } else if ($(this).val().match(numbers)) {

            $("#add_new_courier_feedback").html("Numbers are not allowed.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#add_new_courier_name").removeClass("is-valid").addClass("is-invalid");

        } else if ($(this).val().match(specialCharacters)) {

            $("#add_new_courier_feedback").html("Special Characters are not allowed.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#add_new_courier_name").removeClass("is-valid").addClass("is-invalid");

        } else {

            $("#add_new_courier_feedback").html("Looks Good!").removeClass("invalid-feedback").addClass("valid-feedback");
            $("#add_new_courier_name").removeClass("is-invalid").addClass("is-valid");

        }
    });

    $("#courier_shop_id").on("blur", function () {
        if ($(this).val().length > 0) {

            $("#courier_shop_id_feedback").html("Looks Good!").removeClass("invalid-feedback").addClass("valid-feedback");
            $("#courier_shop_id").removeClass("is-invalid").addClass("is-valid");

        } else {

            $("#courier_location_feedback").html("").removeClass("invalid-feedback valid-feedback");
            $("#courier_shop_id").removeClass("is-invalid is-valid");

        }
    });

    $("#courier_location").on("blur", function () {
        if ($(this).val() === "") {

            $("#courier_location_feedback").html("Select courier location").removeClass("valid-feedback").addClass("invalid-feedback ");
            $("#courier_location").removeClass("is-valid").addClass("is-invalid");

        } else {

            $("#courier_location_feedback").html("Looks Good!").removeClass("invalid-feedback").addClass("valid-feedback");
            $("#courier_location").removeClass("is-invalid").addClass("is-valid");

        }
    });

    $("#add_courier_base_charge").on("blur", function () {
        let numbers = /([0-9])/;
        let specialCharacters = /[^\w\s]/gi;

        if ($(this).val() === "" || $.trim(($(this).val())) === "") {

            $("#courier_base_charge_feedback").html("Enter courier base charge.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#add_courier_base_charge").removeClass("is-valid").addClass("is-invalid");

        } else if (!$(this).val().match(numbers)) {

            $("#courier_base_charge_feedback").html("Characters are not allowed.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#add_courier_base_charge").removeClass("is-valid").addClass("is-invalid");

        } else if ($(this).val().match(specialCharacters)) {

            $("#courier_base_charge_feedback").html("Special Characters are not allowed.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#add_courier_base_charge").removeClass("is-valid").addClass("is-invalid");

        } else {

            $("#courier_base_charge_feedback").html("Looks Good!").removeClass("invalid-feedback").addClass("valid-feedback");
            $("#add_courier_base_charge").removeClass("is-invalid").addClass("is-valid");

        }
    });

    $("#add_courier_extra_charge").on("blur", function () {
        let numbers = /([0-9])/;
        let specialCharacters = /[^\w\s]/gi;

        if ($(this).val() === "" || $.trim(($(this).val())) === "") {

            $("#courier_extra_charge_feedback").html("Enter courier base charge.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#add_courier_extra_charge").removeClass("is-valid").addClass("is-invalid");

        } else if (!$(this).val().match(numbers)) {

            $("#courier_extra_charge_feedback").html("Characters are not allowed.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#add_courier_extra_charge").removeClass("is-valid").addClass("is-invalid");

        } else if ($(this).val().match(specialCharacters)) {

            $("#courier_extra_charge_feedback").html("Special Characters are not allowed.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#add_courier_extra_charge").removeClass("is-valid").addClass("is-invalid");

        } else {

            $("#courier_extra_charge_feedback").html("Looks Good!").removeClass("invalid-feedback").addClass("valid-feedback");
            $("#add_courier_extra_charge").removeClass("is-invalid").addClass("is-valid");

        }
    });

    $("#maximum_allowed_weight").on("blur", function () {
        if ($(this).val().length > 0) {

            $("#maximum_allowed_weight_feedback").html("Looks Good!").removeClass("invalid-feedback").addClass("valid-feedback");
            $("#maximum_allowed_weight").removeClass("is-invalid").addClass("is-valid");

        } else {

            $("#maximum_allowed_weight_feedback").html("").removeClass("invalid-feedback valid-feedback");
            $("#maximum_allowed_weight").removeClass("is-invalid is-valid");

        }
    });

    $("#addCourierService").on("click", function (event) {

        // Perform validation
        let add_new_courier = $("#add_new_courier_name").val();
        let courier_location = $("#courier_location").val();
        let add_courier_base_charge = $("#add_courier_base_charge").val();
        let add_courier_extra_charge = $("#add_courier_extra_charge").val();


        let add_new_courier_length = add_new_courier.length;
        let courier_location_length = courier_location.length;
        let add_courier_base_charge_length = add_courier_base_charge.length;
        let add_courier_extra_charge_length = add_courier_extra_charge.length;

        let isValid = true;

        if (add_new_courier_length <= 0) {
            $("#add_new_courier_feedback").html("This field is required.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#add_new_courier_name").removeClass("is-valid").addClass("is-invalid");
            isValid = false;
        }

        if (courier_location_length <= 0) {
            $("#courier_location_feedback").html("This field is required.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#courier_location").removeClass("is-valid").addClass("is-invalid");
            isValid = false;
        }

        if (add_courier_base_charge_length <= 0) {
            $("#courier_base_charge_feedback").html("This field is required.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#add_courier_base_charge").removeClass("is-valid").addClass("is-invalid");
            isValid = false;
        }

        if (add_courier_extra_charge_length <= 0) {
            $("#courier_extra_charge_feedback").html("This field is required.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#add_courier_extra_charge").removeClass("is-valid").addClass("is-invalid");
            isValid = false;
        }

        // Prevent form submission if there are errors
        if ($(".invalid-feedback:visible").length > 0 || $(".is-invalid:visible").length > 0) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();

            // Serialize the form data into a JSON object
            let formData = $("#addCourierInformation").serialize();

            $.ajax({
                type: "POST",
                url: '../assets/db/dynamic-settings-data-submit.php', // Change this to the path of your PHP script
                data: formData,
                success: function (response) {
                    Swal.fire({
                        toast: true,
                        title: 'Data ' + response,
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
            $("#add_new_courier_name").val("");
            $("#add_new_courier_feedback").html("").removeClass("valid-feedback");
            $("#add_new_courier_name").removeClass("is-valid");

            $("#courier_shop_id").val("");
            $("#courier_shop_id_feedback").html("").removeClass("valid-feedback");
            $("#courier_shop_id").removeClass("is-valid");

            $("#courier_location").val("");
            $("#courier_location_feedback").html("").removeClass("valid-feedback");
            $("#courier_location").removeClass("is-valid");

            $("#add_courier_base_charge").val("");
            $("#add_new_courier_feedback").html("").removeClass("valid-feedback");
            $("#add_courier_base_charge").removeClass("is-valid");

            $("#add_courier_extra_charge").val("");
            $("#courier_base_charge_feedback").html("").removeClass("valid-feedback");
            $("#add_courier_extra_charge").removeClass("is-valid");

            $("#maximum_allowed_weight").val("");
            $("#maximum_allowed_weight_feedback").html("").removeClass("valid-feedback");
            $("#maximum_allowed_weight").removeClass("is-valid");
        }
    });
    // Courier company validation ends here

    // ==================================================================================================================================

    // Customer Type validation starts here
    $("#add_customer_type").on("blur", function () {
        let numbers = /([0-9])/;
        let specialCharacters = /[^\w\s]/gi;

        if ($(this).val() === "" || $.trim(($(this).val())) === "") {

            $("#customer_type_feedback").html("Enter Customer Type.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#add_customer_type").removeClass("is-valid").addClass("is-invalid");

        } else if ($(this).val().match(numbers)) {

            $("#customer_type_feedback").html("Numbers are not allowed.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#add_customer_type").removeClass("is-valid").addClass("is-invalid");

        } else if ($(this).val().match(specialCharacters)) {

            $("#customer_type_feedback").html("Special Characters are not allowed.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#add_customer_type").removeClass("is-valid").addClass("is-invalid");

        } else {

            $("#customer_type_feedback").html("Looks Good!").removeClass("invalid-feedback").addClass("valid-feedback");
            $("#add_customer_type").removeClass("is-invalid").addClass("is-valid");

        }
    });

    $("#addCustomerTypeButton").on("click", function (event) {

        // Perform validation
        let add_customer_type = $("#add_customer_type").val();
        let input_length = add_customer_type.length;
        let isValid = true;

        if (input_length <= 0) {
            $("#customer_type_feedback").html("This field is required.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#add_customer_type").removeClass("is-valid").addClass("is-invalid");
            isValid = false;
        }

        // Prevent form submission if there are errors
        if ($(".invalid-feedback:visible").length > 0 || $(".is-invalid:visible").length > 0) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            $.ajax({
                type: "POST",
                url: "../assets/db/dynamic-settings-data-submit.php",
                data: {
                    "add_customer_type_btn": 1,
                    "add_customer_type": add_customer_type,
                },
                success: function (response) {
                    Swal.fire({
                        toast: true,
                        title: 'Data ' + response,
                        position: 'top-end', // Change position as needed (top-start, top-end, bottom-start, bottom-end)
                        showConfirmButton: false,
                        timer: 2000, // Duration in milliseconds (3 seconds in this example)
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    });
                },
            });
            $("#add_customer_type").val("");
            $("#customer_type_feedback").html("").removeClass("valid-feedback");
            $("#add_customer_type").removeClass("is-valid");
        }
    });
    // Customer Type validation ends here

    // ==================================================================================================================================

    // MFS Type validation starts here
    $("#add_mfs_type_input").on("blur", function () {
        let numbers = /([0-9])/;
        let specialCharacters = /[^\w\s]/gi;

        if ($(this).val() === "" || $.trim(($(this).val())) === "") {

            $("#mfs_type_feedback").html("Enter Mfs Type.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#add_mfs_type_input").removeClass("is-valid").addClass("is-invalid");

        } else if ($(this).val().match(numbers)) {

            $("#mfs_type_feedback").html("Numbers are not allowed.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#add_mfs_type_input").removeClass("is-valid").addClass("is-invalid");

        } else if ($(this).val().match(specialCharacters)) {

            $("#mfs_type_feedback").html("Special Characters are not allowed.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#add_mfs_type_input").removeClass("is-valid").addClass("is-invalid");

        } else {

            $("#mfs_type_feedback").html("Looks Good!").removeClass("invalid-feedback").addClass("valid-feedback");
            $("#add_mfs_type_input").removeClass("is-invalid").addClass("is-valid");

        }
    });

    $("#addMfsType").on("click", function (event) {

        // Perform validation
        let mfs_type_input = $("#add_mfs_type_input").val();
        let input_length = mfs_type_input.length;
        let isValid = true;

        if (input_length <= 0) {
            $("#mfs_type_feedback").html("This field is required.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#add_mfs_type_input").removeClass("is-valid").addClass("is-invalid");
            isValid = false;
        }

        // Prevent form submission if there are errors
        if ($(".invalid-feedback:visible").length > 0 || $(".is-invalid:visible").length > 0) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            $.ajax({
                type: "POST",
                url: "../assets/db/dynamic-settings-data-submit.php",
                data: {
                    "add_mfs_type_btn": 1,
                    "add_mfs_type": mfs_type_input,
                },
                success: function (response) {
                    Swal.fire({
                        toast: true,
                        title: 'Data ' + response,
                        position: 'top-end', // Change position as needed (top-start, top-end, bottom-start, bottom-end)
                        showConfirmButton: false,
                        timer: 2000, // Duration in milliseconds (3 seconds in this example)
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    });
                },
            });
            $("#add_mfs_type_input").val("");
            $("#mfs_type_feedback").html("").removeClass("valid-feedback");
            $("#add_mfs_type_input").removeClass("is-valid");
        }
    });
    // MFS Type validation ends here

    // ==================================================================================================================================

    // MFS Service validation starts here
    $("#add_mfs_service").on("blur", function () {
        let numbers = /([0-9])/;
        let specialCharacters = /[^\w\s]/gi;

        if ($(this).val() === "" || $.trim(($(this).val())) === "") {

            $("#mfs_service_feedback").html("Enter Mfs Service Name.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#add_mfs_service").removeClass("is-valid").addClass("is-invalid");

        } else if ($(this).val().match(numbers)) {

            $("#mfs_service_feedback").html("Numbers are not allowed.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#add_mfs_service").removeClass("is-valid").addClass("is-invalid");

        } else if ($(this).val().match(specialCharacters)) {

            $("#mfs_service_feedback").html("Special Characters are not allowed.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#add_mfs_service").removeClass("is-valid").addClass("is-invalid");

        } else {

            $("#mfs_service_feedback").html("Looks Good!").removeClass("invalid-feedback").addClass("valid-feedback");
            $("#add_mfs_service").removeClass("is-invalid").addClass("is-valid");

        }
    });

    $("#addMfsService").on("click", function (event) {

        // Perform validation
        let mfs_service = $("#add_mfs_service").val();
        let input_length = mfs_service.length;
        let isValid = true;

        if (input_length <= 0) {
            $("#mfs_service_feedback").html("This field is required.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#add_mfs_service").removeClass("is-valid").addClass("is-invalid");
            isValid = false;
        }

        // Prevent form submission if there are errors
        if ($(".invalid-feedback:visible").length > 0 || $(".is-invalid:visible").length > 0) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            $.ajax({
                type: "POST",
                url: "../assets/db/dynamic-settings-data-submit.php",
                data: {
                    "add_mfs_service_btn": 1,
                    "add_mfs_service": mfs_service,
                },
                success: function (response) {
                    Swal.fire({
                        toast: true,
                        title: 'Data ' + response,
                        position: 'top-end', // Change position as needed (top-start, top-end, bottom-start, bottom-end)
                        showConfirmButton: false,
                        timer: 2000, // Duration in milliseconds (3 seconds in this example)
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    });
                },
            });
            $("#add_mfs_service").val("");
            $("#mfs_service_feedback").html("").removeClass("valid-feedback");
            $("#add_mfs_service").removeClass("is-valid");
        }
    });
    // MFS Service validation starts here

    // ==================================================================================================================================

    // Social Messaging Service validation starts here

    $("#add_social_messaging_service").on("blur", function () {
        let numbers = /([0-9])/;
        let specialCharacters = /[^\w\s]/gi;

        if ($(this).val() === "" || $.trim(($(this).val())) === "") {

            $("#social_messaging_feedback").html("Enter Messaging Service Name.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#add_social_messaging_service").removeClass("is-valid").addClass("is-invalid");

        } else if ($(this).val().match(numbers)) {

            $("#social_messaging_feedback").html("Numbers are not allowed.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#add_social_messaging_service").removeClass("is-valid").addClass("is-invalid");

        } else if ($(this).val().match(specialCharacters)) {

            $("#social_messaging_feedback").html("Special Characters are not allowed.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#add_social_messaging_service").removeClass("is-valid").addClass("is-invalid");

        } else {

            $("#social_messaging_feedback").html("Looks Good!").removeClass("invalid-feedback").addClass("valid-feedback");
            $("#add_social_messaging_service").removeClass("is-invalid").addClass("is-valid");

        }
    });

    $("#addMessagingService").on("click", function (event) {

        // Perform validation
        let add_social_messaging_service = $("#add_social_messaging_service").val();
        let input_length = add_social_messaging_service.length;
        let isValid = true;

        if (input_length <= 0) {
            $("#social_messaging_feedback").html("This field is required.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#add_social_messaging_service").removeClass("is-valid").addClass("is-invalid");
            isValid = false;
        }

        // Prevent form submission if there are errors
        if ($(".invalid-feedback:visible").length > 0 || $(".is-invalid:visible").length > 0) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            $.ajax({
                type: "POST",
                url: "../assets/db/dynamic-settings-data-submit.php",
                data: {
                    "add_social_messaging_service_btn": 1,
                    "add_social_messaging_service": add_social_messaging_service,
                },
                success: function (response) {
                    Swal.fire({
                        toast: true,
                        title: 'Data ' + response,
                        position: 'top-end', // Change position as needed (top-start, top-end, bottom-start, bottom-end)
                        showConfirmButton: false,
                        timer: 2000, // Duration in milliseconds (3 seconds in this example)
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    });
                },
            });
            $("#add_social_messaging_service").val("");
            $("#social_messaging_feedback").html("").removeClass("valid-feedback");
            $("#add_social_messaging_service").removeClass("is-valid");
        }
    });
    // Social Messaging Service validation starts here

    // ==================================================================================================================================

    // Supplier Type validation starts here
    $("#add_supplier_type").on("blur", function () {
        let numbers = /([0-9])/;
        let specialCharacters = /[^\w\s]/gi;

        if ($(this).val() === "" || $.trim(($(this).val())) === "") {

            $("#supplier_type_feedback").html("Enter Supplier Type.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#add_supplier_type").removeClass("is-valid").addClass("is-invalid");

        } else if ($(this).val().match(numbers)) {

            $("#supplier_type_feedback").html("Numbers are not allowed.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#add_supplier_type").removeClass("is-valid").addClass("is-invalid");

        } else if ($(this).val().match(specialCharacters)) {

            $("#supplier_type_feedback").html("Special Characters are not allowed.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#add_supplier_type").removeClass("is-valid").addClass("is-invalid");

        } else {

            $("#supplier_type_feedback").html("Looks Good!").removeClass("invalid-feedback").addClass("valid-feedback");
            $("#add_supplier_type").removeClass("is-invalid").addClass("is-valid");

        }
    });

    $("#addSupplierTypeButton").on("click", function (event) {

        // Perform validation
        let add_supplier_type = $("#add_supplier_type").val();
        let input_length = add_supplier_type.length;
        let isValid = true;

        if (input_length <= 0) {
            $("#supplier_type_feedback").html("This field is required.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#add_supplier_type").removeClass("is-valid").addClass("is-invalid");
            isValid = false;
        }

        // Prevent form submission if there are errors
        if ($(".invalid-feedback:visible").length > 0 || $(".is-invalid:visible").length > 0) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            $.ajax({
                type: "POST",
                url: "../assets/db/dynamic-settings-data-submit.php",
                data: {
                    "add_supplier_type_btn": 1,
                    "add_supplier_type": add_supplier_type,
                },
                success: function (response) {
                    Swal.fire({
                        toast: true,
                        title: 'Data ' + response,
                        position: 'top-end', // Change position as needed (top-start, top-end, bottom-start, bottom-end)
                        showConfirmButton: false,
                        timer: 2000, // Duration in milliseconds (3 seconds in this example)
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    });
                },
            });
            $("#add_supplier_type").val("").removeClass("is-valid");
            $("#supplier_type_feedback").html("").removeClass("valid-feedback");
        }
    });
    // Supplier Type validation ends here
});
