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
    window.location.href = url;
    $(".search-input").val("");
});

$("body").keypress(function (e) {
    e.preventDefault();

    console.log(e.keyCode)
    if (e.which == 13 && $(".search-input").is(":focus")) {
        var url = "https://www.baidu.com/s?ie=utf-8&word=" + $(".search-input").val();

        window.location.href = url;
        // $(".search-input").val("");
        // window.open(url)
    }

    // 快捷键

    // S，搜索
    if (e.keyCode === 83 && $(".search-input").is(":focus") === false) {
        $(".search-input").focus();

    }


});

var showSettings = false;

$(".setting").click(function () {
    if (!showSettings) {
        $(".setting-container").fadeIn()
        showSettings = true;
    } else if (showSettings) {
        $(".setting-container").fadeOut(100)
        showSettings = false;
    }
});


function togglePopMenu(){


}
