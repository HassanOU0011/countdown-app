document.addEventListener("DOMContentLoaded", function() {

    /* Main Variable */
    var container = document.getElementById("container");
    /* Time Variables */
    var hours     = container.querySelector("#hours");
        var increaseHoursBtn   = document.getElementById("increase-hours-button");
        var decreaseHoursBtn   = document.getElementById("decrease-hours-button");
    var minutes   = container.querySelector("#minutes");
        var increaseMinutesBtn = document.getElementById("increase-minutes-button");
        var decreaseMinutesBtn = document.getElementById("decrease-minutes-button");
    var seconds   = container.querySelector("#seconds");
        var increaseSecondsBtn = document.getElementById("increase-seconds-button");
        var decreaseSecondsBtn = document.getElementById("decrease-seconds-button");
    /* Control Process Buttons */
    var startBtn  = container.querySelector("#start");
    var stopBtn   = container.querySelector("#stop");
    var resetBtn   = container.querySelector("#reset");


    function increment(field) {
        return String(+field.textContent + 1).padStart(2, "0");
    }
    
    function decrement(field) {
        return String(+field.textContent - 1).padStart(2, "0");
    }




    /* For Hours */
    increaseHoursBtn.addEventListener("click", function() {
        if (increment(hours) <= 60) {
            hours.innerHTML = increment(hours);
        }
    });
    decreaseHoursBtn.addEventListener("click", function() {
        if (decrement(hours) >= 0) {
            hours.innerHTML = decrement(hours);
        }
    });

    /* For Minutes */
    increaseMinutesBtn.addEventListener("click", function() {
        if (increment(minutes) <= 60) {
            minutes.innerHTML = increment(minutes);
        } else {
            hours.innerHTML = increment(hours);
            minutes.innerHTML = "00";
        }
    });
    decreaseMinutesBtn.addEventListener("click", function() {
        if (decrement(minutes) >= 0) {
            minutes.innerHTML = decrement(minutes);
        }
    });

    /* For Seconds */
    increaseSecondsBtn.addEventListener("click", function() {
        if (increment(seconds) <= 60) {
            seconds.innerHTML = increment(seconds);
        } else {
            minutes.innerHTML = increment(minutes);
            seconds.innerHTML = "00";
        }
    });
    decreaseSecondsBtn.addEventListener("click", function() {
        if (decrement(seconds) >= 0) {
            seconds.innerHTML = decrement(seconds);
        }
    });

    
    startBtn.addEventListener("click", function() {
        var timeLeft    = null;
        var hoursLeft   = null;
        var minutesLeft = null;
        var secondsLeft = null;
        var countDown = setInterval(() => {
            var time = +hours.textContent * 3600 + +minutes.textContent * 60 + +seconds.textContent;
            timeLeft = time - 1;
            hoursLeft   = Math.floor(timeLeft / 3600);
            minutesLeft = Math.floor((timeLeft - hoursLeft * 3600) / 60);
            secondsLeft = Math.floor(timeLeft - hoursLeft * 3600 - minutesLeft * 60);
            hours.innerHTML   = String(hoursLeft).padStart(2, "0");
            minutes.innerHTML = String(minutesLeft).padStart(2, "0");
            seconds.innerHTML = String(secondsLeft).padStart(2, "0");
            localStorage.setItem("hours", hoursLeft);
            localStorage.setItem("minutes", minutesLeft);
            localStorage.setItem("seconds", secondsLeft);
        }, 1000);
        stopBtn.addEventListener("click", function(){
            clearInterval(countDown);
        });
    });

    resetBtn.addEventListener("click", function(){
        hours.innerHTML = "00";
        minutes.innerHTML = "00";
        seconds.innerHTML = "00";
    });

    if (localStorage.getItem("hours") && localStorage.getItem("minutes") && localStorage.getItem("seconds")) {
        hours.innerHTML   = String(localStorage.getItem("hours")).padStart(2, "0");
        minutes.innerHTML = String(localStorage.getItem("minutes")).padStart(2, "0");
        seconds.innerHTML = String(localStorage.getItem("seconds")).padStart(2, "0");
    }


});