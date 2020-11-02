$(document).keydown(function (e) {
    console.log("eeeee " + e.keyCode)
    if (e.keyCode == 13 && $(".search-input").is(":focus")) {
        $(".search-icon").trigger("click")
        e.preventDefault();
    } else if (!searchModel && e.altKey && (e.keyCode - 48) < 7) {
        var i = e.keyCode - 49;
        $($(".item-icon")[i]).trigger('click')
    } else if (!searchModel && e.keyCode == 32) {
        toggleSearch(true);

        e.preventDefault();
    }

    if (!searchModel && e.keyCode == 13 && $(".plus-container").css("display") != 'none') {
        $(".form-btn-add").trigger('click')
        e.preventDefault();
        return;
    }
    if (!searchModel && e.keyCode == 27) {
        if ($(".plus-container").css("display") != 'none') {

            $(".form-btn-cancel").trigger('click')
            e.preventDefault();
            return;
        }
        if ($("#setting-container").css("display") != 'none') {

            $("#setting-container").fadeOut(300)
            e.preventDefault();
            return;
        }
    }


    if (searchModel) {
        if (e.keyCode == 27) {
            toggleSearch(false);
            e.preventDefault();
        } else if (e.altKey && (e.keyCode - 48) < 7 && (e.keyCode - 48) >= 0) {
            var i = e.keyCode - 49;
            $($(".search-link")[i]).css({"padding-left": "40px", "background-color": "rgba(100, 100, 100, 0.5)"});
            $($(".search-link")[i]).trigger("click");

        } else if (e.altKey && e.keyCode == 37) {
            toogleAcitveSearchWeb(true);
            e.preventDefault()
        } else if (e.altKey && e.keyCode == 39) {
            toogleAcitveSearchWeb(false)
            e.preventDefault()
        }
    }
});
// https://www.github.com/

$(document).on("click", ".link-item", function (e) {

    if (e.target.contains($(this).find("svg")[0])) {
        if (e.target == $(this).find("svg")[0]) {
            let dataIndex = $(".link-item").index($(this));

            let self = this;
            chrome.storage.sync.get("quickLink", function (data) {
                if (!$.isEmptyObject(data)) {
                    data.quickLink.splice(dataIndex, 1);
                    $(self).fadeOut(200);
                }
                chrome.storage.sync.set({"quickLink": data.quickLink})
                return;
            })

        }

    }
    window.location.href = $(this).attr("data-link")
    e.preventDefault()


})