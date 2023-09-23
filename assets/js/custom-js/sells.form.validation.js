$(document).ready(function () {
    $("form").addClass("was-validate");

    $("#customer_name_sells").on("blur", function () {
        if ($(this).val() === "" || $.trim(($(this).val())) === "") {
            $("#customer_name_sells").removeClass("is-valid").addClass("is-invalid");
            $("#customer_address_sells").removeClass("is-valid");
            $("#customer_contact_sells").removeClass("is-valid");
        } else {
            $("#customer_name_sells").removeClass("is-invalid").addClass("is-valid");
            $("#customer_address_sells").removeClass("is-invalid").addClass("is-valid");
            $("#customer_contact_sells").removeClass("is-invalid").addClass("is-valid");
        }
    });

    $("#new_sell_date").addClass("is-valid");
    $("#invoice_no_sells").addClass("is-valid");

    $("#challan_number_sells").on("blur", function () {
        let challan_val = $("#challan_number_sells").val();

        if (challan_val.length > 0) {
            $("#challan_number_sells").addClass("is-valid");
        } else {
            $("#challan_number_sells").removeClass("is-valid");
        }
    });



    $("#createNewInvoice").on("click", function (event) {

        // Perform validation
        let customer_name_sells = $("#customer_name_sells").val();

        let customer_name_sells_input_length = customer_name_sells.length;

        let isValid = true;

        if (customer_name_sells_input_length <= 0) {
            $("#customer_name_sells").removeClass("is-valid").addClass("is-invalid");
            isValid = false;
        }

        // Prevent form submission if there are errors
        if ($(".is-invalid:visible").length > 0 || $(".invalid-feedback:visible").length > 0) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();

            // Serialize the form data into a JSON object
            let customerFormData = $("#addNewCustomerForm").serialize();

            $.ajax({
                type: "POST",
                // url: '../assets/db/add-new-supplier-customer-submit.php', // Change this to the path of your PHP script
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