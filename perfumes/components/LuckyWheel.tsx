import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Prize, LuckyWheelData } from '../types';
import { luckyWheel as staticData } from '../data'; // Importamos datos estáticos
import { fetchLuckyWheel } from '../api-client';
import './LuckyWheel.css';

// Definimos las props que App.tsx está enviando
interface Props {
  onPrizeClaimed: (prize: Prize) => void;
}

const LuckyWheel: React.FC<Props> = ({ onPrizeClaimed }) => {
  // Inicializamos directamente con los datos estáticos
  const [data, setData] = useState<LuckyWheelData | null>(staticData);
  const [show, setShow] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<Prize | null>(null);
  const [rotation, setRotation] = useState(0);
  const [spinsDone, setSpinsDone] = useState(0);

  const maxSpins = useMemo(() => (data ? parseInt(data.settings.spins_per_user, 10) : 1) || 1, [data]);

  useEffect(() => {
    const loadData = async () => {
      if (sessionStorage.getItem('wheelClosed')) {
        setShow(false);
        return;
      }
      
      let currentData = data;
      try {
        // Intentamos obtener la configuración más reciente del servidor
        const serverData = await fetchLuckyWheel();
        if (serverData) {
          currentData = serverData;
          setData(serverData);
        }
      } catch (e) {
        console.warn("Usando configuración local de la rueda");
      }

      if (!currentData || !currentData.prizes || currentData.prizes.length === 0 || currentData.settings.is_active !== '1') {
        return;
      }

      const spinStateStr = localStorage.getItem('luckyWheelState');
      const hours = currentData.settings.duration_hours ? parseFloat(currentData.settings.duration_hours) : 24;
      const period = hours * 60 * 60 * 1000;

      if (spinStateStr) {
        const spinState = JSON.parse(spinStateStr);
        if (Date.now() - spinState.timestamp > period) {
          localStorage.removeItem('luckyWheelState');
          setSpinsDone(0);
          setTimeout(() => setShow(true), 2000);
        } else {
          setSpinsDone(spinState.count || 0);
          if ((spinState.count || 0) >= maxSpins) {
            setShow(false);
          } else {
            setTimeout(() => setShow(true), 2000);
          }
        }
      } else {
        setSpinsDone(0);
        setTimeout(() => setShow(true), 2000);
      }
    };

    loadData();
  }, []);

  const handleSpin = () => {
    if (spinning || !data) return;

    setSpinning(true);
    setResult(null);

    const totalChance = data.prizes.reduce((sum, p) => sum + p.chance, 0);
    let random = Math.random() * totalChance;
    let selectedPrize: Prize | null = null;

    for (const prize of data.prizes) {
      random -= prize.chance;
      if (random < 0) {
        selectedPrize = prize;
        break;
      }
    }
    
    if (!selectedPrize) {
        selectedPrize = data.prizes[data.prizes.length - 1];
    }

    const prizeIndex = data.prizes.findIndex(p => p.id === selectedPrize!.id);
    const segmentAngle = 360 / data.prizes.length;
    // Ajustamos el ángulo para que caiga en el centro del segmento
    const stopAngle = (prizeIndex * segmentAngle) + (segmentAngle / 2);
    
    const extraRotations = 5 * 360; // 5 giros completos
    // Calculamos la nueva rotación acumulativa
    const newRotation = rotation + extraRotations + (360 - (rotation % 360)) - stopAngle;

    setRotation(newRotation);

    setTimeout(() => {
      setSpinning(false);
      setResult(selectedPrize);

      const newSpinsDone = spinsDone + 1;
      setSpinsDone(newSpinsDone);

      const spinStateStr = localStorage.getItem('luckyWheelState');
      let timestamp = Date.now();
      if (spinStateStr && spinsDone > 0) {
        const oldState = JSON.parse(spinStateStr);
        timestamp = oldState.timestamp;
      }

      localStorage.setItem('luckyWheelState', JSON.stringify({ prize: selectedPrize, timestamp, count: newSpinsDone }));
    }, 5000); // Debe coincidir con la duración de la animación en CSS
  };

  const handleSpinAgain = () => {
    setResult(null);
  };

  const handleCloseResult = () => {
    if (result) {
      onPrizeClaimed(result); // Notificamos a la App que terminó y ganó
    }
    setResult(null);
    setShow(false);
  };

  const handleCloseWheel = () => {
    setShow(false);
    sessionStorage.setItem('wheelClosed', 'true');
  };

  const segmentStyle = useMemo(() => {
    if (!data) return {};
    const segmentAngle = 360 / data.prizes.length;
    const prizeVars = data.prizes.reduce((vars, prize, index) => ({
      ...vars,
      [`--bg-color-${index}`]: prize.background_color,
      [`--text-color-${index}`]: prize.text_color,
    }), {});
    return {
      ...prizeVars,
      '--segment-count': data.prizes.length,
      '--segment-angle': `${segmentAngle}deg`,
    } as React.CSSProperties;
  }, [data]);

  if (!show || !data) {
    return null;
  }

  return (
    <div className="lucky-wheel-overlay">
      <div className="lucky-wheel-container">
        <button className="lucky-wheel-close" onClick={handleCloseWheel}>×</button>
        <h2>¡Probá tu suerte!</h2>
        <div className="wheel-wrapper">
          <div 
            className="wheel"
            style={{
              ...segmentStyle,
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? 'transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'none',
              background: `conic-gradient(from 0deg, ${data.prizes.map((p, i) => {
                const segmentAngle = 360 / data.prizes.length;
                const borderWidthInDeg = 2; // Ancho del borde en grados
                return `${p.background_color} ${i * segmentAngle + borderWidthInDeg / 2}deg, ${p.background_color} ${(i + 1) * segmentAngle - borderWidthInDeg / 2}deg`;
              }).join(', ')})`
            }}
          >
            {data.prizes.map((prize, index) => (
              <div key={prize.id} className="wheel-segment" style={{ transform: `rotate(calc(var(--segment-angle) * ${index}))` }}>
                <span style={{ color: prize.text_color, transform: `rotate(calc(var(--segment-angle) / 2))` }}>{prize.name}</span>
              </div>
            ))}
          </div>
          <div className="wheel-pointer"></div>
          <div className="wheel-center">GS</div>
        </div>
        <button className="spin-button" onClick={handleSpin} disabled={spinning || !!result}>
          {spinning ? 'Girando...' : (result ? '¡Ya ganaste!' : '¡GIRAR!')}
        </button>
        {result && !spinning && (
          <div className="result-modal">
            <h3>¡{result.value !== '0' ? 'Felicitaciones' : 'Qué lástima'}!</h3>
            <p>Ganaste: <strong>{result.name}</strong></p>
            {result.value !== '0' && <p>Tu cupón es: <strong>{result.value}</strong></p>}
            
            {spinsDone < maxSpins ? (
              <div className="flex gap-4 mt-4">
                <button onClick={handleSpinAgain} className="flex-1 px-4 py-2 rounded-lg font-semibold bg-slate-200 text-slate-800 hover:bg-slate-300 transition-all">Volver a tirar</button>
                <button onClick={handleCloseResult} className="flex-1 px-4 py-2 rounded-lg font-bold bg-black text-white hover:bg-slate-800 transition-all">Reclamar y Salir</button>
              </div>
            ) : (
              <button onClick={handleCloseResult} className="mt-4 bg-black text-white px-4 py-2 rounded font-bold">
                {result.value !== '0' ? 'Reclamar premio' : 'Cerrar'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LuckyWheel;
