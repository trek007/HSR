
//Index of Grid column values
var GRID_APPLICATION_USER_ID_COLUMN_INDEX = 1;
var GRID_USER_ID_COLUMN_INDEX = 0;
var GRID_CHECK_BOX_COLUMN_INDEX = 2;
var GRID_USER_NAME_COLUMN_INDEX = 3;
var GRID_USER_ROLE_COLUMN_INDEX = 4;
var GRID_ACCESS_REGIONS_COLUMN_INDEX = 5;
var GRID_USER_ROLE_COLUMN_INDEX_Hidden = 6;
var GRID_Selected_Regions_COLUMN_INDEX_Hidden = 7;
var GRID_All_Regions_COLUMN_INDEX_Hidden = 8;

//Role Options 
var OPTIONS = {
    Admin: "1",
    Foundation: "2",
    Region: "3"
}

//function checkAll(e) {
//    var state = $(e).is(':checked');
//    var gridContentRows = $(".k-grid-content table tr");
//    gridContentRows.each(function () {
//        $(this).children().eq(GRID_CHECK_BOX_COLUMN_INDEX).find("#chck").prop("checked", state);
//    });
//}

$(document).ready(function () {

    $("#save-alert").hide();
    $("#savework-alert-failure").hide();

    setGridHeight();
    var userList = [];
    var userRole = $("#hdnUserRole").val();
    if (userRole === "Foundation") {
        $("#btnSave").css("display", "none");
    }

    //Auto set grid height based on screen size
    function setGridHeight() {
        //Get the current window height
        var windowHeight = $(document).innerHeight();

        //record the value of the height to ensure it is showing correctly.

        console.log("Original Height" + windowHeight);

        //multiply this height by a percentage eg 70% of the window height
        windowHeight = windowHeight * 0.61;

        //record the new modified height
        console.log("Modified Height" + windowHeight);

        //find my grid and the grid content and set the height of it to the new percentage
        $("#UserRoleGrid .k-grid-content").innerHeight(windowHeight);
    }

    //Disable/Enable Access Region column based Role dorpdown value.
    $(document).on("change",
        "[name='ddlOptions']",
        function () {
            var currentRow = $(this).parent().parent();
            var rowIndex = currentRow.index();
            var ddlOptions = $(this).val();
            var cntrl = $('.k-grid-content table tr:eq(' +
                rowIndex +
                ') td:eq(' +
                GRID_ACCESS_REGIONS_COLUMN_INDEX +
                ')');
            var multiselect = $(cntrl).data("kendoMultiSelect");

            if (ddlOptions === "2" || ddlOptions === "1") {
                multiselect.value("");
                multiselect.readonly();
            } else {
                multiselect.readonly(false);
            }
        });

    //Save Record
    $("[name='btnSave']").click(function () {
        if (validateSubmit()) {
            $.ajax(
                {
                    type: "post",
                    url: 'PostedData',
                    data: JSON.stringify({ 'model': userList }),
                    contentType: "application/json",
                    success: function (res) {
                        if (res.successStatus) {
                            $("#save-alert").fadeTo(2000, 500).slideUp(500, function () {
                                $("#save-alert").slideUp(500);
                            }); reloadGrid();
                        } else {
                            $("#savework-alert-failure").fadeTo(2000, 500).slideUp(500, function () {
                                $("#savework-alert-failure").slideUp(500);
                            });
                        }
                    },
                    error: function () { }

                });
        } else {
            alert('No record selected');
        }
    });

    //Refresh grid
    function reloadGrid() {
        userList = [];
        $("#UserRoleGrid").data("kendoGrid").dataSource.read();
        $("#UserRoleGrid").css("display", "block");
    }

    //Push selected data into userList object to save.
    function validateSubmit() {
        var gridContentRows = $(".k-grid-content table tr");
        var selctedRecord = false;
        gridContentRows.each(function (index) {
            var isRecordSelected = $(this).children().eq(GRID_CHECK_BOX_COLUMN_INDEX).find("input[type='checkbox']:checked").val();
            if (isRecordSelected) {
                selctedRecord = true;
                var applicationId = $(this).children().eq(GRID_APPLICATION_USER_ID_COLUMN_INDEX).text();
                var name = $(this).children().eq(GRID_USER_NAME_COLUMN_INDEX).text();
                var userId = $(this).children().eq(GRID_USER_ID_COLUMN_INDEX).text();
                var roles = $(this).children().eq(GRID_USER_ROLE_COLUMN_INDEX).find("[name='ddlOptions']").val();
                var selectedData = '';

                if (roles === OPTIONS.Region) {
                    var cntrl = $('.k-grid-content table tr:eq(' +
                        index +
                        ') td:eq(' +
                        GRID_ACCESS_REGIONS_COLUMN_INDEX +
                        ')');
                    var multiselect = $(cntrl).data("kendoMultiSelect");

                    if (multiselect) {
                        var items = multiselect.value();
                        for (var i = 0; i < items.length; i++) {
                            if (i === 0)
                                selectedData = items[i];
                            else
                                selectedData = selectedData + "," + items[i];
                        }
                    }
                }

                userList.push({
                    ApplicationUserId: applicationId,
                    UserId: userId,
                    RoleId: roles,
                    RegionList: selectedData,
                    Name: name
                });
            }
        });
        return selctedRecord;
    }
});

//Used to Edit Access Region
function regionEditor(container, options) {
    $("<select name='selectMul' multiple='multiple' />");
}

//Bind All regions to Multiselect control, accessable regions 
function onDataBound() {

    var gridContentRows = $(".k-grid-content table tr");

    gridContentRows.each(function (index) {
        //Bind User Type
        var matchStatus = $(this).children().eq(GRID_USER_ROLE_COLUMN_INDEX_Hidden).text();
        $(this).children().eq(GRID_USER_ROLE_COLUMN_INDEX).find("[name='ddlOptions']").val(matchStatus);

        //Get List of accessible regions
        var selectedRegions =
            JSON.parse($(this).children().eq(GRID_Selected_Regions_COLUMN_INDEX_Hidden).text());
        var selectedItems = [];
        for (var i = 0; i < selectedRegions.length; i++) {
            selectedItems.push({ Id: selectedRegions[i].ID });
        }
        var allRegions = JSON.parse($(this).children().eq(GRID_All_Regions_COLUMN_INDEX_Hidden).text());
        var cntrl = $('.k-grid-content table tr:eq(' +
            index +
            ') td:eq(' +
            GRID_ACCESS_REGIONS_COLUMN_INDEX +
            ')');

        //Bind all regions to Multiselect control
        if (allRegions) {
            $(cntrl).kendoMultiSelect({
                autoWidth: true,
                dataTextField: "RegionName",
                dataValueField: "Id",
                dataSource: allRegions,
                value: selectedItems
            });
        }

        //function onChange(e) {
        //    CheckModifiedRow(e); select: onSelect,
        //}

        //function onSelect(e) {
        //    CheckModifiedRow(e);
        //};

        //function onDeselect(e) {
        //    CheckModifiedRow(e);
        //};

        //function CheckModifiedRow(e) {
        //    //e.preventDefault();

        //    ////var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
        //    //var grid = $("#UserRoleGrid").data("kendoGrid");
        //    //grid.select($(e.target).closest("tr"));
        //    //var tr = $(e.target).closest("tr");
        //    ////Get the selected grid
        //    //var tr = $(e.target).closest("tr");

        //    //selectedIndex = grid.select().index();
        //}

        //Multiselect Readyonly for Foundation/Admin users
        if (matchStatus !== "3") { // || matchStatus === "1" || matchStatus === "1"
            var multiselect = $(cntrl).data("kendoMultiSelect");
            multiselect.readonly();
            multiselect.wrapper.find("select").css("color", "White");
        }

        //Make all fields readOnly in grid
        if ($("#hdnUserRole").val() === "Foundation") {
            var cntrl = $('.k-grid-content table tr:eq(' + index + ') td:eq(' + GRID_ACCESS_REGIONS_COLUMN_INDEX + ')');
            var multiselect = $(cntrl).data("kendoMultiSelect");
            multiselect.readonly();

            $('.k-grid-content table tr:eq(' + index + ') td:eq(' + GRID_USER_ROLE_COLUMN_INDEX + ')').find("[name='ddlOptions']").attr("disabled", "disabled");
            $('.k-grid-content table tr:eq(' + index + ') td:eq(' + GRID_CHECK_BOX_COLUMN_INDEX + ')').find("#chck").attr("disabled", "disabled");
        }
    });

}

