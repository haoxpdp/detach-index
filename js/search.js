var searchWeb = ""
const searchWebKey = "search_web_url"
var translateUrl;
var searchUrl;
var keyWordsUrl;
var activeWebId;

$(document).ready(function () {
    initLocalStorage();
    activeSearchRadius();

});

function initLocalStorage (params) {
    searchWeb = localStorage.getItem(searchWebKey);
    if (searchWeb == null) {
        searchWeb = {
            "id": "baidu",
            "searchUrl": "https://www.baidu.com/s?ie=utf-8&word=",
            "keyWordsUrl": "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?json=1&wd="
        }
        localStorage.setItem(searchWebKey, JSON.stringify(searchWeb))
    }
}

function activeSearchRadius () {
    var activeWeb = JSON.parse(localStorage.getItem(searchWebKey));
    $(".search-radius").find("button").removeClass("active");
    $("#" + activeWeb.id).addClass("active")
    translateUrl = activeWeb.translation;
    searchUrl = activeWeb.searchUrl;
    keyWordsUrl = activeWeb.keyWordsUrl;
    activeWebId = activeWeb.id;
    $(".search-input").trigger("input")
}

function saveSearchWeb (params) {
    localStorage.setItem(searchWebKey, JSON.stringify(params))
    activeSearchRadius();
}

$(".search-radius button").click(function (e) {
    var web;
    if (this.id == 'baidu') {
        web = {
            "id": this.id,
            "searchUrl": "https://www.baidu.com/s?ie=utf-8&word=",
            "keyWordsUrl": "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?json=1&wd=",
            "translation": "https://fanyi.baidu.com/#en/zh/"
        }
    } else if (this.id == 'google') {
        web = {
            "id": this.id,
            "searchUrl": "https://www.google.com/search?q=",
            "keyWordsUrl": "http://google.com/complete/search?output=toolbar&q=",
            "translation": "https://translate.google.com/?um=1&ie=UTF-8&hl=zh-CN&client=tw-ob#en/zh-CN/"
        }
    } else if (this.id == 'bing') {
        web = {
            "id": this.id,
            "searchUrl": "https://cn.bing.com/search?q=",
            "keyWordsUrl": "https://api.bing.com/qsonhs.aspx?type=cb&q=",
            "translation": "https://cn.bing.com/translator/?ref=TThis&text="
        }
    }
    saveSearchWeb(web);
})

$(".search-input").on("input", function (e) {
    $(".keywords").html("");
    var searchIndex = 1;
    if ($(".search-input").val().length) {
        var translite = "<div class='search-link'>翻译:" + $(".search-input").val() + "<span>alt+1</span> </div>"
        var url = keyWordsUrl + $(".search-input").val()
        $.ajax({
            type: "get",
            url: url,
            success: function (response) {

                $(".keywords").html("");
                $(".keywords").append(translite)
                var sugArr = [];

                if (activeWebId == 'baidu') {
                    sugArr = baiduKeywords(response);
                } else if (activeWebId == 'google') {
                    sugArr = googleKeywords(response);
                } else if (activeWebId == 'bing') {
                    sugArr = bingKeywords(response)
                }

                sugArr.forEach(function (v, i) {
                    searchIndex++;
                    if (searchIndex <= 9) {
                        $(".keywords").append("<div class='search-link'>" + v + "<span>alt+" + searchIndex + "</span> </div>");
                    }
                })
            }
        });
        $(".keywords").fadeIn();

    } else {
        $(".keywords").fadeOut();
    }

})


$(".search-icon").click(function (e) {
    e.preventDefault();
    var url = searchUrl + $(".search-input").val();
    window.location.href = url
    // window.open(url)
});


$(document).on("click", '.search-link', function (e) {
    var text = $(this).text();

    if (text.trim() == ("翻译:" + $(".search-input").val() + "alt+1")) {
        var url = translateUrl + $(".search-input").val();
        window.location.href = url;
        toggleSearch(false);
    } else {

        var searchV = '';
        var order = $(".search-link").index($(this)) + 1;
        if (order <= 9) {
            var replaceStr = "alt+" + order;
            searchV = $(this).text().replace(replaceStr, "")
        } else {
            serachV = $(this).text();
        }
        var url = searchUrl + searchV;
        window.location.href = url;
        // toggleSearch(false);
    }
})


function baiduKeywords (response) {
    var r = response.replace("window.baidu.sug(", "");
    r = r.substr(0, r.length - 2)
    return JSON.parse(r).s;
}

function googleKeywords (response) {
    var k = [];
    $.each(response.getElementsByTagName("suggestion"), function (indexInArray, valueOfElement) {
        k.push(valueOfElement.getAttribute("data"))
    });

    return k;
}

function bingKeywords (response) {
    var data = [];
    $.each(response.AS.Results[0].Suggests, function (indexInArray, valueOfElement) {
        data.push(valueOfElement.Txt)
    });
    return data;
}

function toogleAcitveSearchWeb (left) {
    var index = $(".search-web").index($(".active"));
    if (left) {
        index = index - 1 < 0 ? 2 : index - 1;
    } else {
        index = index + 1 > 2 ? 0 : index + 1
    }
    var id = $(".search-web")[index].id;
    $("#" + id).trigger("click")
}