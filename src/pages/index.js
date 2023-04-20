import React, { useRef, useState } from "react";
import axios from "axios";

const soundPath = "/PMR_5_v2.mp3";
// const soundPath = "/freesound.mp3";
const palettes = ["black", "#323E45", "#3A4E51", "#5A786F", "#8BA88E", "#CCD2C6", "white"];

export default function Home() {
  const [play, setPlay] = useState(false);
  const [btnText, setBtnText] = useState("Play");
  const soundRef = useRef(null);

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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24" style={{ backgroundColor: palettes[5], color: palettes[0] }}>
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
