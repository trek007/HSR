
//Global variable - Grid column index values
var GRID_ACTION_COLUMN_INDEX = 0;
var GRID_DOMAINNAME_COLUMN_INDEX = 1;
var GRID_INCOMINGDOMAINVALUE_COLUMN_INDEX = 2;
var GRID_DDL_MASTER_COLUMN_INDEX = 4;

var GRID_NEW_VALUE_COLUMN_INDEX = 0;
var GRID_FOUNDATION_NOTES_COLUMN_INDEX = 2;
var GRID_REGIONAL_NOTES_COLUMN_INDEX = 3;
var GRID_ID_COLUMN_INDEX = 6;
var GRID_STATUSID_COLUMN_INDEX = 7;
var GRID_DOMAINMASTERVALUE_COLUMN_INDEX = 8;
var GRID_DBDOMAINMASTERVALUE_COLUMN_INDEX = 9;
var GRID_ISDIRTY_COLUMN_INDEX = 10;
var GRID_DOMAINID_COLUMN_INDEX = 11;
var GRID_FOUNDATIONACTIONVALUE_COLUMN_INDEX = 12;
var GRID_REGIONACTIONVALUE_COLUMN_INDEX = 13;

//Custom Master Domian value
var OPTIONS = {
    Default: "-1001",
    New: "-1002",
    Invalid: "-1003"
}

var POSTTYPE = {
    Submit: 1,
    SaveWork: 2
}

//VMT Status
var VMTSTATUS = {
    FoundationReviewPending: 1,
    ReleasedToRegion: 2,
    ApprovedByFoundation: 2,
    ReleasedByFoundation: 2
}

var dirtyGrid = false;
var lastRegionId = '', lastDomainId = '', isPageLoad = false;

//Addition data to bind grid data
function additionalInfo() {
    var regionId = $("[name='ddlRegion']").val();

    return {
        regionId: regionId
    }
}

//Popup confirmation prompt alert if grid has girt data
function dropdownlistselect(e) {
    if (dirtyGrid) {
        if (confirm("There are unsaved changes. Do you want to continue?")) {
            dirtyGrid = false;
            return true;
        }
        else {
            e.preventDefault();
            if (lastRegionId !== $("[name='ddlRegion']").val()) {
                $("[name='ddlRegion']").val(lastRegionId);
            }
            e.preventDefault();
            return false;
        }
    }
    else {
        dirtyGrid = false;
        return true;
    }
}

//Change Grid data based region selection.
function dropdownlistchange() {
    var grid = $("#grdVMT").data("kendoGrid");

    grid.dataSource.read();
    $("#grdVMT").css("display", "block");

    lastRegionId = $("[name='ddlRegion']").val();

    grid.dataSource.page(1);
    grid.pager.refresh();
}

$(document).ready(function () {

    $("#savework-alert").hide();
    $("#submit-alert").hide();
    $("#savework-alert-failure").hide();
    var recordsPerPage = $($('.k-input')[1]).text();

    setGridHeight();

    var vmtList = [];
    var userRole = $("#hdnUserRole").val();

    var grid = $("#grdVMT").data("kendoGrid");

    //No. of clusters per page changer
    $('.k-widget.k-dropdown.k-header').change(function (e) {
        if (dirtyGrid) {
            if (confirm("There are unsaved changes. Do you want to continue?")) {
                recordsPerPage = $($('.k-input')[1]).text();
                dirtyGrid = false;
            } else {
                $($('.k-input')[1]).text(recordsPerPage);
                e.preventDefault();
                return false;
            }
        }
        recordsPerPage = $($('.k-input')[1]).text();
    });

    //Pager Change Event
    $(".k-pager-nav, .k-pager-numbers").off("click").click(validatePagerChanger);

    //Gird page changer
    function validatePagerChanger(e) {
        var classLength = e.currentTarget.classList.length - 1;
        var diabledButton = e.currentTarget.classList[classLength];
        if (diabledButton !== "k-state-disabled") { //Check clicked button is not disabled button
            //Check Grid is dirty
            if (dirtyGrid) {
                if (confirm("There are unsaved changes. Do you want to continue?")) {
                    dirtyGrid = false;
                } else {
                    e.preventDefault();
                    return false;
                }
            }
        }
    }

    if (userRole === "Regional") {
        grid.hideColumn(5);
        grid.hideColumn(7);
    }

    //Auto adjust Grid height
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
        $("#grdVMT .k-grid-content").innerHeight(windowHeight);
        $("#grdVMT .k-grid-content-locked").innerHeight(windowHeight);
    }

    $(window).resize(function () {
        setGridHeight();
    });

    //Make dityGrid flag as true
    $(document).on("change", "[name='tbxNew']", function () {
        var currentRow = $(this).parent().parent();
        $(currentRow).children().eq(GRID_ISDIRTY_COLUMN_INDEX).text(1);
        dirtyGrid = true;
    });

    //Make dityGrid flag as true
    $(document).on("change", "[id='txtFoundationNotes']", function () {
        var currentRow = $(this).parent().parent();
        $(currentRow).children().eq(GRID_ISDIRTY_COLUMN_INDEX).text(1);
        dirtyGrid = true;
    });

    //Make dityGrid flag as true
    $(document).on("change", "[id='txtRegionalNotes']", function () {
        var currentRow = $(this).parent().parent();
        $(currentRow).children().eq(GRID_ISDIRTY_COLUMN_INDEX).text(1);
        dirtyGrid = true;
    });

    //Make dityGrid flag as true
    $(document).on("change",
        "[id='rbtnApprove']",
        function () {
            var currentRow = $(this).parent().parent();
            if (callValidation(currentRow)) {
                $('.k-grid-content table tr:eq(' + currentRow.index() + ') td:eq(' + GRID_ISDIRTY_COLUMN_INDEX + ')').text(1);
                dirtyGrid = true;
            } else {
                $(this).removeAttr('checked');
            }

        });

    //Make dityGrid flag as true
    $(document).on("change",
        "[id='rbtnRelease']",
        function () {
            var currentRow = $(this).parent().parent();
            if (callValidation(currentRow)) {
                $('.k-grid-content table tr:eq(' + currentRow.index() + ') td:eq(' + GRID_ISDIRTY_COLUMN_INDEX + ')').text(1);
                dirtyGrid = true;
            } else {
                $(this).removeAttr('checked');
            }
        });

    //Validate - on action button selection
    function callValidation(currentRow) {
        var rowIndex = currentRow.index();

        var ddlDomainMasters = $(currentRow).children().eq(GRID_DDL_MASTER_COLUMN_INDEX).find("[name=ddlDomainMasters]").val();

        if (ddlDomainMasters === OPTIONS.New) { //New
            var tbxNew = $('.k-grid-content table tr:eq(' + rowIndex + ')').find("[name=tbxNew]").val();
            if (tbxNew === '') {
                $(currentRow).children().eq(GRID_ACTION_COLUMN_INDEX).find("[id=rbtnReview]").prop("checked", true);
                alert("New Value Being Suggested column should not be empty.");
                return false;
            }
        }
        return true;
    }

    //Validate New value being suggested when data changed in master domain
    $(document).on("change",
        "[name='ddlDomainMasters']",
        function () {

            var currentRow = $(this).parent().parent();
            var rowIndex = currentRow.index();
            var currentColumn = $(this).parent();
            var contentRow = $('.k-grid-content table tr:eq(' + rowIndex + ')');

            if (isPageLoad === false) {
                dirtyGrid = true;
                $(contentRow).children().eq(GRID_ISDIRTY_COLUMN_INDEX).text(1);
            }

            var statusId = $(contentRow).children().eq(GRID_STATUSID_COLUMN_INDEX).text();
            var domainMasterSelection = $(this).val();

            if (domainMasterSelection === OPTIONS.Default) { //Select

                //$(currentColumn).siblings().find("[name=tbxNew]").attr('disabled', 'disabled');
                $(contentRow).children().eq(GRID_NEW_VALUE_COLUMN_INDEX).find("[name=tbxNew]").attr('disabled', 'disabled');

                //$('.k-grid-content-locked table tr:eq(' + rowIndex + ')').find("[id=rbtnApprove]")
                $(currentColumn).siblings().find("[id=rbtnApprove]")
                    .attr('disabled', 'disabled');
                //$('.k-grid-content-locked table tr:eq(' + rowIndex + ')').find("[id=rbtnRelease]")
                $(currentColumn).siblings().find("[id=rbtnRelease]")
                    .attr('disabled', 'disabled');

                //$('.k-grid-content-locked table tr:eq(' + rowIndex + ')').find("[id=rbtnApprove]")
                $(currentColumn).siblings().find("[id=rbtnApprove]")
                    .removeAttr('checked');
                //$('.k-grid-content-locked table tr:eq(' + rowIndex + ')').find("[id=rbtnReview]")
                $(currentColumn).siblings().find("[id=rbtnReview]")
                    .prop("checked", true);
                //$('.k-grid-content-locked table tr:eq(' + rowIndex + ')').find("[id=rbtnRelease]")
                $(currentColumn).siblings().find("[id=rbtnRelease]")
                    .removeAttr('checked');

                //$(currentColumn).siblings().find("[name=tbxNew]").val('');
                $(contentRow).children().eq(GRID_NEW_VALUE_COLUMN_INDEX).find("[name=tbxNew]").val('');
            } else if (domainMasterSelection === OPTIONS.New) { //New

                $(contentRow).children().eq(GRID_NEW_VALUE_COLUMN_INDEX).find("[name=tbxNew]").removeAttr("disabled");

                //$('.k-grid-content-locked table tr:eq(' + rowIndex + ')').find("[id=rbtnApprove]")
                $(currentColumn).siblings().find("[id=rbtnApprove]")
                    .removeAttr("disabled");

                if (userRole !== "Regional" && statusId === "1") {//Enable release button only for Foundation for only one review  && statusId === "1"
                    //$('.k-grid-content-locked table tr:eq(' + rowIndex + ')').find("[id=rbtnRelease]")
                    $(currentColumn).siblings().find("[id=rbtnReview]").prop("checked", true);
                    $(currentColumn).siblings().find("[id=rbtnRelease]").attr('disabled', 'disabled');
                    //.removeAttr("disabled");
                }
            } else if (domainMasterSelection === OPTIONS.Invalid) { //Review

                //$(currentColumn).siblings().find("[name=tbxNew]").attr('disabled', 'disabled');
                $(contentRow).children().eq(GRID_NEW_VALUE_COLUMN_INDEX).find("[name=tbxNew]").attr('disabled', 'disabled');

                //$('.k-grid-content-locked table tr:eq(' + rowIndex + ')').find("[id=rbtnApprove]")
                $(currentColumn).siblings().find("[id=rbtnApprove]")
                    .removeAttr("disabled");
                if (userRole !== "Regional" && statusId === "1") {//Enable release button only for Foundation for only one review
                    //$('.k-grid-content-locked table tr:eq(' + rowIndex + ')').find("[id=rbtnRelease]")
                    $(currentColumn).siblings().find("[id=rbtnRelease]")
                        .removeAttr("disabled");
                }

                //$(currentColumn).siblings().find("[name=tbxNew]").val('');
                $(contentRow).children().eq(GRID_NEW_VALUE_COLUMN_INDEX).find("[name=tbxNew]").val('');
            } else {
                $(contentRow).children().eq(GRID_NEW_VALUE_COLUMN_INDEX).find("[name=tbxNew]").attr('disabled', 'disabled');
                $(contentRow).children().eq(GRID_NEW_VALUE_COLUMN_INDEX).find("[name=tbxNew]").val('');
                //$('.k-grid-content-locked table tr:eq(' + rowIndex + ')').find("[id=rbtnApprove]")
                $(currentColumn).siblings().find("[id=rbtnApprove]")
                    .removeAttr("disabled");
                if (userRole !== "Regional" && statusId === "1") {//Enable release button only for Foundation for only one review
                    //$('.k-grid-content-locked table tr:eq(' + rowIndex + ')').find("[id=rbtnRelease]")
                    $(currentColumn).siblings().find("[id=rbtnRelease]")
                        .removeAttr("disabled");
                }
            }
        });

    //Submit user data into database
    $("[name='btnSubmit']").click(function () {
        if (validateSubmit()) {
            bootbox.confirm({
                message: "You will not be able to make changes to any data you have 'approved' or 'released' once you submit.",
                buttons: {
                    confirm: {
                        label: 'Yes',
                        className: 'btn btn-primary'
                    },
                    cancel: {
                        label: 'No, go back',
                        className: 'btn'
                    }
                },
                callback: function (result) {
                    if (result) {
                        $.ajax(
                            {
                                type: "post",
                                url: 'PostedData',
                                data: JSON.stringify({ 'model': vmtList }),
                                contentType: "application/json",
                                success: function (res) {
                                    if (res.successStatus) {
                                        $("#submit-alert").fadeTo(2000, 500).slideUp(500, function () {
                                            $("#submit-alert").slideUp(500);
                                        }); reloadGrid(); dirtyGrid = false;
                                    } else {
                                        $("#savework-alert-failure").fadeTo(2000, 500).slideUp(500, function () {
                                            $("#savework-alert-failure").slideUp(500);
                                        });
                                    }
                                },
                                error: function () { }

                            });
                    }
                }
            });
        } else {
            //Else block
        }
    });

    //Submit user data into database - bottom
    $("[name='btnSubmitBottom']").click(function () {
        if (validateSubmit()) {
            bootbox.confirm({
                message: "You will not be able to make changes to any data you have 'approved' or 'released' once you submit.",
                buttons: {
                    confirm: {
                        label: 'Yes',
                        className: 'btn btn-primary'
                    },
                    cancel: {
                        label: 'No, go back',
                        className: 'btn'
                    }
                },
                callback: function (result) {
                    if (result) {
                        $.ajax(
                            {
                                type: "post",
                                url: 'PostedData',
                                data: JSON.stringify({ 'model': vmtList }),
                                contentType: "application/json",
                                success: function (res) {
                                    if (res.successStatus) {
                                        $("#submit-alert").fadeTo(2000, 500).slideUp(500, function () {
                                            $("#submit-alert").slideUp(500);
                                        }); reloadGrid(); dirtyGrid = false;
                                    } else {
                                        $("#savework-alert-failure").fadeTo(2000, 500).slideUp(500, function () {
                                            $("#savework-alert-failure").slideUp(500);
                                        });
                                    }
                                },
                                error: function () { }

                            });
                    }
                }
            });
        } else {
            //Else Block
        }
    });

    //Save user data into database
    $("[name='btnSaveWork']").click(function () {

        if (validateSaveWork()) {

            $.ajax(
                {
                    type: "post",
                    url: 'PostedData',
                    data: JSON.stringify({ 'model': vmtList }),
                    contentType: "application/json",
                    success: function (res) {
                        if (res.successStatus) {
                            $("#savework-alert").fadeTo(2000, 500).slideUp(500, function () {
                                $("#savework-alert").slideUp(500);
                            }); reloadGrid(); dirtyGrid = false;
                        } else {
                            $("#savework-alert-failure").fadeTo(2000, 500).slideUp(500, function () {
                                $("#savework-alert-failure").slideUp(500);
                            });
                        }
                    },
                    error: function () { }

                });
        }
    });

    //Save user data into database-bottom
    $("[name='btnSaveWorkBottom']").click(function () {

        if (validateSaveWork()) {

            $.ajax(
                {
                    type: "post",
                    url: 'PostedData',
                    data: JSON.stringify({ 'model': vmtList }),
                    contentType: "application/json",
                    success: function (res) {
                        if (res.successStatus) {
                            $("#savework-alert").fadeTo(2000, 500).slideUp(500, function () {
                                $("#savework-alert").slideUp(500);
                            }); reloadGrid(); dirtyGrid = false;
                        } else {
                            $("#savework-alert-failure").fadeTo(2000, 500).slideUp(500, function () {
                                $("#savework-alert-failure").slideUp(500);
                            });
                        }
                    },
                    error: function () { }

                });
        }
    });

    //operationType = 1 - Submit
    //operationType = 2 - Save Work

    //Validate submit functionality and push data into SMT List
    function validateSubmit() {

        var gridRows = $(".k-grid-content-locked table tr");
        var selectedRows = 0;
        var id = '', checkedAction = '', ddlDomainMasters = '', tbxNew = '', foundationNotes = '', regionalNotes = '', statusId = '';
        var domainId = '', foundationActionValue = '', regionActionValue = '';
        var rowNo = '';

        gridRows.each(function (index) {

            checkedAction = $(this).children().eq(GRID_ACTION_COLUMN_INDEX).find("input[type='radio']:checked").val();

            if (checkedAction !== '' && checkedAction !== undefined && checkedAction !== "1") {
                selectedRows = 1;

                $('.k-grid-content table tr:eq(' + index + ')').find("[id=rbtnReview]").removeAttr("disabled");

                var gridContent = $('.k-grid-content table  tr:eq(' + index + ')');

                id = $(gridContent).children().eq(GRID_ID_COLUMN_INDEX).text();
                ddlDomainMasters = $(this).children().eq(GRID_DDL_MASTER_COLUMN_INDEX).find("[name='ddlDomainMasters']").val();
                tbxNew = $(gridContent).children().eq(GRID_NEW_VALUE_COLUMN_INDEX).find("[name='tbxNew']").val();
                foundationNotes = $(gridContent).children().eq(GRID_FOUNDATION_NOTES_COLUMN_INDEX).find("[id='txtFoundationNotes']").val();
                regionalNotes = $(gridContent).children().eq(GRID_REGIONAL_NOTES_COLUMN_INDEX).find("[id='txtRegionalNotes']").val();
                //statusId = $(gridContent).children().eq(GRID_STATUSID_COLUMN_INDEX).text();
                domainId = $(gridContent).children().eq(GRID_DOMAINID_COLUMN_INDEX).text();
                foundationActionValue = $(gridContent).children().eq(GRID_FOUNDATIONACTIONVALUE_COLUMN_INDEX).text();
                regionActionValue = $(gridContent).children().eq(GRID_REGIONACTIONVALUE_COLUMN_INDEX).text();
                if (ddlDomainMasters === OPTIONS.New) { //New
                    if (tbxNew === '') {
                        selectedRows = -1;
                        if (rowNo !== '')
                            rowNo = rowNo + (index + 1).toString() + ", ";
                        else
                            rowNo = (index + 1).toString() + ", ";
                        //alert("Enter New Value Being Suggested. Row No : " + (index + 1));
                        return false;
                    }
                }

                if (userRole !== "Regional") {
                    if (checkedAction === "3") {//foundation user approve = Foundation Approved
                        checkedAction = "4";
                    }
                    foundationActionValue = checkedAction;
                    regionActionValue = regionActionValue;
                }
                else {
                    foundationActionValue = foundationActionValue; //1; //set foundation action value is 1 when regional user aproved
                    regionActionValue = checkedAction;
                }
                vmtList.push({
                    Id: id, DomainId: domainId, StatusId: checkedAction, DomainMastersValue: ddlDomainMasters, NewValue:
                    tbxNew, FoundationNotes: foundationNotes, RegionalNotes: regionalNotes,
                    FoundationActionValue: foundationActionValue, RegionActionValue: regionActionValue
                });
            }
        });

        if (selectedRows === -1) {//Empty new value being suggested
            alert("Enter New Value Being Suggested. Row No(s) : " + rowNo);
            return false;
        }
        else if (selectedRows > 0) {//Action is seleted
            return true;
        }
        else {
            alert('Choose action');
            return false;
        }
    }

    //Validate save functionality and push data into SMT List
    function validateSaveWork() {

        var gridRows = $(".k-grid-content-locked table tr");
        var selectedRows = 0;
        var id = '', checkedAction = '', ddlDomainMasters = '', tbxNew = '', foundationNotes = '', regionalNotes = '', statusId = '';
        var domainId = '', foundationActionValue = '', regionActionValue = '';
        var rowNo = '';

        gridRows.each(function (index) {

            var gridContent = $('.k-grid-content table  tr:eq(' + index + ')');

            if ($(gridContent).children().eq(GRID_ISDIRTY_COLUMN_INDEX).text() === "1") {
                selectedRows = 1;

                checkedAction = $(this).children().eq(GRID_ACTION_COLUMN_INDEX).find("input[type='radio']:checked").val();
                id = $(gridContent).children().eq(GRID_ID_COLUMN_INDEX).text();
                ddlDomainMasters = $(this).children().eq(GRID_DDL_MASTER_COLUMN_INDEX).find("[name='ddlDomainMasters']").val();
                tbxNew = $(gridContent).children().eq(GRID_NEW_VALUE_COLUMN_INDEX).find("[name='tbxNew']").val();
                foundationNotes = $(gridContent).children().eq(GRID_FOUNDATION_NOTES_COLUMN_INDEX).find("[id='txtFoundationNotes']").val();
                regionalNotes = $(gridContent).children().eq(GRID_REGIONAL_NOTES_COLUMN_INDEX).find("[id='txtRegionalNotes']").val();
                statusId = $(gridContent).children().eq(GRID_STATUSID_COLUMN_INDEX).text();
                domainId = $(gridContent).children().eq(GRID_DOMAINID_COLUMN_INDEX).text();
                foundationActionValue = $(gridContent).children().eq(GRID_FOUNDATIONACTIONVALUE_COLUMN_INDEX).text();
                regionActionValue = $(gridContent).children().eq(GRID_REGIONACTIONVALUE_COLUMN_INDEX).text();

                if (ddlDomainMasters === OPTIONS.New) { //New
                    if (tbxNew === '') {
                        selectedRows = -1;

                        CheckEmptyNewValueTextBox();

                        alert("Please review the highlighted rows and enter a value in New Value Being Suggested.");
                        return false;
                    }
                }

                if (userRole !== "Regional") {

                    foundationActionValue = checkedAction;
                    regionActionValue = regionActionValue;
                }
                else {
                    foundationActionValue = foundationActionValue;
                    regionActionValue = checkedAction;
                }

                vmtList.push({
                    Id: id, DomainId: domainId, StatusId: statusId, DomainMastersValue: ddlDomainMasters, NewValue:
                    tbxNew, FoundationNotes: foundationNotes, RegionalNotes: regionalNotes,
                    FoundationActionValue: foundationActionValue, RegionActionValue: regionActionValue
                });
            }
        });

        if (selectedRows === -1) {//Empty new value being suggested
            return false;
        }
        else if (selectedRows > 0) {//Changes done in the grid
            return true;
        }
        else {
            alert('No data changes available to save.');
            return false;
        }
    }

    //Reload Grid
    function reloadGrid() {
        vmtList = [];

        $("#grdVMT").data("kendoGrid").dataSource.read();
        $("#grdVMT").css("display", "block");
    }

    $("[name='lnkVMT']").addClass('activeMenu');
    $("[name='lnkSMT']").removeClass('activeMenu');
});

//Highlight New value being suggested column in red when there is no data
function CheckEmptyNewValueTextBox() {
    var gridRows = $(".k-grid-content-locked table tr");
    var ddlDomainMasters = '', tbxNew = '', rowNo = '';
    gridRows.each(function (index) {
        var gridContent = $('.k-grid-content table  tr:eq(' + index + ')');
        if ($(gridContent).children().eq(GRID_ISDIRTY_COLUMN_INDEX).text() === "1") {
            ddlDomainMasters = $(this).children().eq(GRID_DDL_MASTER_COLUMN_INDEX).find("[name='ddlDomainMasters']").val();
            tbxNew = $(gridContent).children().eq(GRID_NEW_VALUE_COLUMN_INDEX).find("[name='tbxNew']").val();
            if (ddlDomainMasters === OPTIONS.New) { //New
                if (tbxNew === '') {
                    $(gridContent).children().eq(GRID_NEW_VALUE_COLUMN_INDEX).find("[name='tbxNew']").attr("style", "float: left;width: 85%;height: 15px;border-color: red !important;");
                }
                else {
                    $(gridContent).children().eq(GRID_NEW_VALUE_COLUMN_INDEX).find("[name='tbxNew']").attr("style", "float: left;width: 85%;height: 15px;");
                }
            }
        }
    });
}

//Apply coloring, clustering and font weight on grid data bound.
function onDataBound(e) {
    isPageLoad = true;
    var grid = this;
    grid.autoFitColumn(0);
    for (var i = 0; i < grid.columns.length; i++) {
        grid.autoFitColumn(i);
    }

    if (grid.dataSource.total() === 0) {
        var colCount = grid.columns.length;
        $(e.sender.wrapper)
            .find('.k-grid-content tbody')
            .append('<tr class="kendo-data-row"><td colspan="' + colCount + '" class="no-data text-center">* No items to display</td></tr>');
    }

    var actionId = '', userRole = $("#hdnUserRole").val();

    //lastDomainId = $("[name='ddlDomain']").val();
    lastRegionId = $("[name='ddlRegion']").val();

    var gridRows = $(".k-grid-content table tr");

    var selectedMasterDomainValue = 0, unknownId = 0, MasterDomainValueFromDB = '', foundationActionValue = '', regionActionValue = '';
    var currentRowColorCode = 2, currentRowColor = '', currentRowColor1 = '#CFCCC1', currentRowColor2 = '#F4EFEB';
    var domainName = '';
    gridRows.each(function (index) {

        var gridLocked = $('.k-grid-content-locked table tr:eq(' + index + ')');
        var currentRowDomainName = $(gridLocked).children().eq(GRID_DOMAINNAME_COLUMN_INDEX).text();
        if (domainName !== currentRowDomainName) {
            ////background Color 
            if (currentRowColorCode === 1) { currentRowColorCode = 2; currentRowColor = currentRowColor2; }
            else if (currentRowColorCode === 2) { currentRowColorCode = 1; currentRowColor = currentRowColor1; }
            domainName = currentRowDomainName;
        }
        $(gridLocked).attr('style', 'background-color:' + currentRowColor);

        $(this).attr('style', 'background-color:' + currentRowColor);

        selectedMasterDomainValue = 0, unknownId = 0;

        var masterDomainValue = $(gridLocked).children().eq(GRID_INCOMINGDOMAINVALUE_COLUMN_INDEX).text();

        //var ddlDomainMasters = $(this).children().eq(GRID_DDL_MASTER_COLUMN_INDEX).find("[name=ddlDomainMasters]");
        var ddlDomainMasters = $(gridLocked).children().eq(GRID_DDL_MASTER_COLUMN_INDEX).find("[name=ddlDomainMasters]");
        $(ddlDomainMasters).empty();

        $(ddlDomainMasters).append($("<option />").val(-1001).text("-- Select --"));

        if (userRole !== "Regional") {
            $(ddlDomainMasters).append($("<option />").val(-1002).text("New Value"));
            $(this).children().eq(GRID_REGIONAL_NOTES_COLUMN_INDEX).find("[name=txtRegionalNotes]").attr('disabled', 'disabled');
        }

        $(ddlDomainMasters).append($("<option />").val(-1003).text("Invalid Fix at Source"));

        if ($(this).children().eq(GRID_DOMAINMASTERVALUE_COLUMN_INDEX).text() !== '') {

            var ddlDomainMasterValues = JSON.parse($(this).children().eq(GRID_DOMAINMASTERVALUE_COLUMN_INDEX).text());

            $.each(ddlDomainMasterValues, function () {
                $(ddlDomainMasters).append($("<option />").val(this.Id).text(this.DomainMasterValue));
                if ($.trim(this.DomainMasterValue.toLowerCase()) === $.trim(masterDomainValue.toLowerCase())) {
                    selectedMasterDomainValue = this.Id;
                }

                if ($.trim(this.DomainMasterValue.toLowerCase()) === 'unknown') {
                    unknownId = this.Id;
                }
            });
        }

        actionId = $(this).children().eq(GRID_STATUSID_COLUMN_INDEX).text();
        MasterDomainValueFromDB = $(this).children().eq(GRID_DBDOMAINMASTERVALUE_COLUMN_INDEX).text();

        if (MasterDomainValueFromDB !== "") {
            $(ddlDomainMasters).val(MasterDomainValueFromDB).trigger("change");
        }
        else {
            if (selectedMasterDomainValue !== 0) {
                $(ddlDomainMasters).val(selectedMasterDomainValue).trigger("change");
            } else {
                $(ddlDomainMasters).val(unknownId).trigger("change");
            }
        }

        if (userRole !== "Regional") {
            foundationActionValue = $(this).children().eq(GRID_FOUNDATIONACTIONVALUE_COLUMN_INDEX).text();
            if (foundationActionValue === '1') {
                $(gridLocked).find("[id=rbtnReview]").attr('checked', true);
                $(gridLocked).find("[id=rbtnRelease]").removeAttr('checked');
                $(gridLocked).find("[id=rbtnRelease]").removeAttr('disabled');
                $(gridLocked).find("[id=rbtnApprove]").removeAttr('checked');
            }
            else if (foundationActionValue === '2') {

                if ($(this).children().eq(GRID_REGIONACTIONVALUE_COLUMN_INDEX).text() === "3") {
                    $(gridLocked).find("[id=rbtnReview]").attr('checked', true);
                    $(gridLocked).find("[id=rbtnRelease]").removeAttr('checked');
                } else {
                    $(gridLocked).find("[id=rbtnReview]").removeAttr('checked');
                    $(gridLocked).find("[id=rbtnRelease]").attr('checked', true);
                    $(gridLocked).find("[id=rbtnApprove]").removeAttr('checked');
                }
            }
            else if (foundationActionValue === '3') {
                $(gridLocked).find("[id=rbtnReview]").removeAttr('checked');
                $(gridLocked).find("[id=rbtnRelease]").removeAttr('checked');
                $(gridLocked).find("[id=rbtnRelease]").attr('disabled', 'disabled');
                $(gridLocked).find("[id=rbtnApprove]").attr('checked', true);
            }
        }
        else {
            regionActionValue = $(this).children().eq(GRID_REGIONACTIONVALUE_COLUMN_INDEX).text();
            if (regionActionValue === '1') {
                $(gridLocked).find("[id=rbtnReview]").attr('checked', true);
                $(gridLocked).find("[id=rbtnApprove]").removeAttr('checked');
            }
            else if (regionActionValue === '2') {
                $(gridLocked).find("[id=rbtnReview]").removeAttr('checked');
                $(gridLocked).find("[id=rbtnRelease]").attr('checked', true);
                $(gridLocked).find("[id=rbtnApprove]").removeAttr('checked');
            }
            else if (regionActionValue === '3') {
                $(gridLocked).find("[id=rbtnReview]").removeAttr('checked');
                $(gridLocked).find("[id=rbtnApprove]").attr('checked', true);
            }
            $(gridLocked).find("[id=txtRelease]").css('display', 'none');
            $(gridLocked).find("[id=rbtnRelease]").css('display', 'none');
        }

    });

    if ($("#hdnUserRole").val() === "Regional") {
        $(".k-grid-header-locked colgroup col:eq(0)").css("width", 154);
        $(".k-grid-content-locked colgroup col:eq(0)").css("width", 154);
    }

    isPageLoad = false;
}