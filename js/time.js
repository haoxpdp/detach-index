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
    initNavigation();
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
    } else if (e.altKey && (e.keyCode - 48 )< 7) {
        var i = e.keyCode - 49;
        console.log($($(".link-item")[i]).trigger('click'))
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


$(document).on("mousewheel DOMMouseScroll", function (e) {
    var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||
        (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));
    if (delta == -1 && !$(".search-input").is(":focus")) {
        $(".search-input").focus();
    }
    if (delta == 1 && $(".search-input").is(":focus")) {
        $(".search-input").blur()
    }
});

$(".search-input").focus(function () {
    $(".search-input").attr("placeholder", '');
})
$(".search-input").blur(function () {
    $(".search-input").attr("placeholder", 'search');
    $(".search-input").val('')
})


$(document).on("click", ".link-item", function (e) {
    console.log("click link item")
    console.log($(this).attr("data-link"))
    window.open($(this).attr("data-link"))
})

function togglePopMenu() {


}

function initNavigation() {
    const key = 'hrefLst'
    var data = [];
    if (window.localStorage) {
        data = JSON.parse(localStorage.getItem(key));
    } else {

    }
    if (data ==null){
        data = [
            {
                "src": "https://www.bilibili.com",
                "img": "https://www.bilibili.com/favicon.ico",
                "desc": "哔哩哔哩 (゜-゜)つロ 干杯~-bilibili"
            },
            {
                "src": "https://www.zhihu.com",
                "img": "https://www.zhihu.com/favicon.ico",
                "desc": "首页 - 知乎"
            },
            {
                "src": "https://github.com/",
                "img":"https://github.com/favicon.ico",
                "desc":"GitHub"
            },
            {
                "src":"https://bz.zzzmh.cn/",
                "img":"https://bz.zzzmh.cn/favicon.ico",
                "desc":"极简壁纸_海量电脑桌面壁纸美图_4K超高清_最潮壁纸网站"
            }
        ];
    }
    if(data.length<7){
        
    }

    data.forEach(function (i, index) {
        var div = '<div class="link-item" data-link="' + i.src + '">' +
            '   <div class="item-icon">' +
            '       <img width="24px" height="24px" src="' + i.img + '" alt="">' +
            '   </div>' +
            '   <div class="item-desc">' +
            '       <p>' + i.desc + '</p>' +
            '   </div>' +
            '</div>'
        $(".function-navigation").append(div);
    })
}

