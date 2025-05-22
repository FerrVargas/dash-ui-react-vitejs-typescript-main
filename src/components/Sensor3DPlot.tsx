import React from 'react';
import Plot from 'react-plotly.js';

interface Sensor3DPlotProps {
  id: string;
  points: { x: number; y: number; z: number }[];
}

const Sensor3DPlot: React.FC<Sensor3DPlotProps> = ({ id, points }) => {
  return (
    <Plot
      data={[
        {
          x: points.map(p => p.x),
          y: points.map(p => p.y),
          z: points.map(p => p.z),
          type: 'scatter3d',
          mode: 'markers',
          marker: {
            size: 5,
            color: points.map(p => p.z),
            colorscale: 'Viridis',
            opacity: 0.8,
          },
          name: id,
        },
      ]}
      layout={{
        title: `Posición 3D - ${id}`,
        autosize: true,
        margin: { l: 0, r: 0, b: 0, t: 40 },
        scene: {
          xaxis: { title: 'X' },
          yaxis: { title: 'Y' },
          zaxis: { title: 'Z' },
        },
      }}
      style={{ width: '100%', height: '500px' }}
    />
  );
};

export default Sensor3DPlot;
