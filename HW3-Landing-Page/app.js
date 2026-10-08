"use strict";

const countdownElement =
    document.querySelector("#countdown");

const eventTimeElement =
    document.querySelector("#event-time");


// Fixed event time in UTC.
// ISO 8601 format.
const targetTime =
    "2026-12-31T12:00:00Z";


const targetTimestamp =
    Date.parse(targetTime);


eventTimeElement.textContent =
    targetTime;


function updateCountdown() {

    const remaining =
        targetTimestamp - Date.now();


    if (remaining <= 0) {

        countdownElement.textContent =
            "Event has started.";

        return;
    }


    const totalSeconds =
        Math.floor(remaining / 1000);


    const days =
        Math.floor(
            totalSeconds / 86400
        );


    const hours =
        Math.floor(
            (totalSeconds % 86400) / 3600
        );


    const minutes =
        Math.floor(
            (totalSeconds % 3600) / 60
        );


    const seconds =
        totalSeconds % 60;


    countdownElement.textContent =
        `${days}d ${hours}h ${minutes}m ${seconds}s`;
}


updateCountdown();


setInterval(
    updateCountdown,
    1000
);