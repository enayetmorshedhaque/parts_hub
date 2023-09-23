$(document).ready(function () {
    $("form").addClass("was-validate");

    // Add New Supplier validation starts here
    $("#supplier_name_product_add").on("blur", function () {
        let bengaliCharacterPattern = /^[\u0980-\u09FF\s]+$/;
        let bengaliNumberPattern = /^[\u09E6-\u09EF]+$/;
        let numbers = /([0-9])/;
        let specialCharacters = /[^\w\s]/gi;

        if ($(this).val() === "" || $.trim(($(this).val())) === "") {

            $("#supplier_name_product_add_feedback").html("Enter Supplier Name.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#supplier_name_product_add").removeClass("is-valid").addClass("is-invalid");

        } else if (bengaliNumberPattern.test($(this).val())) {

            $("#supplier_name_product_add_feedback").html("Bengali Numbers are not Allowed.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#supplier_name_product_add").removeClass("is-valid").addClass("is-invalid");

        } else if (bengaliCharacterPattern.test($(this).val())) {

            $("#supplier_name_product_add_feedback").html("Bengali Characters are not Allowed.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#supplier_name_product_add").removeClass("is-valid").addClass("is-invalid");

        } else if ($(this).val().match(numbers)) {

            $("#supplier_name_product_add_feedback").html("English Numbers are not Allowed.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#supplier_name_product_add").removeClass("is-valid").addClass("is-invalid");

        } else if (($(this).val()).charAt(0).match(specialCharacters)) {

            $("#supplier_name_product_add_feedback").html("Special Characters are not allowed.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#supplier_name_product_add").removeClass("is-valid").addClass("is-invalid");

        } else {

            $("#supplier_name_product_add_feedback").html("Looks Good!").removeClass("invalid-feedback").addClass("valid-feedback");
            $("#supplier_name_product_add").removeClass("is-invalid").addClass("is-valid");

        }
    });

    $("#product_name").on("blur", function () {
        let bengaliCharacterPattern = /^[\u0980-\u09FF\s]+$/;
        let bengaliNumberPattern = /^[\u09E6-\u09EF]+$/;
        let numbers = /([0-9])/;
        let specialCharacters = /[^\w\s]/gi;

        if ($(this).val() === "" || $.trim(($(this).val())) === "") {

            $("#product_name_feedback").html("Enter Supplier Address.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#product_name").removeClass("is-valid").addClass("is-invalid");

        } else if (bengaliNumberPattern.test($(this).val())) {

            $("#product_name_feedback").html("Bengali Numbers are not Allowed.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#product_name").removeClass("is-valid").addClass("is-invalid");

        } else if (bengaliCharacterPattern.test($(this).val())) {

            $("#product_name_feedback").html("Bengali Characters are not Allowed.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#product_name").removeClass("is-valid").addClass("is-invalid");

        } else if (($(this).val()).charAt(0).match(numbers)) {

            $("#product_name_feedback").html("Numbers at beginning are not Allowed.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#product_name").removeClass("is-valid").addClass("is-invalid");

        } else if (($(this).val()).charAt(0).match(specialCharacters)) {

            $("#product_name_feedback").html("Special Characters at beginning are not allowed.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#product_name").removeClass("is-valid").addClass("is-invalid");

        } else {

            $("#product_name_feedback").html("Looks Good!").removeClass("invalid-feedback").addClass("valid-feedback");
            $("#product_name").removeClass("is-invalid").addClass("is-valid");

        }
    });

    $("#addNewProduct").on("click", function (event) {

        // Perform validation

        // Supplier Information
        let supplier_name_product_add = $("#supplier_name_product_add").val();
        let product_name = $("#product_name").val();

        // ===========================================================================================================

        // Supplier Information Length
        let supplier_name_product_add_input_length = supplier_name_product_add.length;
        let product_name_input_length = product_name.length;

        if (supplier_name_product_add_input_length <= 0) {
            $("#supplier_name_product_add_feedback").html("This field is required.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#supplier_name_product_add").removeClass("is-valid").addClass("is-invalid");
            isValid = false;
        }

        if (product_name_input_length <= 0) {
            $("#product_name_feedback").html("This field is required.").removeClass("valid-feedback").addClass("invalid-feedback");
            $("#product_name").removeClass("is-valid").addClass("is-invalid");
            isValid = false;
        }

        // Prevent form submission if there are errors
        if ($(".is-invalid:visible").length > 0 || $(".invalid-feedback:visible").length > 0) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();

            // Serialize the form data into a JSON object
            let supplierFormData = $("#addNewProductForm").serialize();

            $.ajax({
                type: "POST",
                url: '../assets/db/add-new-product.php', // Change this to the path of your PHP script
                data: supplierFormData,
                success: function (response) {
                    let flag_data = JSON.parse(response);
                    if (flag_data.flag === 1) {
                        Swal.fire({
                            toast: true,
                            title: flag_data.message,
                            position: 'top-end', // Change position as needed (top-start, top-end, bottom-start, bottom-end)
                            showConfirmButton: false,
                            timer: 2000, // Duration in milliseconds (2 seconds in this example)
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                        });
                        $("#addNewProductForm input").val("").removeClass("is-valid");
                        $(".feedback").html("").removeClass("valid-feedback");
                    } else {
                        Swal.fire({
                            toast: true,
                            title: flag_data.message,
                            position: 'top-end', // Change position as needed (top-start, top-end, bottom-start, bottom-end)
                            showConfirmButton: false,
                            timer: 2000, // Duration in milliseconds (2 seconds in this example)
                            timerProgressBar: true
                        });
                        $("#product_name").removeClass("is-valid").addClass("is-invalid");
                        $(".feedback").html("Duplicate product for this supplier.").removeClass("valid-feedback").addClass("invalid-feedback");
                    }
                },
            });
        }
    });
    // Add New Supplier validation ends here   
});