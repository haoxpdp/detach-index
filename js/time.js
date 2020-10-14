


function initDate() {
    var initDate = new Date();
    var min = initDate.getMinutes();
    if(initDate.getMinutes().toString().length == 1){
        min = "0"+min;
    }
    $("#time").text(initDate.getHours() +":" + min)

}
initDate();

$(document).ready(function () {
    setInterval(() => {
        initDate();
    }, 2000);


    $.ajax({
        type: "get",
        url: "http://localhost:9045/test",
        success: function (response) {
            console.log(response)            
        }
    });
    
});