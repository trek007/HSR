
$("#btnLogout").click(function () {
    $.ajax({
        type: "Get",
        url: '@Url.Action("Logout","Login")',
        success: function () {
            window.location.href = "https://kipp.onelogin.com/client/apps";
        }
    });
});

$("[name='lnkCMT']").click(function () {
    $(this).addClass('activeMenu');

    location.href = '@Url.Action("Network", "Match")';
});

$("[name='lnkST']").click(function () {

    $(this).addClass('activeMenu');

    location.href = '@Url.Action("Network", "StrongTransition")';
});

$("[name='lnkPD']").click(function () {

    $(this).addClass('activeMenu');

    location.href = '@Url.Action("Network", "Persistence")';
});

$("[name='lnkPS']").click(function () {

    $(this).addClass('activeMenu');

    location.href = '@Url.Action("Scorecard", "Persistence")';
});


