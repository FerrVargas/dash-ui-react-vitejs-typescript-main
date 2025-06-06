import React, { useState, useEffect } from 'react';
import Sensor3DPlot from "../../../components/Sensor3DPlot";

const CDC: React.FC = () => {
  const [valorJson, setValorJson] = useState<number | null>(null);
  const [selected, setSelected] = useState('Brazalete muñeca derecha');

  useEffect(() => {
    fetch("/Data/cdc-sensores.json")
      .then(res => res.json())
      .then(data => {
        console.log("✅ JSON cargado:", data);
        setValorJson(data.porcentaje);
      })
      .catch(err => console.error("❌ Error al cargar JSON:", err));
  }, []);

  const sensores = [
    { nombre: 'Brazalete muñeca derecha', porcentaje: valorJson },
    { nombre: 'Brazalete codo derecho', porcentaje: 60 },
    { nombre: 'Brazalete muñeca izquierda', porcentaje: 80 },
    { nombre: 'Brazalete codo izquierdo', porcentaje: 55 },
    { nombre: 'Cuello', porcentaje: 50 },
    { nombre: 'pie', porcentaje: 50 },
  ];

  const datos3D: Record<string, { x: number; y: number; z: number }[]> = {
    'Brazalete muñeca derecha': [
      { x: 1, y: 2, z: 3 },
      { x: 2, y: 4, z: 6 },
      { x: 3, y: 6, z: 2 },
    ],
    'Brazalete codo derecho': [
      { x: 1, y: 3, z: 4 },
      { x: 2, y: 5, z: 5 },
      { x: 3, y: 7, z: 3 },
    ],
    'Brazalete muñeca izquierda': [
      { x: 1, y: 1, z: 2 },
      { x: 2, y: 2, z: 4 },
      { x: 3, y: 3, z: 1 },
    ],
    'Brazalete codo izquierdo': [
      { x: 2, y: 3, z: 5 },
      { x: 3, y: 5, z: 7 },
      { x: 4, y: 6, z: 6 },
    ],
    'Cuello': [
      { x: 2, y: 2, z: 3 },
      { x: 4, y: 3, z: 2 },
      { x: 6, y: 5, z: 4 },
    ],
    'pie': [
      { x: 1, y: 1, z: 1 },
      { x: 2, y: 2, z: 2 },
      { x: 3, y: 3, z: 3 },
    ]
  };

  return (
    <div className="container mt-4">
      <h2>Distribución CDC</h2>

      {/* Barras de progreso */}
      {sensores.map((item, index) => {
        const porcentaje = item.porcentaje;
        const isFirst = index === 0;
        const cargado = typeof porcentaje === 'number';

        if (isFirst && !cargado) {
          return (
            <div key={index} className="mb-4">
              <label className="form-label fw-bold">{item.nombre}</label>
              <div className="progress">
                <div
                  className="progress-bar bg-secondary"
                  role="progressbar"
                  style={{ width: "10%" }}
                >
                  Cargando...
                </div>
              </div>
            </div>
          );
        }

        return (
          <div key={index} className="mb-4">
            <label className="form-label fw-bold">{item.nombre}</label>
            <div className="progress">
              <div
                className="progress-bar progress-bar-striped bg-success"
                role="progressbar"
                style={{ width: `${porcentaje}%` }}
                aria-valuenow={porcentaje}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                {porcentaje}%
              </div>
            </div>
          </div>
        );
      })}

      {/* Sección de posición 3D */}
      <div className="mt-5">
        <h3>Posición</h3>

        <div className="btn-group mb-4" role="group">
          {sensores.map((item, index) => (
            <button
              key={index}
              className={`btn btn-outline-primary ${selected === item.nombre ? 'active' : ''}`}
              onClick={() => setSelected(item.nombre)}
            >
              {item.nombre}
            </button>
          ))}
        </div>

        {/* Scatter 3D */}
        <Sensor3DPlot id={selected} points={datos3D[selected] || []} />
      </div>
    </div>
  );
};

export default CDC;
