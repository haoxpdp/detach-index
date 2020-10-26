function initDate() {
    let initDate = new Date();
    let min = initDate.getMinutes();
    if (initDate.getMinutes().toString().length == 1) {
        min = "0" + min;
    }
    $("#time").text(initDate.getHours() + ":" + min)

}

let searchModel = false;

initDate();

$(document).ready(function () {
    setInterval(() => {
        initDate();
    }, 2000);
    initNavigation();

});


$("body").click(function (e) {
    let settingContainer = document.getElementById("setting-container")
    let settings = document.getElementsByClassName("setting");
    if (settingContainer.contains(e.target) || settings[0].contains(e.target)) {

    } else {
        $("#setting-container").fadeOut(100)
        showSettings = false;
    }
    //    search模式
    let searchContainer = document.getElementsByClassName("search-wrapper")[0];
    var clickInner = searchContainer.contains(e.target);
    if (searchModel) {
        if (!clickInner) {
            toggleSearch(false)
        }
    } else {
        if (!searchModel) {
            if (clickInner) {
                toggleSearch(true);
            }
        }
    }

    // add 窗口
    let innerPlus = document.getElementsByClassName("item-plus")[0];
    if (!innerPlus.contains(e.target)) {
        closeItemPlus();
    }
});

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
    if (delta == -1) {
        toggleSearch(true);
    }
    if (delta == 1) {
        toggleSearch(false);
    }
});

function initNavigation() {
    chrome.storage.sync.get("quickLink",function (data) {
        if ($.isEmptyObject(data)){
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
                    "img": "https://github.com/favicon.ico",
                    "desc": "GitHub"
                },
                {
                    "src": "https://bz.zzzmh.cn/",
                    "img": "https://bz.zzzmh.cn/favicon.ico",
                    "desc": "极简壁纸_海量电脑桌面壁纸美图_4K超高清_最潮壁纸网站"
                }
            ];
        }

        $.each(data.quickLink, function (indexInArray, valueOfElement) {
            appendTag(valueOfElement)
        });
    })
}

function appendTag(i) {
    var div = '<div class="link-item" data-link="' + i.src + '">' +
        '   <div class="delete-link-item">' +
        '       <svg style="fill: black; padding:4px" viewBox="0 0 16 16" width="12px" height="12px" xmlns="http://www.w3.org/2000/svg"><path d="M14.1016 1.60156L8.20312 7.5L14.1016 13.3984L13.3984 14.1016L7.5 8.20312L1.60156 14.1016L0.898438 13.3984L6.79688 7.5L0.898438 1.60156L1.60156 0.898438L7.5 6.79688L13.3984 0.898438L14.1016 1.60156Z"></path></svg>' +
        '   </div>' +
        '   <div class="item-icon">' +
        '       <img width="24px" height="24px" src="' + i.img + '" alt="">' +
        '   </div>' +
        '   <div class="item-desc">' +
        '       <p>' + i.desc + '</p>' +
        '   </div>' +
        '</div>'
    $(".function-navigation").append(div);
}


$(".plus-icon").click(function (e) {
    $(".plus-container").fadeIn();
});

$(".close-plus-container").click(function (e) {
    closeItemPlus()
})

$(".form-btn-cancel").click(function (e) {
    e.preventDefault();
    $(".plus-container").fadeOut(300);
})

$(".form-btn-add").click(function (e) {
    e.preventDefault();
    let url = $(".form-url").val();
    let name = $(".form-name").val();
    let img = 'chrome://favicon/size/48/' + url;
    let tag = {
        "src": url,
        "img": img,
        "desc": name
    }
    chrome.storage.sync.get("quickLink",function (data){
        let list = [];
        if ($.isEmptyObject(data)){
            list.push(tag);
            appendTag(tag);
        }else{
            list = data.quickLink;
            if (list.length<7){
                list.push(tag);
                appendTag(tag);
            }
        }
        chrome.storage.sync.set({"quickLink":list});
        $(".plus-container").fadeOut(300);
    });

});

function closeItemPlus() {
    $(".plus-container").fadeOut(300);
    $(".form-url").val("");
    $(".form-name").val("");
}


$(".search-radius button").click(function (e) {
    e.preventDefault();
})