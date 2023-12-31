const shortPiano = document.getElementById('shortPiano');
const longPiano = document.getElementById('longPiano');
const pianoCheckbox = document.getElementById('piano-checkbox');
pianoCheckbox.addEventListener('change', function() {
    if (this.checked) {
        shortPiano.style.display = 'none';
        longPiano.style.display = 'block';
    } else {
        shortPiano.style.display = 'block';
        longPiano.style.display = 'none';
    }
});

const pianoKeys = document.querySelectorAll(".piano-keys .key"),
volumeSlider = document.querySelector(".volume-slider input"),
keysCheckbox = document.querySelector(".keys-checkbox input");
let allKeys = [],
audio = new Audio(`tunes/C4.mp3`); // by default, audio src is C4 tune
const playTune = (key) => {
    audio.src = `tunes/${key}.mp3`; // passing audio src based on key pressed 
    audio.play(); // playing audio
    const clickedKeys = document.querySelectorAll(`[data-key="${key}"]`); // getting all matching key elements
    clickedKeys.forEach(clickedKey => {
        clickedKey.classList.add("active"); // adding active class to the clicked key element
        setTimeout(() => { // removing active class after 150 ms from the clicked key element
            clickedKey.classList.remove("active");
        }, 150);
    });
}
pianoKeys.forEach(key => {
    allKeys.push(key.dataset.key); // adding data-key value to the allKeys array
    // calling playTune function with passing data-key value as an argument
    key.addEventListener("click", () => playTune(key.dataset.key));
});
const handleVolume = (e) => {
    audio.volume = e.target.value; // passing the range slider value as an audio volume
}
const showHideKeys = () => {
    // toggling hide class from each key on the checkbox click
    pianoKeys.forEach(key => key.classList.toggle("hide"));
}
const pressedKey = (e) => {
    // if the pressed key is in the allKeys array, only call the playTune function
    if(allKeys.includes(e.key)) playTune(e.key);
} 
keysCheckbox.addEventListener("click", showHideKeys);
volumeSlider.addEventListener("input", handleVolume);
document.addEventListener("keydown", pressedKey);