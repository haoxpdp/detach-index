function initDate () {
    var initDate = new Date();
    var min = initDate.getMinutes();
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
    } else if (e.altKey && (e.keyCode - 48) < 7) {
        var i = e.keyCode - 49;
        console.log($($(".link-item")[i]).trigger('click'))
    } else if(!searchModel && e.keyCode == 32){
        toggleSearch(true);

        e.preventDefault();
    } else if(searchModel && e.keyCode == 27){
        toggleSearch(false);
        e.preventDefault();
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
    //    search模式
    let searchContainer = document.getElementsByClassName("search-wrapper")[0];
    console.log(searchContainer)
    var clickInner = searchContainer.contains(e.target);
    console.log(searchModel, clickInner)
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
    console.log(innerPlus)
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
    console.log(delta)
    if (delta == -1) {
        toggleSearch(true);
    }
    if (delta == 1) {
        toggleSearch(false);
    }
});

$(".search-input").focus(function () {
    // toggleSearch(true);
})
$(".search-input").blur(function () {

    // toggleSearch(false);
})


$(document).on("click", ".link-item", function (e) {

    window.location.href = $(this).attr("data-link")
})

function togglePopMenu () {


}
const tag_key = 'hrefLst'

function initNavigation () {
    var data = [];
    if (window.localStorage) {
        data = JSON.parse(localStorage.getItem(tag_key));
        console.log(data)
    } else {

    }
    if (data == null) {
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
    if (data.length < 7) {

    }
    
    $.each(data, function (indexInArray, valueOfElement) { 
         appendTag(valueOfElement)
    });

}

function appendTag (i) {
    var div = '<div class="link-item" data-link="' + i.src + '">' +
        '   <div class="item-icon">' +
        '       <img width="24px" height="24px" src="' + i.img + '" alt="">' +
        '   </div>' +
        '   <div class="item-desc">' +
        '       <p>' + i.desc + '</p>' +
        '   </div>' +
        '</div>'
    $(".function-navigation").append(div);
}

$(".search-input").on("input", function (e) {
    $(".keywords").html("");

    if ($(".search-input").val().length) {
        var translite = "<div class='search-link'>翻译:" + $(".search-input").val() + " </div>"
        $(".keywords").append(translite);
        $.ajax({
            type: "get",
            url: "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=" + $(".search-input").val() + "&json=1",
            success: function (response) {
                var r = response.replace("window.baidu.sug(", "");
                r = r.substr(0, r.length - 2)
                var sugArr = JSON.parse(r).s;
                sugArr.forEach(function (v, i) {
                    $(".keywords").append("<div class='search-link'>" + v + "</div>");
                })
            }
        });
        $(".keywords").fadeIn();

    } else {
        $(".keywords").fadeOut();
    }

})
$(document).on("click", '.search-link', function (e) {
    var text = $(this).text();
    console.log(text.trim())
    console.log(("翻译:" + $(".search-input").val()).trim())
    if (text.trim() == ("翻译:" + $(".search-input").val())) {
        var url = "https://fanyi.baidu.com/#en/zh/" + $(".search-input").val();
        window.location.href = url;
        toggleSearch(false);
    } else {
        var url = "https://www.baidu.com/s?ie=utf-8&word=" + $(".search-input").val();
        window.location.href = url;
        toggleSearch(false);
    }
})

function toggleSearch (focus) {
    if (searchModel == focus) {
        console.log("=======")
        return;
    }

    if (focus) {
        searchModel = true;
        $(".search-input").attr("placeholder", '')
        $(".function-tab-container").fadeOut();
        $(".search-icon").show();
        $(".bg").css("filter", "blur(100px)")
        $("#clock").css("top", "10%");
        $(".search-wrapper").css("top", "28%");
        $(".input-holder").css({ "background": "rgba(0,0,0,0.5)", "height": "40px" })
        $(".search-input").css({ "padding-left": "10px", "top": "5px" })
        $(".search-input").attr("disabled",false)
        $(".search-input").focus()


    } else {
        searchModel = false;
        $(".function-tab-container").fadeIn(200);
        $(".search-icon").hide();
        $(".bg").css("filter", "blur(0px)")
        $("#clock").css("top", "18%");
        $(".search-wrapper").css("top", "40%");
        $(".input-holder").css({ "background": " rgba(0,0,0,0.3)", "height": "50px" });
        $(".search-input").css({ "padding-left": "0px", "top": "9px" })

        $(".search-input").attr("placeholder", 'search');
        $(".search-input").val('');
        $(".keywords").html("");
        $(".keywords").hide();
        $(".search-input").attr("disabled",true)

    }
}

$(".plus-icon").click(function (e) {
    $(".plus-container").fadeIn();
});

$(".close-plus-container").click(function (e) {
    closeItemPlus()
})

$(".form-btn-cancel").click(function (e) {
    e.preventDefault();
})

$(".form-btn-add").click(function (e) {
    e.preventDefault();
    var url = $(".form-url").val();
    var name = $(".form-name").val();
    var img = 'chrome://favicon/size/48/' + url;
    var tag = {
        "src": url,
        "img": img,
        "desc": name
    }
    var data = JSON.parse(localStorage.getItem(tag_key));
    if (data == null) {
        data = [];
    }
    if (data.length < 7) {
        data.push(tag);
        appendTag(tag);
        localStorage.setItem(tag_key, JSON.stringify(data));
    }
    console.log(data);

});

function closeItemPlus () {
    $(".plus-container").fadeOut(300);
    $(".form-url").val("");
    $(".form-name").val("");
}