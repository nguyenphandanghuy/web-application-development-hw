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

    submitButton.disabled = false;

    break;


        case "submitting":

    formStatus.textContent =
        "Submitting...";

    submitButton.textContent =
        "Submitting...";

    submitButton.disabled = true;

    break;


        case "success":

    formStatus.textContent =
        "Registration successful.";

    submitButton.textContent =
        "Registered";

    submitButton.disabled = true;

    break;


        case "error":

    formStatus.textContent =
        "Registration failed. Please try again.";

    submitButton.textContent =
        "Register";

    submitButton.disabled = false;

    break;
    }
}


// Initial state
setFormState("idle");


eventForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();


        // Prevent double-submit while submitting.
        if (formState === "submitting") {
            return;
        }


        const nameInput =
            document.querySelector("#name");

        const emailInput =
            document.querySelector("#email");


        const name =
            nameInput.value.trim();

        const email =
            emailInput.value.trim();


        // Basic input validation.
        if (
            name.length < 2 ||
            name.length > 50
        ) {

            setFormState("error");

            formStatus.textContent =
                "Please enter a valid name.";

            nameInput.focus();

            return;
        }


        // Basic email validation.
        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(email)) {

            setFormState("error");

            formStatus.textContent =
                "Please enter a valid email.";

            emailInput.focus();

            return;
        }


        // Reject HTML-like input.
        if (
            /<|>/.test(name) ||
            /<|>/.test(email)
        ) {

            setFormState("error");

            formStatus.textContent =
                "HTML characters are not allowed.";

            return;
        }


        setFormState("submitting");


        // Simulated server request.
        setTimeout(() => {

            // Test error state.
            if (email.endsWith("@error.test")) {

                setFormState("error");

                return;
            }


            setFormState("success");

        }, 1000);
    }
);