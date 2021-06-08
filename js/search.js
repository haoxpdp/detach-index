var translateUrl;
var searchUrl;
var searchPos = 1;

$(document).ready(function () {
    initStorage();
    activeSearchRadius();

});

function initStorage(params) {
    chrome.storage.sync.get("searchEngine", function (data) {
        if ($.isEmptyObject(data)) {
            chrome.storage.sync.set({
                "searchEngine": {
                    "id": "baidu",
                    "searchUrl": "https://www.baidu.com/s?ie=utf-8&word=",
                    "keyWordsUrl": "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?json=1&wd="
                }
            }, function (data) {
            })
        }
    })

}

function activeSearchRadius() {
    chrome.storage.sync.get("searchEngine", function (data) {

        $(".search-radius").find("button").removeClass("active");
        $("#" + data.searchEngine.id).addClass("active")
        $(".search-input").trigger("input")
    })

}

function saveSearchWeb(params) {
    chrome.storage.sync.set({"searchEngine": params}, function (data) {
        activeSearchRadius();
    })
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
    chrome.storage.sync.get("searchEngine", function (data) {
        let id = data.searchEngine.id
        let searchEngine = data.searchEngine;
        $(".keywords").html("");
        var searchIndex = 1;
        if ($(".search-input").val().length) {
            let translite = "<div class='search-link'><span class='search-value'>翻译:" + $(".search-input").val() + "</span><span class='quick'>alt+1</span> </div>";
            if ($(".search-input").val().length > 30) {
                translite = "<div class='search-link'><span class='search-value'>翻译:" + $(".search-input").val().substr(0, 40) +"...</span><span class='quick'>alt+1</span> </div>";
            }

            let url = searchEngine.keyWordsUrl + $(".search-input").val()
            $.ajax({
                type: "get",
                url: url,
                success: function (response) {

                    $(".keywords").html("");
                    $(".keywords").append(translite)
                    let sugArr = [];


                    if (id === 'baidu') {
                        sugArr = baiduKeywords(response);
                    } else if (id === 'google') {
                        sugArr = googleKeywords(response);
                    } else if (id === 'bing') {
                        sugArr = bingKeywords(response)
                    }

                    sugArr.forEach(function (v, i) {
                        searchIndex++;
                        if (searchIndex <= 9) {
                            $(".keywords").append("<div class='search-link'><span class='search-value'>" + v + "</span><span class='quick'>alt+" + searchIndex + "</span> </div>");
                        }
                    })

                }
            });
            $(".keywords").fadeIn();
            searchPos=1
        } else {
            $(".keywords").fadeOut();
        }
    })


})


$(".search-icon").click(function (e) {
    e.preventDefault();
    chrome.storage.sync.get("searchEngine", function (data) {
        let url = data.searchEngine.searchUrl + $(".search-input").val();
        window.location.href = url;
    })

    // window.open(url)
});


$(document).on("click", '.search-link', function (e) {
    let text = $(this).find(".search-value").text();
    chrome.storage.sync.get("searchEngine", function (data) {
        let searchEngine = data.searchEngine;
        if (text.startsWith("翻译")) {
            let url = searchEngine.translation + $(".search-input").val();
            window.location.href = url;
            // toggleSearch(false);
        } else {

            let order = $(".search-link").index($(this)) + 1;
            let replaceStr = "alt+" + order;
            let url = searchEngine.searchUrl + text.replace(replaceStr, "");
            window.location.href = url;
            // toggleSearch(false);
        }
    })
})


function baiduKeywords(response) {
    var r = response.replace("window.baidu.sug(", "");
    r = r.substr(0, r.length - 2)
    return JSON.parse(r).s;
}

function googleKeywords(response) {
    var k = [];
    $.each(response.getElementsByTagName("suggestion"), function (indexInArray, valueOfElement) {
        k.push(valueOfElement.getAttribute("data"))
    });

    return k;
}

function bingKeywords(response) {
    var data = [];
    $.each(response.AS.Results[0].Suggests, function (indexInArray, valueOfElement) {
        data.push(valueOfElement.Txt)
    });
    return data;
}

function toogleAcitveSearchWeb(left) {
    var index = $(".search-web").index($(".active"));
    if (left) {
        index = index - 1 < 0 ? 2 : index - 1;
    } else {
        index = index + 1 > 2 ? 0 : index + 1
    }
    var id = $(".search-web")[index].id;
    $("#" + id).trigger("click")
}