
$("#btnLogout").click(function () {
    $.ajax({
        type: "Get",
        url: '@Url.Action("Logout","Login")',
        success: function () {
            window.location.href = "https://kipp.onelogin.com/client/apps";
        }
    });
});

$("[name='linkCMT']").click(function () {
    alert('Success');
    $(this).addClass('activeMenu');
    $("[name='linkST']").removeClass('activeMenu');

    location.href = '@Url.Action("Index", "Vmt")';
});

$("[name='linkST']").click(function () {

    $(this).addClass('activeMenu');
    $("[name='linkCMT']").removeClass('activeMenu');

    location.href = '@Url.Action("Index", "Smt")';
});

$("#btnSettings").click(function () {
    $("[name='linkCMT']").removeClass('activeMenu');
    $("[name='linkST']").removeClass('activeMenu');
    location.href = '@Url.Action("Index", "RoleManager")';
});
// This method already implemented in the kipp layout html file. so comment it out.
//$("#btnHelp").click(function (e) {
//    e.preventDefault();
//    var pageName = $(".activeMenu").text();
//    if (pageName === "Field Matching") {
//        window.open("@Url.Content(@'~/Content/help/VMT_Help.pdf')");
//    } else if (pageName === "Student Matching") {
//        window.open("@Url.Content(@'~/Content/help/SMT_Help.pdf')");
//    }
//});
