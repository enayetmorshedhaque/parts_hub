(function () {
    let rowCount = 0;
    $("#addNewRow").on("click", function (e) {
        var clone, inputFields;
        rowCount++;

        e.preventDefault();
        e.stopPropagation();

        inputFields = $("#purchase_order_table_row");
        clone = $("#template_row").contents().clone();
        clone
            .find("input, textarea").each(function () {
                var currentId = $(this).attr('id');
                var currentName = $(this).attr('name');
                var newId = currentId.slice(0, -1) + rowCount; // Remove the last character (e.g., '1') and add the incremented count
                var newName = currentName.slice(0, -1) + rowCount; // Remove the last character (e.g., '1') and add the incremented count
                $(this).attr('id', newId);
                $(this).attr('name', newName);
                $(this).val(''); // Clear input values
            });
        inputFields.append(clone);
    });

    $("#purchase_order_table").on("click", ".deleteThis", function () {
        $(this).closest("tr").remove();
    });
}).call(this);
