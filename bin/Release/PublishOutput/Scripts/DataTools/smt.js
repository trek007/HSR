//Index of Grid column values
var GRID_ACTION_COLUMN_INDEX = 0;
var GRID_ACTION_VALUE_COLUMN_INDEX = 1;
var GRID_STUDENT_ID_COLUMN_INDEX = 2;
var GRID_FIRST_NAME_COLUMN_INDEX = 3;
var GRID_LAST_NAME_COLUMN_INDEX = 4;
var GRID_GENDER_COLUMN_INDEX = 5;
var GRID_DOB_COLUMN_INDEX = 6;
var GRID_CLASS_OF_COLUMN_INDEX = 7;

var GRID_SCHOOL_NAME_COLUMN_INDEX = 0;
var GRID_FIRST_SCHOOL_YEAR_COLUMN_INDEX = 1;
var GRID_FIRST_ENTRY_DATE_COLUMN_INDEX = 2;
var GRID_FIRST_ENTRY_GRADE_COLUMN_INDEX = 3;
var GRID_FINAL_SCHOOL_YEAR_COLUMN_INDEX = 4;
var GRID_FINAL_EXIT_DATE_COLUMN_INDEX = 5;
var GRID_FINAL_GRADE_COLUMN_INDEX = 6;
var GRID_STATUS_DESCRIPTION_INDEX = 7;
var GRID_UPDATED_BY_COLUMN_INDEX = 8;
var GRID_UPDATED_TIMESTAMP_COLUMN_INDEX = 9;
var GRID_MATCH_STEP_INDEX = 10;

var GRID_BASE_RECORD_COLUMN_INDEX = 11;
var GRID_STATUS_ID_INDEX = 12;
var GRID_ID_INDEX = 13;
var GRID_Match_Cluster_Key_INDEX = 14;
var GRID_Match_Status_INDEX = 15;
var GRID_ISDIRTY_COLUMN_INDEX = 16;
var GRID_FOUNDATIONACTIONVALUE_COLUMN_INDEX = 17;
var GRID_REGIONACTIONVALUE_COLUMN_INDEX = 18;

//Match Status Option values
var OPTIONS = {
    Select: "1",
    Match: "2",
    NoMatch: "3"
}

var POSTTYPE = {
    Submit: 1,
    SaveWork: 2
}

var dirtyGrid = false;
var lastRegionId = '';
var SMTModel = {}

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
    var grid = $("#grdSMT").data("kendoGrid");
    grid.dataSource.read();
    $("#grdSMT").css("display", "block");

    lastRegionId = $("[name='ddlRegion']").val();

    grid.dataSource.page(1);
    grid.pager.refresh();
}


$(document).ready(function () {

    $("#savework-alert").hide();
    $("#submit-alert").hide();
    $("#savework-alert-failure").hide();

    setGridHeight();

    var smtList = [];

    var userRole = $("#hdnUserRole").val();


    var recordsPerPage = $($('.k-input')[1]).text();

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

    //Pager Change Event - Next Previous button functionality
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

    //Hide column for Regional user
    var grid = $("#grdSMT").data("kendoGrid");
    if (userRole === "Regional") {
        grid.hideColumn(15);
        grid.hideColumn(16);
        grid.hideColumn(17);
        grid.hideColumn(18);
    }

    //Auto adjust Grid height
    function setGridHeight() {
        //Get the current window height
        var windowHeight = $(document).innerHeight();

        //record the value of the height to ensure it is showing correctly.

        console.log("Original Height" + windowHeight);

        //multiply this height by a percentage eg 70% of the window height
        windowHeight = windowHeight * 0.62;

        //record the new modified height
        console.log("Modified Height" + windowHeight);

        //find my grid and the grid content and set the height of it to the new percentage
        $("#grdSMT .k-grid-content").innerHeight(windowHeight);
        $("#grdSMT .k-grid-content-locked").innerHeight(windowHeight);
    }

    $(window).resize(function () {
        setGridHeight();
        //that._adjustLockedHorizontalScrollBar();

    });

    //Fire when approve button is clicked
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

    //Fire when release button is clicked
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
        var ddlMatchStatus = $(currentRow).children().eq(GRID_ACTION_VALUE_COLUMN_INDEX).find("[name=ddlOptions]").val();

        if (ddlMatchStatus === 1) { //Review
            alert("Enter select Match Status.");
            return false;
        }
        return true;
    }

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
                                url: 'SmtPostedData',
                                data: JSON.stringify(smtList),
                                contentType: "application/json",
                                success: function (res) {
                                    if (res.successStatus) {
                                        $("#savework-alert").fadeTo(2000, 500).slideUp(500, function () {
                                            $("#savework-alert").slideUp(500);
                                        });
                                        reloadGrid();
                                        smtList = [];
                                        dirtyGrid = false;
                                    } else {
                                        $("#savework-alert-failure").fadeTo(2000, 500).slideUp(500, function () {
                                            $("#savework-alert-failure").slideUp(500);
                                        });
                                    }
                                },
                                error: function () {
                                    $("#savework-alert-failure").fadeTo(2000, 500).slideUp(500, function () {
                                        $("#savework-alert-failure").slideUp(500);
                                    });
                                }
                            });
                    }
                }
            });
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
                                url: 'SmtPostedData',
                                data: JSON.stringify(smtList),
                                contentType: "application/json",
                                success: function (res) {
                                    if (res.successStatus) {
                                        $("#savework-alert").fadeTo(2000, 500).slideUp(500, function () {
                                            $("#savework-alert").slideUp(500);
                                        });
                                        reloadGrid();
                                        smtList = [];
                                        dirtyGrid = false;
                                    } else {
                                        $("#savework-alert-failure").fadeTo(2000, 500).slideUp(500, function () {
                                            $("#savework-alert-failure").slideUp(500);
                                        });
                                    }
                                },
                                error: function () {
                                    $("#savework-alert-failure").fadeTo(2000, 500).slideUp(500, function () {
                                        $("#savework-alert-failure").slideUp(500);
                                    }); }
                            });
                    }
                }
            });
        }
        //else {
        //    bootbox.alert({
        //        message: "Choose an action",
        //        size: 'small'
        //    });
        //}
    });

    //Save user data into database
    $("[name='btnSaveWork']").click(function () {
        if (validateSaveWork()) {
            //@Url.Action("SmtPostedData", "Smt")
            $.ajax(
                {
                    type: "post",
                    url: 'SmtPostedData',
                    data: JSON.stringify(smtList),
                    contentType: "application/json",
                    success: function (res) {
                        if (res.successStatus) {
                            $("#savework-alert").fadeTo(2000, 500).slideUp(500, function () {
                                $("#savework-alert").slideUp(500);
                            });
                            reloadGrid();
                            smtList = [];
                            dirtyGrid = false;
                        } else {
                            $("#savework-alert-failure").fadeTo(2000, 500).slideUp(500, function () {
                                $("#savework-alert-failure").slideUp(500);
                            });
                        }
                    },
                    error: function (err) {
                        $("#savework-alert-failure").fadeTo(2000, 500).slideUp(500, function () {
                            $("#savework-alert-failure").slideUp(500);
                        }); }

                });
        }
        else {
            alert('No data changes available to save.');
        }
    });

    //Save user data into database-bottom
    $("[name='btnSaveWorkBottom']").click(function () {
        if (validateSaveWork()) {

            $.ajax(
                {
                    type: "post",
                    url: 'SmtPostedData',
                    data: JSON.stringify(smtList),
                    contentType: "application/json",
                    success: function (res) {
                        if (res.successStatus) {
                            $("#savework-alert").fadeTo(2000, 500).slideUp(500, function () {
                                $("#savework-alert").slideUp(500);
                            });
                            reloadGrid();
                            smtList = [];
                            dirtyGrid = false;
                        } else {
                            $("#savework-alert-failure").fadeTo(2000, 500).slideUp(500, function () {
                                $("#savework-alert-failure").slideUp(500);
                            });
                        }
                    },
                    error: function () {
                        $("#savework-alert-failure").fadeTo(2000, 500).slideUp(500, function () {
                            $("#savework-alert-failure").slideUp(500);
                        }); }

                });
        }
        else {
            alert('No data changes available to save.');
        }
    });

    //Validate submit functionality and push data into SMT List
    function validateSubmit() {

        var gridRows = $(".k-grid-content-locked table tr");
        var selectedRows = 0;
        var isBaseRecord = '', recordChecked = false, checkedAction = '', stateStudentId = '', actionValue = '';

        var baseClusterKey;
        var isDirtyRecord = false;

        gridRows.each(function (index) {
            var gridContent = $('.k-grid-content table  tr:eq(' + index + ')');
            isBaseRecord = $(gridContent).children().eq(GRID_BASE_RECORD_COLUMN_INDEX).text();
            if (isBaseRecord === 'true') {
                checkedAction = $(this).children().eq(GRID_ACTION_COLUMN_INDEX).find("input:checked").val();

                if (checkedAction !== '' && checkedAction != undefined && checkedAction !== "1") {
                    baseClusterKey = $(gridContent).children().eq(GRID_Match_Cluster_Key_INDEX).text();
                    selectedRows = 1;
                    recordChecked = true;
                    isDirtyRecord = true;
                } else {
                    recordChecked = false;
                    isDirtyRecord = false;//Required
                }
            } else {
                var reviewClusterKey = $(gridContent).children().eq(GRID_Match_Cluster_Key_INDEX).text();
                if (reviewClusterKey === baseClusterKey && recordChecked) {
                    isDirtyRecord = true;
                } else
                    isDirtyRecord = false;
            }


            if (isDirtyRecord) {
                actionValue = $(this).children().eq(GRID_ACTION_VALUE_COLUMN_INDEX).find("[name='ddlOptions']").val();
                stateStudentId = $(this).children().eq(GRID_STUDENT_ID_COLUMN_INDEX).text();
                var id = $(gridContent).children().eq(GRID_ID_INDEX).text();
                var statusId = $(gridContent).children().eq(GRID_STATUS_ID_INDEX).text();
                var foundationActionValue = $(gridContent).children().eq(GRID_FOUNDATIONACTIONVALUE_COLUMN_INDEX).text();
                var regionActionValue = $(gridContent).children().eq(GRID_REGIONACTIONVALUE_COLUMN_INDEX).text();

                if (userRole !== "Regional") {
                    if (checkedAction === "2" && statusId === "1")
                        statusId = "2"; //Released By FDN
                    else if (checkedAction === "3" && (statusId === "1" || statusId === "2" || statusId === "3"))
                        statusId = "4"; //Approved by FDN
                }
                else
                    statusId = 3; //Updated by Region

                if (userRole !== "Regional") {
                    smtList.push({
                        StateStudentID: stateStudentId, AvaliableFor: checkedAction, MatchStatus: actionValue, StatusId: statusId,
                        Id: id, FoundationActionValue: checkedAction, RegionActionValue: regionActionValue
                    });
                }
                else {
                    smtList.push({
                        StateStudentID: stateStudentId, AvaliableFor: checkedAction, MatchStatus: actionValue, StatusId: statusId,
                        Id: id, FoundationActionValue: foundationActionValue, RegionActionValue: checkedAction
                    });
                }

            }
        });

        if (selectedRows > 0) {
            return true;
        }
        else {
            return false;
        }
    }

    //Validate save functionality and push data into SMT List
    function validateSaveWork() {

        var gridRows = $(".k-grid-content-locked table tr");
        var selectedRows = 0;
        var isBaseRecord = '', recordChecked = false, checkedAction = '', stateStudentId = '', actionValue = '';

        var baseClusterKey;
        var isDirtyRecord = false;

        gridRows.each(function (index) {
            isBaseRecord = $('.k-grid-content table tr:eq(' + index + ') td:eq(' + GRID_BASE_RECORD_COLUMN_INDEX + ')').text();
            if (isBaseRecord === 'true') {
                if ($('.k-grid-content table tr:eq(' + index + ') td:eq(' + GRID_ISDIRTY_COLUMN_INDEX + ')').text() === "1") {
                    checkedAction = $(this).children().eq(GRID_ACTION_COLUMN_INDEX).find("input:checked").val();

                    //if (checkedAction !== '' && checkedAction != undefined && checkedAction !== "1") {
                    baseClusterKey = $('.k-grid-content table tr:eq(' + index + ') td:eq(' + GRID_Match_Cluster_Key_INDEX + ')').text();
                    selectedRows = 1;
                    recordChecked = true;
                    isDirtyRecord = true;
                } else {
                    recordChecked = false;
                    isDirtyRecord = false;//Required
                }
            } else {
                var reviewClusterKey = $('.k-grid-content table tr:eq(' + index + ') td:eq(' + GRID_Match_Cluster_Key_INDEX + ')').text();
                if (reviewClusterKey === baseClusterKey && recordChecked) {
                    isDirtyRecord = true;
                } else
                    isDirtyRecord = false;
            }


            if (isDirtyRecord) {
                actionValue = $(this).children().eq(GRID_ACTION_VALUE_COLUMN_INDEX).find("[name='ddlOptions']").val();
                stateStudentId = $(this).children().eq(GRID_STUDENT_ID_COLUMN_INDEX).text();
                var id = $('.k-grid-content table tr:eq(' + index + ') td:eq(' + GRID_ID_INDEX + ')').text();
                var statusId = $('.k-grid-content table tr:eq(' + index + ') td:eq(' + GRID_STATUS_ID_INDEX + ')').text();
                var foundationActionValue = $('.k-grid-content table tr:eq(' + index + ') td:eq(' + GRID_FOUNDATIONACTIONVALUE_COLUMN_INDEX + ')').text();
                var regionActionValue = $('.k-grid-content table tr:eq(' + index + ') td:eq(' + GRID_REGIONACTIONVALUE_COLUMN_INDEX + ')').text();

                if (userRole !== "Regional") {
                    smtList.push({
                        StateStudentID: stateStudentId, AvaliableFor: checkedAction, MatchStatus: actionValue, StatusId: statusId,
                        Id: id, FoundationActionValue: checkedAction, RegionActionValue: regionActionValue
                    });
                }
                else {
                    smtList.push({
                        StateStudentID: stateStudentId, AvaliableFor: checkedAction, MatchStatus: actionValue, StatusId: statusId,
                        Id: id, FoundationActionValue: foundationActionValue, RegionActionValue: checkedAction
                    });
                }

            }
        });

        if (selectedRows > 0) {
            return true;
        }
        else {
            return false;
        }
    }

    $("[name='lnkVMT']").removeClass('activeMenu');
    $("[name='lnkSMT']").addClass('activeMenu');

});

//Reload Grid
function reloadGrid() {

    $("#grdSMT").data("kendoGrid").dataSource.read();
    $("#grdSMT").css("display", "block");
}


//Apply coloring, clustering and font weight on grid data bound.
function onDataBound(e) {
    var grid = this;

    //Auto fit column width
    for (var i = 0; i < grid.columns.length; i++) {
        grid.autoFitColumn(i);
    }

    if (grid.dataSource.total() === 0) {
        var colCount = grid.columns.length;
        $(e.sender.wrapper)
            .find('.k-grid-content-locked tbody')
            .append('<tr class="kendo-data-row"><td colspan="' + colCount + '" class="no-data text-center">* No items to display</td></tr>');
    }

    //Check to enable Agree column, based on Regional user value
    var gridContentRows = $(".k-grid-content table tr");

    var isBaseRecord = '', currentRowColorCode = 2, currentRowColor = '', currentRowColor1 = '#CFCCC1', currentRowColor2 = '#F4EFEB';//, currentRowColor3 = '#F5F5F5';1 - green;#C6E0B42- yellow#FFFFCD;3-gray

    var stateStudentId = '', firstName = '', lastName = '', gender = '', dateOfBirth = '', classOf = '', schoolName = '', firstSchoolYear = '', firstEntryDate = '';
    var firstEntryGrade = '', finalSchoolYear = '', finalExitDate = '', finalGrade = '';
    gridContentRows.each(function (index) {
        var gridLocked = $('.k-grid-content-locked table tr:eq(' + index + ')');
        //var masterDomainValue = $(gridLocked).children().eq(GRID_INCOMINGDOMAINVALUE_COLUMN_INDEX).text();
        stateStudentId = $(gridLocked).children().eq(GRID_STUDENT_ID_COLUMN_INDEX).text();
        firstName = $(gridLocked).children().eq(GRID_FIRST_NAME_COLUMN_INDEX).text();
        lastName = $(gridLocked).children().eq(GRID_LAST_NAME_COLUMN_INDEX).text();
        gender = $(gridLocked).children().eq(GRID_GENDER_COLUMN_INDEX).text();
        dateOfBirth = $(gridLocked).children().eq(GRID_DOB_COLUMN_INDEX).text();
        classOf = $(gridLocked).children().eq(GRID_CLASS_OF_COLUMN_INDEX).text();

        schoolName = $(this).children().eq(GRID_SCHOOL_NAME_COLUMN_INDEX).text();
        firstSchoolYear = $(this).children().eq(GRID_FIRST_SCHOOL_YEAR_COLUMN_INDEX).text();
        firstEntryDate = $(this).children().eq(GRID_FIRST_ENTRY_DATE_COLUMN_INDEX).text();
        firstEntryGrade = $(this).children().eq(GRID_FIRST_ENTRY_GRADE_COLUMN_INDEX).text();
        finalSchoolYear = $(this).children().eq(GRID_FINAL_SCHOOL_YEAR_COLUMN_INDEX).text();
        finalExitDate = $(this).children().eq(GRID_FINAL_EXIT_DATE_COLUMN_INDEX).text();
        finalGrade = $(this).children().eq(GRID_FINAL_GRADE_COLUMN_INDEX).text();

        isBaseRecord = $(this).children().eq(GRID_BASE_RECORD_COLUMN_INDEX).text();

        //Grid content alignment
        $('.k-grid-content-locked table tr:eq(' + index + ') td:eq(' + GRID_STUDENT_ID_COLUMN_INDEX + ')').attr('style', 'text-align:right');
        $('.k-grid-content-locked table tr:eq(' + index + ') td:eq(' + GRID_DOB_COLUMN_INDEX + ')').attr('style', 'text-align:right');
        $(this).children().eq(GRID_FIRST_SCHOOL_YEAR_COLUMN_INDEX).attr('style', 'text-align:right;');
        $(this).children().eq(GRID_FIRST_ENTRY_GRADE_COLUMN_INDEX).attr('style', 'text-align:right;');
        $(this).children().eq(GRID_FINAL_SCHOOL_YEAR_COLUMN_INDEX).attr('style', 'text-align:right;');

        if (isBaseRecord === 'true') {
            var gridLocked = $('.k-grid-content-locked table tr:eq(' + index + ')');
            var reviewRecordExists = checkReviewRecordsMatchStatus(index, false);
            var baseRecordStatus = $('.k-grid-content table tr:eq(' + index + ') td:eq(' + GRID_STATUS_ID_INDEX + ')').text();
            var foundationActionValue = '1'; var regionActionValue = '1';
            if ($("#hdnUserRole").val() !== "Regional") {
                foundationActionValue = $(this).children().eq(GRID_FOUNDATIONACTIONVALUE_COLUMN_INDEX).text();
                if (foundationActionValue === '1') {
                    $(gridLocked).find("[id=rbtnReview]").attr('checked', true);
                    $(gridLocked).find("[id=rbtnRelease]").removeAttr('checked');
                    $(gridLocked).find("[id=rbtnApprove]").removeAttr('checked');
                }
                else if (foundationActionValue === '2') {
                    if ($(this).children().eq(GRID_REGIONACTIONVALUE_COLUMN_INDEX).text() == "3") {
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
            if (baseRecordStatus === "1") {
                if (!reviewRecordExists) {
                    $('.k-grid-content-locked table tr:eq(' + index + ') td:eq(' + GRID_ACTION_COLUMN_INDEX + ')').find("[id=rbtnApprove]").attr('disabled', 'disabled');
                    $('.k-grid-content-locked table tr:eq(' + index + ') td:eq(' + GRID_ACTION_COLUMN_INDEX + ')').find("[id=rbtnRelease]").removeAttr('disabled');
                } else {
                    $('.k-grid-content-locked table tr:eq(' + index + ') td:eq(' + GRID_ACTION_COLUMN_INDEX + ')').find("[id=rbtnApprove]").removeAttr("disabled");
                    $('.k-grid-content-locked table tr:eq(' + index + ') td:eq(' + GRID_ACTION_COLUMN_INDEX + ')').find("[id=rbtnRelease]").removeAttr("disabled");
                }

            } else if (baseRecordStatus === "2" || baseRecordStatus === "3") {// Released By FDN or Updated By Region
                if (!reviewRecordExists) {
                    $('.k-grid-content-locked table tr:eq(' + index + ') td:eq(' + GRID_ACTION_COLUMN_INDEX + ')').find("[id=rbtnApprove]").attr('disabled', 'disabled');
                } else {
                    $('.k-grid-content-locked table tr:eq(' + index + ') td:eq(' + GRID_ACTION_COLUMN_INDEX + ')').find("[id=rbtnApprove]").removeAttr("disabled");
                }
            }
            if (currentRowColorCode === 1) { currentRowColorCode = 2; currentRowColor = currentRowColor2; }
            else if (currentRowColorCode === 2) { currentRowColorCode = 1; currentRowColor = currentRowColor1; }
            $(this).addClass("baseRecord");
            $('.k-grid-content-locked table tr:eq(' + index + ')').addClass("baseRecord");

            $(this).attr('style', 'background-color:' + currentRowColor);
            $(this).children().attr("style", "color:black;");//#60A2D6
            $('.k-grid-content-locked table tr:eq(' + index + ')').attr('style', 'color:black;background-color:' + currentRowColor);

            $(this).children().eq(GRID_FIRST_SCHOOL_YEAR_COLUMN_INDEX).attr('style', 'text-align:right;');
            $(this).children().eq(GRID_FIRST_ENTRY_GRADE_COLUMN_INDEX).attr('style', 'text-align:right;');
            $(this).children().eq(GRID_FINAL_SCHOOL_YEAR_COLUMN_INDEX).attr('style', 'text-align:right;');
            $(this).children().eq(GRID_FIRST_ENTRY_DATE_COLUMN_INDEX).attr("style", "text-align:right;");
            $(this).children().eq(GRID_FINAL_EXIT_DATE_COLUMN_INDEX).attr("style", "text-align:right;");
            $(this).children().eq(GRID_UPDATED_TIMESTAMP_COLUMN_INDEX)
                .attr("style", "text-align:right;color:black;");

            $('.k-grid-content-locked table tr:eq(' + index + ') td:eq(' + GRID_ACTION_COLUMN_INDEX + ')').attr('style', 'color:black');

            $('.k-grid-content-locked table tr:eq(' + index + ') td:eq(' + GRID_ACTION_VALUE_COLUMN_INDEX + ')').find("[name='ddlOptions']").remove();
            $('.k-grid-content-locked table tr:eq(' + index + ') td:eq(' + GRID_ACTION_VALUE_COLUMN_INDEX + ')').find("span").remove();

            SMTModel = {
                StateStudentId: stateStudentId, FirstName: firstName, LastName: lastName, Gender: gender, DateOfBirth: dateOfBirth, ClassOf: classOf,
                SchoolName: schoolName, FirstSchoolYear: firstSchoolYear, FirstEntryDate: firstEntryDate, FirstEntryGrade: firstEntryGrade, FinalSchoolYear: finalSchoolYear,
                FinalExitDate: finalExitDate, FinalGrade: finalGrade
            };
        }
        else {
            $(this).attr('style', 'background-color:' + currentRowColor);
            $('.k-grid-content-locked table tr:eq(' + index + ')').attr('style', 'background-color:' + currentRowColor);

            $('.k-grid-content-locked table tr:eq(' + index + ') td:eq(' + GRID_ACTION_COLUMN_INDEX + ')').empty();
            $(this).children().eq(GRID_STATUS_DESCRIPTION_INDEX).empty();
            $(this).children().eq(GRID_UPDATED_TIMESTAMP_COLUMN_INDEX).empty();
            $(this).children().eq(GRID_UPDATED_BY_COLUMN_INDEX).empty();

            var matchStatus = $(this).children().eq(GRID_Match_Status_INDEX).text();
            $('.k-grid-content-locked table tr:eq(' + index + ') td:eq(' + GRID_ACTION_VALUE_COLUMN_INDEX + ')').find("[name='ddlOptions']").val(matchStatus);

            if (SMTModel.StateStudentId.toLowerCase() !== stateStudentId.toLowerCase()) {
                applyCellColor("lockedColumns", this, index, GRID_STUDENT_ID_COLUMN_INDEX);
            }

            if (SMTModel.FirstName.toLowerCase() !== firstName.toLowerCase()) {
                applyCellColor("lockedColumns", this, index, GRID_FIRST_NAME_COLUMN_INDEX);
            }

            if (SMTModel.LastName.toLowerCase() !== lastName.toLowerCase()) {
                applyCellColor("lockedColumns", this, index, GRID_LAST_NAME_COLUMN_INDEX);
            }

            if (SMTModel.Gender.toLowerCase() !== gender.toLowerCase()) {
                applyCellColor("lockedColumns", this, index, GRID_GENDER_COLUMN_INDEX);
            }

            if (SMTModel.DateOfBirth !== dateOfBirth) {
                applyCellColor("lockedColumns", this, index, GRID_DOB_COLUMN_INDEX);
            }

            if (SMTModel.ClassOf !== classOf) {
                applyCellColor("lockedColumns", this, index, GRID_CLASS_OF_COLUMN_INDEX);
            }

            if (SMTModel.SchoolName.toLowerCase() !== schoolName.toLowerCase()) {
                applyCellColor("", this, index, GRID_SCHOOL_NAME_COLUMN_INDEX);
            }

            if (SMTModel.FirstSchoolYear !== firstSchoolYear) {
                applyCellColor("", this, index, GRID_FIRST_SCHOOL_YEAR_COLUMN_INDEX);
            }
            if (SMTModel.FirstEntryDate !== firstEntryDate) {
                applyCellColor("", this, index, GRID_FIRST_ENTRY_DATE_COLUMN_INDEX);
            }
            if (SMTModel.FirstEntryGrade.toLowerCase() !== firstEntryGrade.toLowerCase()) {
                applyCellColor("", this, index, GRID_FIRST_ENTRY_GRADE_COLUMN_INDEX);
            }
            if (SMTModel.FinalSchoolYear !== finalSchoolYear) {
                applyCellColor("", this, index, GRID_FINAL_SCHOOL_YEAR_COLUMN_INDEX);
            }

            if (SMTModel.FinalExitDate !== finalExitDate) {
                applyCellColor("", this, index, GRID_FINAL_EXIT_DATE_COLUMN_INDEX);
            }

            if (SMTModel.FinalGrade.toLowerCase() !== finalGrade.toLowerCase()) {
                applyCellColor("", this, index, GRID_FINAL_GRADE_COLUMN_INDEX);
            }

        }
    });

    //Set Action column and Updated By column width
    if ($("#hdnUserRole").val() !== "Regional") {
        $(".k-grid-header-locked colgroup col:eq(0)").css("width", 250);
        $(".k-grid-content-locked colgroup col:eq(0)").css("width", 250);
    } else {
        $(".k-grid-header-locked colgroup col:eq(0)").css("width", 154);
        $(".k-grid-content-locked colgroup col:eq(0)").css("width", 154);
    }
    $(".k-grid-header .k-grid-header-wrap.k-auto-scrollable colgroup col:eq(7)").css("width", 200);
    $(".k-grid-content colgroup col:eq(7)").css("width", 200);

    //Apply cluster alternative cell color
    function applyCellColor(contentType, currentRow, rowIndex, columnIndex) {
        if (contentType === "lockedColumns") {
            $('.k-grid-content-locked table tr:eq(' + rowIndex + ') td:eq(' + columnIndex + ')').addClass("color-red");
        }
        else {
            $(currentRow).children().eq(columnIndex).addClass("color-red");
        }
    }

    //Check review records match status
    function checkReviewRecordsMatchStatus(indexValue, isOnChangeEvent) {
        var baseRecordClusterKey = $('.k-grid-content table tr:eq(' + indexValue + ') td:eq(' + GRID_Match_Cluster_Key_INDEX + ')').text();
        var reviewRecordClusterKey = $('.k-grid-content table tr:eq(' + (indexValue + 1) + ') td:eq(' + GRID_Match_Cluster_Key_INDEX + ')').text();
        var reviewRecordIndex = indexValue + 1;
        while (baseRecordClusterKey === reviewRecordClusterKey) {
            var ddlValue;
            if (isOnChangeEvent) {
                ddlValue = $('.k-grid-content-locked table tr:eq(' +
                    reviewRecordIndex +
                    ') td:eq(' +
                    GRID_ACTION_VALUE_COLUMN_INDEX +
                    ')')
                    .find("[name='ddlOptions']").val();
            } else {
                ddlValue = $('.k-grid-content table tr:eq(' +
                    reviewRecordIndex +
                    ') td:eq(' +
                    GRID_Match_Status_INDEX +
                    ')').text();
            }
            if (ddlValue === OPTIONS.Review)
                return false;
            reviewRecordIndex = reviewRecordIndex + 1;
            reviewRecordClusterKey = $('.k-grid-content table tr:eq(' + reviewRecordIndex + ') td:eq(' + GRID_Match_Cluster_Key_INDEX + ')').text();
        }
        return true;
    }

    //Fire this function on dropdoen change
    $("[name='ddlOptions']").change(function () {

        var currentRow = $(this).parent().parent();
        var currentRowIndex = $(currentRow).index();

        //var uniqueId = $('.k-grid-content table tr:eq(' + currentRowIndex + ') td:eq(' + GRID_ID_INDEX + ')').text();

        var id = $('.k-grid-content table tr:eq(' + currentRowIndex + ') td:eq(' + GRID_ID_INDEX + ')').text();
        var baseRecordStatus = '';
        var gridRows = $(".k-grid-content-locked table tr");
        var reviewRecordExists = true, baseRecordIndex = 0;
        gridRows.each(function (indexId) {
            //var gridRowUniqueId = $(this).children().eq(GRID_ID_INDEX).text();
            var gridRowUniqueId = $('.k-grid-content table tr:eq(' + indexId + ') td:eq(' + GRID_ID_INDEX + ')').text();
            if (id === gridRowUniqueId) {
                var iiii = indexId;
                var indx = iiii - 1;
                isBaseRecord = $('.k-grid-content table tr:eq(' + indx + ') td:eq(' + GRID_BASE_RECORD_COLUMN_INDEX + ')').text();
                if (isBaseRecord !== 'true') {
                    //var indx = indexId-1;
                    while (isBaseRecord !== 'true') {
                        indx = indx - 1;
                        isBaseRecord = $('.k-grid-content table tr:eq(' + indx + ') td:eq(' + GRID_BASE_RECORD_COLUMN_INDEX + ')').text();
                    }
                }
                baseRecordStatus = $('.k-grid-content table tr:eq(' + indx + ') td:eq(' + GRID_STATUS_ID_INDEX + ')').text();
                //isBaseRecord = $('.k-grid-content table tr:eq(' + indexId + ') td:eq(' + GRID_BASE_RECORD_COLUMN_INDEX + ')').text();
                if (isBaseRecord === 'true') {
                    baseRecordIndex = indx;
                    $('.k-grid-content table tr:eq(' + baseRecordIndex + ') td:eq(' + GRID_ISDIRTY_COLUMN_INDEX + ')').text(1);
                    dirtyGrid = true;
                }
                //var ddlValue = $(this).children().eq(GRID_ACTION_VALUE_COLUMN_INDEX).find("[name='ddlOptions']").val();
                reviewRecordExists = checkReviewRecordsMatchStatus(indx, true);
                //if (ddlValue === OPTIONS.Review)
                //    reviewRecordExists = false;
            }
        });

        if (baseRecordStatus === "1") {
            if (!reviewRecordExists) {
                $('.k-grid-content-locked table tr:eq(' + baseRecordIndex + ') td:eq(' + GRID_ACTION_COLUMN_INDEX + ')').find("[id=rbtnApprove]").attr('disabled', 'disabled');
                $('.k-grid-content-locked table tr:eq(' + baseRecordIndex + ') td:eq(' + GRID_ACTION_COLUMN_INDEX + ')').find("[id=rbtnRelease]").removeAttr('disabled');
                $('.k-grid-content-locked table tr:eq(' + baseRecordIndex + ') td:eq(' + GRID_ACTION_COLUMN_INDEX + ')').find("[id=rbtnReview]").prop("checked", true);
            } else {
                $('.k-grid-content-locked table tr:eq(' + baseRecordIndex + ') td:eq(' + GRID_ACTION_COLUMN_INDEX + ')').find("[id=rbtnApprove]").removeAttr("disabled");
                $('.k-grid-content-locked table tr:eq(' + baseRecordIndex + ') td:eq(' + GRID_ACTION_COLUMN_INDEX + ')').find("[id=rbtnRelease]").removeAttr("disabled");
            }

        } else if (baseRecordStatus === "2" || baseRecordStatus === "3") {// Released By FDN
            if (!reviewRecordExists) {
                $('.k-grid-content-locked table tr:eq(' + baseRecordIndex + ') td:eq(' + GRID_ACTION_COLUMN_INDEX + ')').find("[id=rbtnApprove]").attr('disabled', 'disabled');
                $('.k-grid-content-locked table tr:eq(' + baseRecordIndex + ') td:eq(' + GRID_ACTION_COLUMN_INDEX + ')').find("[id=rbtnReview]").prop("checked", true);
            } else {
                $('.k-grid-content-locked table tr:eq(' + baseRecordIndex + ') td:eq(' + GRID_ACTION_COLUMN_INDEX + ')').find("[id=rbtnApprove]").removeAttr("disabled");
            }
        }
    });

}


