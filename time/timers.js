fetch("time/timers.json")
    .then((response) => response.json())
    .then((data) => startTimers(data));

function startTimers(data) {
    var timers = document.getElementsByClassName("Timer");
    for (var i = 0; i < timers.length; i++) {
        var id = timers[i].parentElement.parentElement.id;
        var event = data["events"].find((e) => e.name === id);
        if (event) {
            startCD(timers[i], new Date(event.time).getTime());
        }
    }
}

function startCD(timerElement, releaseDate) {
    var dayNode = document.createElement("div");
    dayNode.setAttribute("id", "day");
    var hourNode = document.createElement("div");
    hourNode.setAttribute("id", "hour");
    var minuteNode = document.createElement("div");
    minuteNode.setAttribute("id", "minute");
    var secondNode = document.createElement("div");
    secondNode.setAttribute("id", "second");

    timerElement.appendChild(dayNode);
    timerElement.appendChild(hourNode);
    timerElement.appendChild(minuteNode);
    timerElement.appendChild(secondNode);

    setInterval(function () {
        var now = new Date().getTime();
        var diff;
        var countdown = false;

        if (now > releaseDate) {
            diff = now - releaseDate;
        } else {
            diff = releaseDate - now;
            countdown = true;
        }

        var days = Math.floor(diff / (1000 * 60 * 60 * 24));
        var hours = Math.floor(
            (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((diff % (1000 * 60)) / 1000);

        dayNode.innerHTML = days;
        hourNode.innerHTML = hours;
        minuteNode.innerHTML = minutes;
        secondNode.innerHTML = seconds;
    }, 1000);
}

var newOrder = [];
window.onload = (event) => {
    setTimeout(() => {
        var body = Array.from(document.body.children);
        body.forEach((element) => {
            if (element.classList.contains("row")) {
                var timerObj =
                    element.children[0].getElementsByClassName("Timer")[0];
                newOrder.push({
                    day: parseInt(timerObj.children[0].innerHTML),
                    html: element,
                });
            }
        });

        newOrder.sort((a, b) => a.day - b.day);

        body.innerHTML = "";
        newOrder.forEach((element) => {
            document.body.appendChild(element.html);
        });
    }, 1000);
};
