import React, { useState, useEffect } from 'react';
import './App.css'

function App() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const calculateTimeLeft = () => {
    const eventDate = new Date('2024-09-18T14:45:00'); 
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
      <img className="photo" src="../foto.jpg" alt="Pareja" />
      <h2>Tenemos el gusto de invitarte a nuestra boda civil que se llevara a cabo el día míercoles 18 de septiembre del 2024, a las 15H00 en el Registro Civil de la ciudad de Latacunga.</h2>

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
        <a href="https://maps.app.goo.gl/xcWx6jMSEJryfDqz9" target="_blank" rel="noopener noreferrer">
          Ubicación de Registro Civil
        </a>
        <a href="https://maps.app.goo.gl/SBnP862b3PLvwKvE8" target="_blank" rel="noopener noreferrer">
          Ubicación de la Recepción
        </a>
      </div>
    </div>
  );
};

export default App
