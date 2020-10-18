function initDate() {
    var initDate = new Date();
    var min = initDate.getMinutes();
    if (initDate.getMinutes().toString().length == 1) {
        min = "0" + min;
    }
    $("#time").text(initDate.getHours() + ":" + min)

}

initDate();

$(document).ready(function () {
    setInterval(() => {
        initDate();
    }, 2000);

});

$(".search-icon").click(function (e) {
    e.preventDefault();
    var url = "https://www.baidu.com/s?ie=utf-8&word=" + $(".search-input").val();
    window.open(url)
});

$(document).keydown(function (e) {

    console.log(e.keyCode)
    if (e.keyCode == 13 && $(".search-input").is(":focus")) {
        var url = "https://www.baidu.com/s?ie=utf-8&word=" + $(".search-input").val();

        window.location.href = url;
        e.preventDefault();
    } else if (e.altKey && e.keyCode == 49) {
        console.log("alt+1")
    }
});


$("body").click(function (e) {
    let settingContainer = document.getElementById("setting-container")
    let settings = document.getElementsByClassName("setting");
    if (settingContainer.contains(e.target) || settings[0].contains(e.target)) {
        console.log("inner")
    } else {
        $("#setting-container").fadeOut(100)
        showSettings = false;
    }
})

var showSettings = false;

$(".setting").click(function () {
    if (!showSettings) {
        $("#setting-container").fadeIn()
        showSettings = true;
    } else if (showSettings) {
        $("#setting-container").fadeOut(100)
        showSettings = false;
    }
});

$(".search-input").focus(function () {
    $(".search-input").attr("placeholder",'');
})
$(".search-input").blur(function () {
    $(".search-input").attr("placeholder",'search');
    $(".search-input").val('')
})

function togglePopMenu() {


}
