// I added { useState } so hook could be used (sololearn)
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

//Start code here
const bank = [
  {
    message: "Heater-1",
    keyTrigger: "Q",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    message: "Heater-2",
    keyTrigger: "W",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    message: "Heater-3",
    keyTrigger: "E",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    message: "Heater-4",
    keyTrigger: "A",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    message: "Clap",
    keyTrigger: "S",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    message: "Open-HH",
    keyTrigger: "D",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    message: "Kick-n'-Hat",
    keyTrigger: "Z",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    message: "Kick",
    keyTrigger: "X",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    message: "Closed-HH",
    keyTrigger: "C",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

// Sounds are found on this site https://www.findsounds.com
// Don't have to change keyTrigger letters from bank, but wanted to so it is obvious for user that sounds are going to change
const bank2 = [
  {
    message: "Dog",
    keyTrigger: "R",
    url: "http://ring-nature.com/tones/barking-dog.mp3",
  },
  {
    message: "Cow",
    keyTrigger: "T",
    url: "http://www.teachinghearts.org/dr0scow.wav",
  },
  {
    message: "Pig",
    keyTrigger: "Y",
    url:
      "http://www.vertigogaming.org/downloads/svencoop/sound/sc_psyko/pig.wav",
  },
  {
    message: "Elephant",
    keyTrigger: "F",
    url: "https://www.elemotion.org/wp-content/uploads/2011/09/trumpet41.mp3",
  },
  {
    message: "Monkey",
    keyTrigger: "G",
    url: "http://thestablesbb.powweb.com/WAV%20FILES/Nature%20CritStop.wav",
  },
  {
    message: "Lion",
    keyTrigger: "H",
    url: "http://www.slspencer.com/Sounds/Various/MGMlion.wav",
  },
  {
    message: "Raven",
    keyTrigger: "V",
    url:
      "http://omarshauntedtrail.com/MP3s/Sound%20Files%20collected/R/Ravan.wav",
  },
  {
    message: "Orca Whale",
    keyTrigger: "B",
    url:
      "http://dight310.byu.edu/media/audio/FreeLoops.com/5/5/Orca.wav-9078-Free-Loops.com.mp3",
  },
  {
    message: "Cricket",
    keyTrigger: "N",
    url: "http://web.tiscali.it/gherda-wolit/versi/grilli.wav",
  },
];

// All list items going through map or filter should have key in react (not sure why)
function DrumPad() {
  const [message, setMessage] = useState(" "); //Set initial state for message
  const [sliderVal, setSliderVal] = useState(0.3); // set initial state for volume slider
  const [bankChoice, setBankChoice] = useState(true); // set initial state for bankChoice

  useEffect(() => {
    // Must use useEffect to addEventListener (same as componentDidMount for hooks...)
    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  });

  /* While mapping through the onClick must receive a parameter that is an the Object that is 
  called on during the array. Map goes through all of the objects individually in array bank. Then
  in playSound function we call the objectt and know what sound to play with getElementById and use
  .keyTrigger for sound. For displaying of a message we simply use .message for that specific object's message. */

  const bankTable = bank.map((item) => (
    <div
      id={item.message} // id needs to be message so it's not the same as id of audio.
      key={item.keyTrigger}
      className="drum-pad"
      onClick={(drumObj) => playSound(item)}
    >
      {/*Displays the item's keyTrigget (The letter in middle of pads)*/}
      {item.keyTrigger}
      <audio className="clip" id={item.keyTrigger} src={item.url}></audio>
    </div>
  ));

  const bankTable2 = bank2.map((item) => (
    <div
      id={item.message} // id needs to be message so it's not the same as id of audio.
      key={item.keyTrigger}
      className="drum-pad"
      onClick={(drumObj) => playSound(item)}
    >
      {/*Displays the item's keyTrigget (The letter in middle of pads)*/}
      {item.keyTrigger}
      <audio className="clip" id={item.keyTrigger} src={item.url}></audio>
    </div>
  ));

  function playSound(bankObject) {
    // Call sound based of the object
    const sound = document.getElementById(bankObject.keyTrigger);
    sound.volume = sliderVal; // Sets volume to the sliderVal state (don't need brackets or parenthesis as you are just setting it equal to a number)
    sound.currentTime = 0; // Indicates the position for the playback of the audio/video, in seconds
    sound.play(); // Plays the sound.
    setMessage(bankObject.message); // Changes message state

    // Styling the specific pad for .5 second once it is clicked.
    const colorChange = document.getElementById(bankObject.message); // The id for the div is bank is item.message... So can't use sound as that is id for audio
    colorChange.style.background = "blue"; // Changes background of drum pad with specific i
    setTimeout(() => (colorChange.style.background = "#808080"), 500); // Changes the background back to normal after .5 seconds
  }

  function handleKeyPress(e) {
    /* e.key is always given when the addEventListener("keyPress") is in useEffect. e.key is equal to the button pressed.
       We use .upperCase() because all trigger letterss are upper case in bank array.
       Then I decided to use a basic for looop to see if the key that is pressed is in the bank array.
       If it is equal to one of the keyTriggers of the array we take that object in the array and use the playSound
       function with that object as the parameter.*/
    if (bankChoice) {
      /*added the if statement because I added a second bank. Now if bankChoice state is true we loop through bank 1 and if bankChoice state is false
      we loop through bank 2 */
      for (let i = 0; i < bank.length; i++)
        if (e.key.toUpperCase() === bank[i].keyTrigger) {
          playSound(bank[i]);
        }
    } else {
      for (let i = 0; i < bank.length; i++)
        if (e.key.toUpperCase() === bank2[i].keyTrigger) {
          playSound(bank2[i]);
        }
    }
    /* Another way of solving the handleKeyPress() function is to use the following code as it is more efficient because
         it will stop iterating once it finds the match
            const key = e.key.toUpperCase();
            const pressedBank = bank.find(k => k.keyTrigger === key);
            playSound(pressedBank); */
  }

  // Volume slider section

  function volumeChange(e) {
    setSliderVal(e.target.value); // Changes state of sliderVal to what user changes it to.
    setMessage("Volume:" + Math.round(e.target.value * 100)); // Changes display message to volume number
    setTimeout(() => clearDisplay(), 3000); // Clears volume message after 1.5 seconds
  }

  function clearDisplay() {
    setMessage(" "); // Clears display message after volume changes.
  }

  // Bank Button section

  function handleBankClick() {
    // if bankChoice is true float the slider right and if false float left
    if (bankChoice) {
      document.getElementById("bank-slider").style.float = "right";
      setMessage("Animal kit"); // Changes display message when bank is clicked
    } else {
      document.getElementById("bank-slider").style.float = "left";
      setMessage("Drum kit"); // Changes display message when bank is clicked
    }
    setBankChoice(!bankChoice); // Changes the bankChoice state to opposite boolean (if true changes to false and if false changes to true)
  }

  return (
    <div>
      {/* To choose which bank to use we use a ternerary statement inside div with id="drum-pad-container". If bankChoice state is true
          I return bank that has been mapped in variable bankTable and if false I return bank2 that has been mapped in variable bankTable2 */}
      <div id="drum-pad-container">
        {bankChoice ? <div>{bankTable}</div> : <div>{bankTable2}</div>}
      </div>

      <div id="button-display-volume-container">
        {/* display message state */}
        <div id="display">{message}</div>

        {/* volume slider that is updated onChange and value is set to sliderVal state*/}
        <input
          id="volume"
          type="range" // sets input as a range with a slider
          min="0"
          max="1"
          step=".01" // 100 steps in the slider because min="0" and max="1"
          value={sliderVal} // set in state.
          onChange={volumeChange} // Changes sliderVal state every time it changes as well as message in display
        ></input>

        <h5 id="bank-header">Bank</h5>
        {/* created bank slider button that is handled onClick */}
        <div id="bank-slider-container" onClick={handleBankClick}>
          <div id="bank-slider"></div>
        </div>
      </div>
    </div>
  );
}

function DrumMachine() {
  return (
    <div id="drum-machine">
      <h1 id="header"> Drum Machine (React)</h1>
      <DrumPad />
    </div>
  );
}

ReactDOM.render(<DrumMachine />, document.getElementById("root"));
