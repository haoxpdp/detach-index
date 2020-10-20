const atomization = "bg-atomization"
const bgImgUrl = "bgImgUrl"
var offset = localStorage.getItem(atomization) == null ? "0%" : localStorage.getItem(atomization) + "%";
console.log(offset)
ZUI.silder({
    elem: '.bg-atomization',
    color: 'gray',
    pos: offset,
    showNum: true,
    count: 100,
    disable: false,
    callBackMove: function (num) {
        $(".bg").css("filter", "blur(" + num + "px)")
        updateLocalStorageAtomiztion(num);

    },
    callBackMouseup: function (num) {
    }
})

$(document).ready(function (e) {
    loadBgAtomiztion();
    loadBgImgUrl();
})

function updateLocalStorageAtomiztion (num) {
    localStorage.setItem(atomization, num);
    loadBgAtomiztion();
}

function loadBgAtomiztion () {
    var ato = localStorage.getItem(atomization);
    if (ato == null) {
        ato == 0;
        localStorage.setItem(atomization, ato);
    }
    $(".bg").css("filter", "blur(" + ato + "px)")

}


$("#bg-url-input").change(function (e) {
    e.preventDefault();
    console.log("changed")
    localStorage.setItem(bgImgUrl, $(this).val());
    loadBgImgUrl();
});

function loadBgImgUrl () {
    var url = localStorage.getItem(bgImgUrl);
    if (url == null) {
        url = "https://w.wallhaven.cc/full/d5/wallhaven-d55rxl.jpg";
        localStorage.setItem(bgImgUrl, url);
    }
    $(".bg").attr("src", url)
    $("#bg-url-input").val(url);
}

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
        $(".search-input").attr("disabled", false)
        $(".search-input").focus()
        $(".search-radius").removeClass("focus-mode")
        $("#setting-container").fadeOut(100)

    } else {
        searchModel = false;
        $(".function-tab-container").fadeIn(200);
        $(".search-icon").hide();

        $("#clock").css("top", "18%");
        $(".search-wrapper").css("top", "40%");
        $(".input-holder").css({ "background": " rgba(0,0,0,0.3)", "height": "50px" });
        $(".search-input").css({ "padding-left": "0px", "top": "9px" })

        $(".search-input").attr("placeholder", 'search');
        $(".search-input").val('');
        $(".keywords").html("");
        $(".keywords").hide();
        $(".search-input").attr("disabled", true)
        $(".search-radius").addClass("focus-mode")
        loadBgAtomiztion();
    }
}