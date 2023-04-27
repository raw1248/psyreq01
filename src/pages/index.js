import React, { useRef, useState } from "react";
import axios from "axios";

const soundPath = "/PMR_7_no_arms.mp3";
const samplePath = "/sample_audio.mp3";
// const soundPath = "/freesound.mp3";
const palettes = ["black", "#323E45", "#3A4E51", "#5A786F", "#8BA88E", "#CCD2C6", "white"];

export default function Home() {
  const [play, setPlay] = useState(false);
  const [btnText, setBtnText] = useState("Play");
  const [samplePlay, setSamplePlay] = useState(false);
  const [sampleBtnText, setSampleBtnText] = useState("PLAY SAMPLE");
  const soundRef = useRef(null);
  const sampleRef = useRef(null);

  function markTime() {
    axios.get("https://script.google.com/macros/s/AKfycbwN8HU26QZekCC6M0riOwJEotnDWhrieyVQvEj4DIpw8KtID7H-vHkiva_FCCKSlozm/exec")
      .then(() => {
        console.log('marked');
      })
      .catch(() => {
        console.log('mark failed');
      });
  }

  function manageAudio() {
    console.log('currentTime :>> ', soundRef.current?.currentTime);
    if (play) {
      soundRef.current?.pause();
      setPlay(false);
      setBtnText("Play");
    } else {
      if (btnText == "Play") {
        if (soundRef.current.currentTime == 0) {
          markTime();
        }
        soundRef.current?.play();
        setPlay(true);
        setBtnText("Pause");
      }
      else if (btnText == "Done") {
        markTime();
        setBtnText("Play");
      }
    }
  }

  function manageSample() {
    console.log('currentTime :>> ', sampleRef.current?.currentTime);
    if (samplePlay) {
      sampleRef.current?.pause();
      setSamplePlay(false);
      setSampleBtnText("PLAY SAMPLE");
    } else {
      sampleRef.current?.play();
      setSamplePlay(true);
      setSampleBtnText("PAUSE SAMPLE");
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24" style={{ backgroundColor: palettes[5], color: palettes[0] }}>
      <button onClick={manageSample} className="rounded-full w-48 p-2 absolute top-5 left-5" style={{ backgroundColor: palettes[4], color: palettes[5] }}>
        {sampleBtnText}
      </button>
      <audio ref={sampleRef} loop src={samplePath} />
      <button
        onClick={manageAudio}
        type="button"
        className="m-auto w-72 rounded-full p-16 shadow-sm"
        style={{ backgroundColor: palettes[3], color: palettes[5], fontSize: 36 }}
      >
        {btnText}
      </button>
      <audio ref={soundRef} src={soundPath} onEnded={() => {
        soundRef.current?.pause();
        soundRef.current.currentTime = 0;
        setBtnText("Done");
        setPlay(false);
      }} />
      <button onClick={() => {
        soundRef.current?.pause();
        soundRef.current.currentTime = 0;
        setBtnText("Play");
        setPlay(false);
      }} className="absolute bottom-5 right-5">reset</button>
    </main>
  );
}
