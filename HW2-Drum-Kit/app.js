"use strict";

const drumButtons = document.querySelectorAll(".drum");
const recordingStatus = document.querySelector("#recordingStatus");

const startRecordingButton =
    document.querySelector("#startRecording");

const stopRecordingButton =
    document.querySelector("#stopRecording");

const playRecordingButton =
    document.querySelector("#playRecording");

const clearRecordingButton =
    document.querySelector("#clearRecording");


// Audio engine
const audioBuffers = new Map();


// Recording state
let isRecording = false;
let recordingStartTime = 0;

const recordedEvents = [];


// Currently pressed keyboard keys
const pressedKeys = new Set();


// Load one audio file into an AudioBuffer
async function loadSound(soundName) {

    const response = await fetch(
        `sounds/${soundName}.wav`
    );

    if (!response.ok) {
        throw new Error(
            `Could not load sound: ${soundName}`
        );
    }

    const arrayBuffer = await response.arrayBuffer();

    const audioContext =
        new AudioContext();

    const audioBuffer =
        await audioContext.decodeAudioData(
            arrayBuffer
        );

    audioBuffers.set(
        soundName,
        audioBuffer
    );

    await audioContext.close();
}


// Load all drum sounds
async function loadAllSounds() {

    const soundNames = [
        "kick",
        "snare",
        "hihat",
        "clap"
    ];

    try {

        await Promise.all(
            soundNames.map(loadSound)
        );

        recordingStatus.textContent =
            "Sounds loaded. Ready.";

    } catch (error) {

        console.error(error);

        recordingStatus.textContent =
            "Failed to load sounds.";
    }
}


// Play a sound
async function playSound(soundName) {

    const audioBuffer =
        audioBuffers.get(soundName);

    if (!audioBuffer) {
        console.warn(
            `Sound not loaded: ${soundName}`
        );

        return;
    }

    const audioContext =
        new AudioContext();

    const source =
        audioContext.createBufferSource();

    source.buffer = audioBuffer;

    source.connect(
        audioContext.destination
    );

    source.start(0);

    source.addEventListener(
        "ended",
        () => {
            audioContext.close();
        },
        { once: true }
    );
}


// Record a drum event
function recordEvent(soundName) {

    if (!isRecording) {
        return;
    }

    const timestamp =
        performance.now() -
        recordingStartTime;

    recordedEvents.push({
        sound: soundName,
        timestamp
    });
}


// Trigger drum
function triggerDrum(button) {

    if (!button) {
        return;
    }

    const soundName =
        button.dataset.sound;

    if (!soundName) {
        return;
    }

    playSound(soundName);

    recordEvent(soundName);

    button.classList.add("active");

    setTimeout(() => {
        button.classList.remove("active");
    }, 100);
}


// Mouse / touch
drumButtons.forEach((button) => {

    button.addEventListener(
        "click",
        () => {
            triggerDrum(button);
        }
    );

});


// Keyboard
document.addEventListener(
    "keydown",
    (event) => {

        const key =
            event.key.toLowerCase();

        const button =
            document.querySelector(
                `.drum[data-key="${key}"]`
            );

        if (!button) {
            return;
        }


        // Prevent auto-repeat from
        // triggering the drum repeatedly
        if (event.repeat) {
            return;
        }


        // Prevent duplicate keydown events
        if (pressedKeys.has(key)) {
            return;
        }

        pressedKeys.add(key);

        triggerDrum(button);
    }
);


document.addEventListener(
    "keyup",
    (event) => {

        const key =
            event.key.toLowerCase();

        pressedKeys.delete(key);
    }
);


// Start recording
startRecordingButton.addEventListener(
    "click",
    () => {

        recordedEvents.length = 0;

        isRecording = true;

        recordingStartTime =
            performance.now();

        recordingStatus.textContent =
            "Recording...";
    }
);


// Stop recording
stopRecordingButton.addEventListener(
    "click",
    () => {

        isRecording = false;

        recordingStatus.textContent =
            `Recorded ${recordedEvents.length} events.`;
    }
);


// Play recording
playRecordingButton.addEventListener(
    "click",
    () => {

        if (recordedEvents.length === 0) {

            recordingStatus.textContent =
                "No recording available.";

            return;
        }


        recordingStatus.textContent =
            "Playing recording...";


        const events = [
            ...recordedEvents
        ];


        const playbackStart =
            performance.now();


        events.forEach((event) => {

            setTimeout(() => {

                const button =
                    document.querySelector(
                        `.drum[data-sound="${event.sound}"]`
                    );

                triggerDrum(button);

            }, event.timestamp);
        });


        const duration =
            events[events.length - 1].timestamp;


        setTimeout(() => {

            recordingStatus.textContent =
                "Playback finished.";

        }, duration + 100);
    }
);


// Clear recording
clearRecordingButton.addEventListener(
    "click",
    () => {

        recordedEvents.length = 0;

        isRecording = false;

        recordingStatus.textContent =
            "Recording cleared.";
    }
);


// Load sounds when page starts
loadAllSounds();