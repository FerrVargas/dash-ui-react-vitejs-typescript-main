import React from 'react';

const Dano: React.FC = () => {
  const datosFicticios = [
    { item: 1, dano: 'Moderado', velocidad: '15 m/s', tiempo: '2.3 s' },
    { item: 2, dano: 'Severo', velocidad: '22 m/s', tiempo: '1.8 s' },
    { item: 3, dano: 'Leve', velocidad: '10 m/s', tiempo: '3.1 s' },
    { item: 4, dano: 'Crítico', velocidad: '30 m/s', tiempo: '1.2 s' },
    { item: 5, dano: 'Moderado', velocidad: '18 m/s', tiempo: '2.5 s' },
  ];

  return (
    <div className="container mt-4">
      <h2>Reporte de Daño</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Item</th>
              <th>Daño</th>
              <th>Velocidad</th>
              <th>Tiempo</th>
            </tr>
          </thead>
          <tbody>
            {datosFicticios.map((fila, index) => (
              <tr key={index}>
                <td>{fila.item}</td>
                <td>{fila.dano}</td>
                <td>{fila.velocidad}</td>
                <td>{fila.tiempo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 text-end">
        <button className="btn btn-primary">
          Descargar
        </button>
      </div>
    </div>
  );
};

export default Dano;
