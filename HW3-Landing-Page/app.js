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
// ========================================
// SLICE 2: FORM STATE MACHINE
// ========================================

const eventForm =
    document.querySelector("#event-form");

const formStatus =
    document.querySelector("#form-status");

const submitButton =
    document.querySelector("#submit-button");


// Possible states:
// idle -> submitting -> success
//                  -> error
let formState = "idle";


function setFormState(newState) {

    formState = newState;


    switch (formState) {

        case "idle":

            formStatus.textContent =
                "Ready to submit.";

            submitButton.textContent =
                "Register";

            break;


        case "submitting":

            formStatus.textContent =
                "Submitting...";

            submitButton.textContent =
                "Submitting...";

            break;


        case "success":

            formStatus.textContent =
                "Registration successful.";

            submitButton.textContent =
                "Registered";

            break;


        case "error":

            formStatus.textContent =
                "Registration failed. Please try again.";

            submitButton.textContent =
                "Register";

            break;
    }
}


// Initial state
setFormState("idle");


eventForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();


        setFormState("submitting");


        // Simulated server request
        setTimeout(() => {

            const email =
                document.querySelector("#email").value;


            // Test error state with:
            // test@error.test
            if (email.endsWith("@error.test")) {

                setFormState("error");

                return;
            }


            setFormState("success");

        }, 1000);
    }
);