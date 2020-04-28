
//function to run the application 
$(document).ready(function () {

    //get date 
    var currentdate = moment().format('dddd, MMMM D YYYY');
    var today = $("<h1>").text(currentdate)
    $("#date-today").append(today);

    //Putting the Last City on Page//
    function pageStart() {
        var userCityInput = localStorage.getItem("city")
        //console.log(currentCity) //null until searched for 

        var cityBtns = userCityInput.split(", ");
        // console.log(split); //making array into string 
        for (i = 0; i < cityBtns.length; i++) {
            var specificSearch = userCityInput[i].length
            if (specificSearch > 0){
                console.log("value not null");
            var addCity = $("<button>").addClass("btn-block btn btn large btn-light")
            addCity.text(cityBtns[i]);
            $("#buttons").append(addCity);
            }; 
            
            //console.log(userCityInput);
            //if the users search input is invaild or null then do not display the button 
            //*grab the users input and then check to see if it's valid 
            //*form control for only cities that are within the data of the API 
            //*Small cities that don't come up 
            //*user clicks search without an input 
            //*spelling error turns up no city 
            // if ( currentCity === "null")
        };
        var lastCity = cityBtns[cityBtns.length - 1];
        searchCity(lastCity);
        dailyForecast(lastCity);
    }

    //Finding Current City's Info//
    function searchCity(city) {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=b90410cbb9f6bbe669e3f5a1db596f13";
        $.ajax({
            url: queryURL,
            method: "GET"
            //make promise 
        }).then(function (response) {
            console.log(response.name);
            console.log(response.weather[0].id);
            var cityName = $("<h2>").text(response.name);
            $("#city").empty();
            $("#city").append(cityName);
            var temperature = $("<p>").text(Math.round(((response.main.temp - 273.15) * 1.8) + 32) + "°F");
            $("#temperature").empty();
            $("#temperature").append(temperature);
            var humidity = $("<p>").text("Humidity: " + response.main.humidity + "%")
            $("#humidity").empty();
            $("#humidity").append(humidity);
            var wind = $("<p>").text("Wind Speed: " + response.wind.speed + " mph")
            $("#wind").empty();
            $("#wind").append(wind);
            if (response.weather[0].id === 500) {
                var icon = $("<img>").attr("src", "./Assets/storm.png"); //Storm Icon 
                $("#uv").empty();
                $("#uv").append(icon);
            } else if (response.weather[0].id >= 502 && response.weather[0].id <= 504) {
                var icon = $("<img>").attr("src", "./Assets/rain.png"); //Rain Icon
                $("#uv").empty();
                $("#uv").append(icon);
            } else if (response.weather[0].id === 800) {
                var icon = $("<img>").attr("src", "./Assets/sun.png"); //Sun Icon 
                $("#uv").empty();
                $("#uv").append(icon);
            } else if (response.weather[0].id === 801 || response.weather[0].id === 802 || response.weather[0].id === 803 || response.weather[0].id === 804) {
                var icon = $("<img>").attr("src", "./Assets/cloud.png"); //Clouds Icon 
                $("#uv").empty();
                $("#uv").append(icon);
            } else if (response.weather[0].id === 600) {
                var icon = $("<img>").attr("src", "./Assets/snow.png"); //Snowflake Icon 
                $("#uv").empty();
                $("#uv").append(icon);
            } else if (response.weather[0].id === 200) {
                var icon = $("<img>").attr("src", "./Assets/storm.png"); //Storm Icon 
                $("#uv").empty();
                $("#uv").append(icon);
            }
        });
    }

    $("#select-city").on("click", function (event) {
        event.preventDefault();
        var city = $("#city-input").val().trim();
        var preSave = localStorage.getItem("city");
        var toSave = preSave + ", " + city
        localStorage.setItem("city", toSave);
        var saveCity = localStorage.getItem("city");
        saveCity = $("<button>").addClass("btn-block btn btn large btn-light")
        saveCity.text(city);
        // $("#buttons").append(saveCity)
        searchCity(city);
        dailyForecast(city)
    });

    //Daily Forecast//
    function dailyForecast(forecast) {
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + forecast + "&appid=b90410cbb9f6bbe669e3f5a1db596f13";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // console.log(response);

            // Icons// console.log(response.list[0].weather[0].id)
            var iconOne = (response.list[1].weather[0].id);
            // $("#icon-1").append(iconOne);
            var iconTwo = (response.list[2].weather[0].id);
            // $("#icon-2").append(iconTwo);
            var iconThree = (response.list[3].weather[0].id);
            // $("#icon-3").append(iconThree);
            var iconFour = (response.list[4].weather[0].id);
            // $("#icon-4").append(iconFour);
            var iconFive = (response.list[5].weather[0].id);
            // $("#icon-5").append(iconFive);

            var icons = [iconOne, iconTwo, iconThree, iconFour, iconFive];

            for (i = 0; i < icons.length; i++) {
                console.log(icons[i])
                if (icons[i] === 800) { //clear sunny day
                    var icon = $("<i>").addClass("fas fa-sun");
                    console.log(icon)
                    var iconNum = "#icon-" + (i + 1)
                    $(iconNum).empty();
                    $(iconNum).append(icon);
                } else if (icons[i] === 801 || icons[i] === 802 || icons[i] === 803 || icons[i] === 804) { //cloudy
                    var icon = $("<i>").addClass("fas fa-cloud-sun");
                    console.log(icon)
                    var iconNum = "#icon-" + (i + 1)
                    $(iconNum).empty();
                    $(iconNum).append(icon);
                } else if (icons[i] === 500) { //rainy
                    var icon = $("<i>").addClass("fas fa-cloud-rain");
                    var iconNum = "#icon-" + (i + 1)
                    $(iconNum).empty();
                    $(iconNum).append(icon);
                } else if (icons[i] >= 502 && icons[i] <= 504) { //heavy rain
                    var icon = $("<i>").addClass("fas fa-cloud-showers-heavy");
                    var iconNum = "#icon-" + (i + 1)
                    $(iconNum).empty();
                    $(iconNum).append(icon);
                } else if (icons[i] === 200) { //storm
                    var icon = $("<i>").addClass("fas fa-bolt");
                    var iconNum = "#icon-" + (i + 1)
                    $(iconNum).empty();
                    $(iconNum).append(icon);
                } else if (icons[i] === 600) {
                    var icon = $("<i>").addClass("fas fa-snowflake");
                    var iconNum = "#icon-" + (i + 1)
                    $(iconNum).empty();
                    $(iconNum).append(icon);
                }
            }

            //Temperature// console.log(response.list[1].main.temp)
            var tempOne = (Math.round(((response.list[1].main.temp - 273.15) * 1.8) + 32) + "°F");
            $("#temp1").empty();
            $("#temp1").append(tempOne);
            var tempTwo = (Math.round(((response.list[2].main.temp - 273.15) * 1.8) + 32) + "°F");
            $("#temp2").empty();
            $("#temp2").append(tempTwo);
            var tempThree = (Math.round(((response.list[3].main.temp - 273.15) * 1.8) + 32) + "°F");
            $("#temp3").empty();
            $("#temp3").append(tempThree);
            var tempFour = (Math.round(((response.list[4].main.temp - 273.15) * 1.8) + 32) + "°F");
            $("#temp4").empty();
            $("#temp4").append(tempFour);
            var tempFive = (Math.round(((response.list[5].main.temp - 273.15) * 1.8) + 32) + "°F");
            $("#temp5").empty();
            $("#temp5").append(tempFive);

            //Humidity// console.log(response.main.humidity);
            var humidOne = (response.list[1].main.humidity + "%")
            $("#humid1").empty();
            $("#humid1").append(humidOne);
            var humidTwo = (response.list[2].main.humidity + "%")
            $("#humid2").empty();
            $("#humid2").append(humidTwo);
            var humidThree = (response.list[3].main.humidity + "%")
            $("#humid3").empty();
            $("#humid3").append(humidThree);
            var humidFour = (response.list[4].main.humidity + "%")
            $("#humid4").empty();
            $("#humid4").append(humidFour);
            var humidFive = (response.list[5].main.humidity + "%")
            $("#humid5").empty();
            $("#humid5").append(humidFive);


            //Date// console.log(response.list[1].dt)
            var dteLooking = moment.unix(response.list[0].dt);
            var length = 6
            var counter = 1
            for (i = 0; i < length; i++) {
                console.log(dteLooking, response.list[i].dt);
                if (moment.unix(response.list[i].dt).format('M/D') === moment.unix(dteLooking).format('M/D')) {
                    length += 1;
                } else {
                    dteLooking = response.list[i].dt;
                    console.log("New, day", moment.unix(response.list[i].dt).format('MMMM Do'))
                    //print value to page
                    var date = ("#date" + counter)
                    var futureWeather = moment.unix(response.list[i].dt).format('M/D')
                    console.log(date)
                    console.log(futureWeather)
                    $(date).empty();
                    $(date).append(futureWeather)
                    counter += 1;
                }
            }
        });
    }

    $(document).on("click", ".btn", function (a) {
        a.preventDefault()
        console.log(a.target.textContent);
        searchCity(a.target.textContent);
        dailyForecast(a.target.textContent)
    })
    pageStart();
})
