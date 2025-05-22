import React from 'react';
import { ResponsiveLine } from '@nivo/line';

const AccVsTime: React.FC = () => {
  const data = [
    {
      id: 'Aceleración',
      color: 'hsl(211, 70%, 50%)',
      data: [
        { x: 0, y: 0 },
        { x: 1, y: 2.1 },
        { x: 2, y: 3.8 },
        { x: 3, y: 2.9 },
        { x: 4, y: 5.0 },
        { x: 5, y: 6.3 },
        { x: 6, y: 7.8 },
        { x: 7, y: 9.1 },
      ]
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

