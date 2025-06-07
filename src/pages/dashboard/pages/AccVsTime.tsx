import React, { useEffect, useState } from 'react';
import { ResponsiveLine } from '@nivo/line';

interface Punto {
  x: number;
  y: number;
}

const AccVsTime: React.FC = () => {
  const [datos, setDatos] = useState<Punto[]>([]);

  useEffect(() => {
    fetch('/Data/acc_vs_time.json')
      .then((res) => res.json())
      .then((data: Punto[]) => {
        setDatos(data);
        console.log("✅ Datos cargados:", data);
      })
      .catch((err) => console.error("❌ Error al cargar JSON:", err));
  }, []);

  const data = [
    {
      id: 'Aceleración',
      color: 'hsl(211, 70%, 50%)',
      data: datos
    }
  ];

  return (
    <div style={{ height: '500px' }}>
      <h2 style={{ textAlign: 'center' }}>Aceleración vs Tiempo</h2>
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'linear' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: false,
          reverse: false
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          legend: 'Tiempo (s)',
          legendOffset: 36,
          legendPosition: 'middle'
        }}
        axisLeft={{
          legend: 'Aceleración (m/s²)',
          legendOffset: -40,
          legendPosition: 'middle'
        }}
        colors={{ scheme: 'category10' }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
      />
    </div>
  );
};

export default AccVsTime;
