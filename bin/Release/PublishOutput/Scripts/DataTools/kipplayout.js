
$("#btnLogout").click(function () {
    $.ajax({
        type: "Get",
        url: '@Url.Action("Logout","Login")',
        success: function () {
            window.location.href = "https://kipp.onelogin.com/client/apps";
        }
    });
});

$("[name='lnkVMT']").click(function () {
    alert('Success');
    $(this).addClass('activeMenu');
    $("[name='lnkSMT']").removeClass('activeMenu');

    location.href = '@Url.Action("Index", "Vmt")';
});

$("[name='lnkSMT']").click(function () {

    $(this).addClass('activeMenu');
    $("[name='lnkVMT']").removeClass('activeMenu');

    location.href = '@Url.Action("Index", "Smt")';
});

$("#btnSettings").click(function () {
    $("[name='lnkVMT']").removeClass('activeMenu');
    $("[name='lnkSMT']").removeClass('activeMenu');
    location.href = '@Url.Action("Index", "RoleManager")';
});

$("#btnHelp").click(function (e) {
    e.preventDefault();
    var pageName = $(".activeMenu").text();
    if (pageName === "Field Matching") {
        window.open("@Url.Content(@'~/Content/help/VMT_Help.pdf')");
    } else if (pageName === "Student Matching") {
        window.open("@Url.Content(@'~/Content/help/SMT_Help.pdf')");
    }
});
