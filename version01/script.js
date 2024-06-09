document.addEventListener("DOMContentLoaded", function() {
    var countdownHolder = document.getElementById("countdown-holder");
    var startButton     = document.getElementById("start-btn");
    var stopButton      = document.getElementById("stop-btn");
    var decreaseButton  = document.getElementById("decrease-btn");
    var resetButton     = document.getElementById("reset-btn");
    var increaseButton  = document.getElementById("increase-btn");

    countdownHolder.innerHTML = "0";

    increaseButton.addEventListener("click", function(){
        countdownHolder.innerHTML = +countdownHolder.textContent + 1;
    });

    decreaseButton.addEventListener("click", function(){
        if (!(countdownHolder.textContent <= 0)) {
            countdownHolder.innerHTML = +countdownHolder.textContent - 1;
        }
    });

    resetButton.addEventListener("click", function(){
        countdownHolder.innerHTML = "0";
    });

    startButton.addEventListener("click", function(){
        var countDown = setInterval(() => {
            if (!(countdownHolder.textContent <= 0)) {
                countdownHolder.innerHTML = +countdownHolder.textContent - 1;
            }
        }, 1000);
        stopButton.addEventListener("click", function(){
            clearInterval(countDown);
        });
    });

    resetButton.addEventListener("click", function(){
        countdownHolder.innerHTML = "0";
    });


    stopButton.addEventListener("mouseover", function() {
        if (+countdownHolder.textContent === 0) {
            stopButton.style.cursor = "not-allowed";
        } else {
            stopButton.style.cursor = "initial";
        }
    });
    

});