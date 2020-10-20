$(document).keydown(function (e) {

    if (e.keyCode == 13 && $(".search-input").is(":focus")) {
        $(".search-icon").trigger("click")
        e.preventDefault();
    } else if (!searchModel && e.altKey && (e.keyCode - 48) < 7) {
        var i = e.keyCode - 49;
        $($(".link-item")[i]).trigger('click')
    } else if (!searchModel && e.keyCode == 32) {
        toggleSearch(true);

        e.preventDefault();
    }

    if (searchModel) {
        console.log("searchModel " + e.keyCode)
        console.log(e.altKey)
        if (e.keyCode == 27) {
            toggleSearch(false);
            e.preventDefault();
        } else if (e.altKey && (e.keyCode - 48) < 7 && (e.keyCode - 48) >= 0) {
            var i = e.keyCode - 49;
            $($(".search-link")[i]).css({ "padding-left": "40px", "background-color": "rgba(100, 100, 100, 0.5)" });
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