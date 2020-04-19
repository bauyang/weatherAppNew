    let lat = 0;
    let long = 0;
    let city = '';
    let temp = 0;
    let weather = "";
    let date = "";

function getWeather(callback){
    let input = $("#input").val();

    $.get("https://api.openweathermap.org/data/2.5/weather?zip="+ input +",us&appid=549800580d6025f13c9688f4be033ff6", function(result){
        console.log(result);
        lat = result.coord.lat;
        long = result.coord.lon;
        city = result.name;
        callback();
    })
};

function getTimeZone(){
    $.get("https://api.openweathermap.org/data/2.5/onecall?lat="+ lat +"&lon="+ long +"&appid=549800580d6025f13c9688f4be033ff6", function(result){
        console.log(result);
        temp = result.current.temp;
        weather = result.current.weather[0].main;
        date = moment().tz(result.timezone).format("dddd, MMMM Do YYYY, h:mm:ss a");

        $("#city").append("City :" + city);
        $("#date").append("Date :" + date);
        $("#weather").append(weather + " with a temperature of " + temp);
    })
};

 $("#input").keyup(function(key){
     if(key.keyCode == 13){
         $("#city, #date, #weather").empty();
         getWeather(getTimeZone);
     }
 });