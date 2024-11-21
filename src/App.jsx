import React, { useState, useEffect, useRef } from "react";
import "./App.css";
const images = [
  "../foto1.jpg",
  "../foto2.jpg",
  "../foto3.jpg",
  "../foto4.jpg",
  "../foto5.jpg",
];
function App() {
  const [isPlaying, setIsPlaying] = useState(false); 
  const audioRef = useRef(null); 

  const handlePlayMusic = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.play();
      setIsPlaying(true); 
    }
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {

    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(imageInterval); 
  }, []);

  const calculateTimeLeft = () => {
    const eventDate = new Date("2024-11-23T15:00:00");
    const currentTime = new Date();
    const difference = eventDate - currentTime;

    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="invitation">
      <h1 className="greeting">Invitación</h1>
      {!isPlaying && (
        <button onClick={handlePlayMusic} className="play-button">
           
        </button>
      )}

      <audio ref={audioRef} preload="auto">
        <source src="../cancion.mp3" type="audio/mpeg" />
        Tu navegador no soporta el elemento de audio.
      </audio>
      <div className="slider">
        <img
          className="photo fade"
          src={images[currentImageIndex]}
          alt="Pareja"
        />
      </div>
      <h2>
      Tenemos el gusto de invitarte a nuestra boda civil que se llevará a cabo el día miércoles 18 de septiembre del 2024, a las 15H00 en el Registro Civil de la ciudad de Latacunga.
      </h2>

      <div className="countdown">
        <div className="time">
          <span>{timeLeft.days}</span>
          <p>Días</p>
        </div>
        <div className="time">
          <span>{timeLeft.hours}</span>
          <p>Horas</p>
        </div>
        <div className="time">
          <span>{timeLeft.minutes}</span>
          <p>Minutos</p>
        </div>
        <div className="time">
          <span>{timeLeft.seconds}</span>
          <p>Segundos</p>
        </div>
      </div>

      <div className="links">
        <a
          href="https://maps.app.goo.gl/xcWx6jMSEJryfDqz9"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ubicación de Registro Civil
        </a>
        <a
          href="https://maps.app.goo.gl/SBnP862b3PLvwKvE8"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ubicación de la Recepción
        </a>
      </div>
    </div>
  );
}

export default App;
