


function initDate () {
    var initDate = new Date();
    var min = initDate.getMinutes();
    if (initDate.getMinutes().toString().length == 1) {
        min = "0" + min;
    }
    $("#time").text(initDate.getHours() + ":" + min)

}
initDate();


function searchToggle (obj, evt) {
    var container = $(obj).closest('.search-wrapper');

    if (!container.hasClass('active')) {
        container.addClass('active');
        evt.preventDefault();
    }
    else if (container.hasClass('active') && $(obj).closest('.input-holder').length == 0) {
        container.removeClass('active');
        // clear input
        container.find('.search-input').val('');
        // clear and hide result container when we press close
        container.find('.result-container').fadeOut(100, function () { $(this).empty(); });
    }
}

function submitFn (obj, evt) {
    value = $(obj).find('.search-input').val().trim();

    _html = "Yup yup! Your search text sounds like this: ";
    if (!value.length) {
        _html = "Yup yup! Add some text friend :D";
    }
    else {
        _html += "<b>" + value + "</b>";
    }

    $(obj).find('.result-container').html('<span>' + _html + '</span>');
    $(obj).find('.result-container').fadeIn(100);

    evt.preventDefault();
}

$(document).ready(function () {
    setInterval(() => {
        initDate();
    }, 2000);

});

$(".search-icon").click(function (e) {
    e.preventDefault();
    var url = "https://www.baidu.com/s?ie=utf-8&word=" + $(".search-input").val();
    window.open(url)
    $(".search-input").val("");
});

$("body").keypress(function (e) {
    // e.preventDefault();

    console.log(e.keyCode)
    if (e.which == 13 && $(".search-input").is(":focus")) {
        var url = "https://www.baidu.com/s?ie=utf-8&word=" + $(".search-input").val();

        $(".search-input").val("");
        window.open(url)
    }

    // 快捷键

    // S，搜索
    if (e.keyCode == 83 && $(".search-input").is(":focus") == false) {
        $(".search-input").focus();

    }


});

$(".setting").hover(function () {
    // over
    console.log("over")
}, function () {
    // out
    console.log("out")
}
);