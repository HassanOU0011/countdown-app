document.addEventListener("DOMContentLoaded", function() {
    var container    = document.getElementById("container");
        var hoursControl = container.querySelector("#hours-control");
            var hours = hoursControl.querySelector(".time-field");
        var minutesControl = container.querySelector("#minutes-control");
            var minutes = minutesControl.querySelector(".time-field");
        var secondsControl = container.querySelector("#seconds-control");
            var seconds = secondsControl.querySelector(".time-field");
    var resetBtn = container.querySelector("#reset-button");
    resetBtn.addEventListener("click", function() {
        [hoursControl, minutesControl, secondsControl].forEach(timeFieldControl => {
            timeFieldControl.querySelector(".time-field").innerHTML = "00";
        });
        localStorage.setItem("hours",   0);
        localStorage.setItem("minutes", 0);
        localStorage.setItem("seconds", 0);
    });


    if (localStorage.getItem("hours") !== null) {
        hours.innerHTML = localStorage.getItem("hours").padStart(2, "0");
    } else {
        hours.innerHTML = "00";
        localStorage.setItem("hours", 0);
    }

    if (localStorage.getItem("minutes") !== null) {
        minutes.innerHTML = localStorage.getItem("minutes").padStart(2, "0");
    } else {
        minutes.innerHTML = "00";
        localStorage.setItem("minutes", 0);
    }

    if (localStorage.getItem("seconds") !== null) {
        seconds.innerHTML = localStorage.getItem("seconds").padStart(2, "0");
    } else {
        seconds.innerHTML = "00";
        localStorage.setItem("seconds", 0);
    }

    var increaseButtons = container.querySelectorAll(".increase-button");
    increaseButtons.forEach(increaseButton => {
        increaseButton.addEventListener("mousedown", function() {
            if (increaseButton.nextElementSibling.textContent <= 59) {
                var temp = setInterval(() => {
                    if (increaseButton.nextElementSibling.textContent <= 59) {
                        increaseButton.nextElementSibling.innerHTML = 
                        String(+increaseButton.nextElementSibling.textContent + 1).padStart(2, "0");
                        if (increaseButton.id == "increase-hours-button") {
                            localStorage.setItem("hours", +localStorage.getItem("hours") + 1);
                        } else if (increaseButton.id == "increase-minutes-button") {
                            localStorage.setItem("minutes", +localStorage.getItem("minutes") + 1);
                        } else {
                            localStorage.setItem("seconds", +localStorage.getItem("seconds") + 1);
                        }
                    }
                }, 100);
                increaseButton.addEventListener("mouseup", function() {
                    clearInterval(temp);
                });
            }
        });
        increaseButton.addEventListener("click", function() {
            if (increaseButton.nextElementSibling.textContent <= 59) {
                increaseButton.nextElementSibling.innerHTML = 
                String(+increaseButton.nextElementSibling.textContent + 1).padStart(2, "0");
                if (increaseButton.id == "increase-hours-button") {
                    localStorage.setItem("hours", +localStorage.getItem("hours") + 1);
                } else if (increaseButton.id == "increase-minutes-button") {
                    localStorage.setItem("minutes", +localStorage.getItem("minutes") + 1);
                } else {
                    localStorage.setItem("seconds", +localStorage.getItem("seconds") + 1);
                }
            }
        });
    });

    var decreaseButtons = container.querySelectorAll(".decrease-button");
    decreaseButtons.forEach(decreaseButton => {
        decreaseButton.addEventListener("mousedown", function() {
            if (decreaseButton.previousElementSibling.textContent > 0) {
                var temp = setInterval(() => {
                    if (decreaseButton.previousElementSibling.textContent > 0) {
                        decreaseButton.previousElementSibling.innerHTML = 
                        String(+decreaseButton.previousElementSibling.textContent - 1).padStart(2, "0");
                        if (decreaseButton.id == "decrease-hours-button") {
                            localStorage.setItem("hours", +localStorage.getItem("hours") - 1);
                        } else if (decreaseButton.id == "decrease-hours-button") {
                            localStorage.setItem("minutes", +localStorage.getItem("minutes") - 1);
                        } else {
                            localStorage.setItem("seconds", +localStorage.getItem("seconds") - 1);
                        }
                    }
                }, 100);
                decreaseButton.addEventListener("mouseup", function() {
                    clearInterval(temp);
                });
            }
        });
        decreaseButton.addEventListener("click", function() {
            if (decreaseButton.previousElementSibling.textContent > 0) {
                decreaseButton.previousElementSibling.innerHTML = 
                String(+decreaseButton.previousElementSibling.textContent - 1).padStart(2, "0");
                if (decreaseButton.id == "decrease-hours-button") {
                    localStorage.setItem("hours", +localStorage.getItem("hours") - 1);
                } else if (decreaseButton.id == "decrease-hours-button") {
                    localStorage.setItem("minutes", +localStorage.getItem("minutes") - 1);
                } else {
                    localStorage.setItem("seconds", +localStorage.getItem("seconds") - 1);
                }
            }
        });
    });


    var startBtn = container.querySelector("#start-button");
    var stopBtn  = container.querySelector("#stop-button");
    startBtn.addEventListener("click", function() {
        setTimeout(() => {
            [...increaseButtons, ...decreaseButtons, startBtn].forEach(button => {
                button.style.cursor = "not-allowed"; 
            });
        }, 1000);
        var currentTime, timeLeft, hoursLeft, minutesLeft, secondsLeft = null;
        var countDown = setInterval(() => {
            currentTime = 
            +hoursControl.querySelector(".time-field").textContent   * 3600 + 
            +minutesControl.querySelector(".time-field").textContent *  60  + 
            +secondsControl.querySelector(".time-field").textContent;
            if (currentTime === 0) {
                clearInterval(countDown);
                [...increaseButtons, ...decreaseButtons, startBtn, resetBtn].forEach(button => {
                    button.style.cursor = "pointer"; 
                });
            } else {
                timeLeft    = currentTime - 1;
                hoursLeft   = Math.floor(timeLeft / 3600);
                minutesLeft = Math.floor((timeLeft - hoursLeft * 3600) / 60);
                secondsLeft = Math.floor(timeLeft - hoursLeft * 3600 - minutesLeft * 60);
                localStorage.setItem("hours", hoursLeft);
                localStorage.setItem("minutes", minutesLeft);
                localStorage.setItem("seconds", secondsLeft);
                var padedHours   = String(hoursLeft).padStart(2, "0");
                var padedMinutes = String(minutesLeft).padStart(2, "0");
                var padedSeconds = String(secondsLeft).padStart(2, "0");
                hoursControl.querySelector(".time-field").innerHTML   = padedHours;
                minutesControl.querySelector(".time-field").innerHTML = padedMinutes;
                secondsControl.querySelector(".time-field").innerHTML = padedSeconds;
                document.title = `${padedHours}:${padedMinutes}:${padedSeconds} | Countdown`;
            }
        }, 1000);
        stopBtn.addEventListener("click", function(){
            clearInterval(countDown);
            [...increaseButtons, ...decreaseButtons, startBtn, resetBtn].forEach(button => {
                button.style.cursor = "pointer"; 
            });
        });
    });


});