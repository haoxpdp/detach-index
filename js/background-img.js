const bgImgUrl = "bgImgUrl"
chrome.storage.sync.get("bgAtomization",function (data) {
    var offset = $.isEmptyObject(data)?"0%":data.bgAtomization+"%";

    ZUI.silder({
        elem: '.bg-atomization',
        color: 'gray',
        pos: offset,
        showNum: true,
        count: 100,
        disable: false,
        callBackMove: function (num) {
            $(".bg").css("filter", "blur(" + num + "px)")
            updateStroageBgAtomiztion(num);

        },
        callBackMouseup: function (num) {
        }
    })
})

$(document).ready(function (e) {
    loadBgAtomiztion();
    loadBgImgUrl();
})

function updateStroageBgAtomiztion (num) {
    chrome.storage.sync.set({"bgAtomization":num},function (data) {
        loadBgAtomiztion();
    })
}

function loadBgAtomiztion () {
    chrome.storage.sync.get("bgAtomization",function (data){
        if ($.isEmptyObject(data)){
            chrome.storage.sync.set({"bgAtomization":0},function (data) {
                $(".bg").css("filter",'blur(0px)');
            })
        }else{
            $(".bg").css("filter",'blur('+data.bgAtomization+"px)");
        }
    })
}


$("#bg-url-input").change(function (e) {
    e.preventDefault();
    var url = $(this).val();
    chrome.storage.sync.set({"bgImgUrl":url},function(data){
        loadBgImgUrl();
    })
});

function loadBgImgUrl () {
    chrome.storage.sync.get("bgImgUrl",function (data) {
        var url;
        if ($.isEmptyObject(data)){
            url = "https://w.wallhaven.cc/full/lq/wallhaven-lq6rmy.png";
            chrome.storage.sync.set({"bgImgUrl":url},function (d) {});
        }else{
            url = data.bgImgUrl;
        }

        $(".bg").attr("src", url)
        $("#bg-url-input").val(url);
    })

}

function toggleSearch (focus) {
    if (searchModel == focus) {
        return;
    }

    if (focus) {
        searchModel = true;
        $(".search-input").attr("placeholder", '')
        $(".function-tab-container").fadeOut();
        $(".link-item").fadeOut()
        $(".search-icon").show();
        // $(".bg").css("filter", "blur(100px)")
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
        $(".link-item").fadeIn(200)
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