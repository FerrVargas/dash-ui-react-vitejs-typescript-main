import React, { useEffect, useState } from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

interface DatoSensor {
  item: number;
  tiempo: string;
  accCuello: number;
  accTorax: number;
  accBrazo: number;
}

interface DañoResultado {
  ais: number;
  porcentaje: number;
  descripcion: string;
}

const calcularDanioCompleto = (valor: number, parte: 'cuello' | 'torax' | 'brazo'): DañoResultado => {
  const g = Math.abs(valor) / 9.81;
  let ais = 0, porcentaje = 0;
  let descripcion = 'Sin daño';

  if (parte === 'brazo') {
    if (0.64 <= g && g < 3.2) {
      porcentaje = ((g - 0.64) / (3.2 - 0.64)) * 80;
      ais = 1;
      descripcion = 'Contusiones leves, esguinces leves, molestias sin fractura.';
    } else if (3.2 <= g && g < 6.4) {
      porcentaje = 80 + ((g - 3.2) / (6.4 - 3.2)) * 15;
      ais = 2;
      descripcion = 'Esguinces severos, fracturas pequeñas, dolor muscular intenso.';
    } else if (6.4 <= g && g < 8.0) {
      porcentaje = 95 + ((g - 6.4) / (8.0 - 6.4)) * 5;
      ais = 3;
      descripcion = 'Fracturas grandes, dislocaciones, lesiones de tendones.';
    } else if (g >= 8.0) {
      porcentaje = 100;
      ais = 4;
      descripcion = 'Fracturas múltiples, daño extenso, posible daño a nervios.';
    }
  } else {
    if (g < 0.64) {
      ais = 0;
      porcentaje = 0;
      descripcion = 'Sin daño';
    } else if (0.64 <= g && g < 3.2) {
      porcentaje = ((g - 0.64) / (3.2 - 0.64)) * 100;
      ais = 1;
      descripcion = parte === 'cuello'
        ? 'Daño menor: esguince o distensión cervical menor.'
        : 'Daño menor: contusiones menores en las costillas.';
    } else if (3.2 <= g && g < 6.4) {
      porcentaje = ((g - 3.2) / (6.4 - 3.2)) * 100;
      ais = 2;
      descripcion = parte === 'cuello'
        ? 'Daño moderado: fracturas cervicales moderadas.'
        : 'Daño moderado: fracturas simples de costillas.';
    } else if (6.4 <= g && g < 8.0) {
      porcentaje = ((g - 6.4) / (8.0 - 6.4)) * 100;
      ais = 3;
      descripcion = parte === 'cuello'
        ? 'Daño severo: posible afectación de la médula espinal.'
        : 'Daño severo: fracturas múltiples, tórax inestable.';
    } else if (8.0 <= g && g < 11.2) {
      porcentaje = ((g - 8.0) / (11.2 - 8.0)) * 100;
      ais = 4;
      descripcion = parte === 'cuello'
        ? 'Daño crítico: parálisis parcial, lesión arterial.'
        : 'Daño crítico: hemotórax masivo, contusiones cardíacas.';
    } else if (11.2 <= g && g < 16.0) {
      porcentaje = ((g - 11.2) / (16.0 - 11.2)) * 100;
      ais = 5;
      descripcion = parte === 'cuello'
        ? 'Daño muy crítico: riesgo de muerte, daño encefálico.'
        : 'Daño muy crítico: trauma masivo, ruptura de órganos.';
    } else if (g >= 16.0) {
      porcentaje = 100;
      ais = 6;
      descripcion = parte === 'cuello'
        ? 'Daño fatal: destrucción del tronco encefálico o médula.'
        : 'Daño fatal: destrucción completa de órganos torácicos.';
    }
  }

  return { ais, porcentaje: parseFloat(porcentaje.toFixed(1)), descripcion };
};

const Dano: React.FC = () => {
  const [datos, setDatos] = useState<DatoSensor[]>([]);

  useEffect(() => {
    fetch('/Data/danos.json')
      .then((res) => res.json())
      .then((data) => setDatos(data))
      .catch((err) => console.error('❌ Error al cargar datos:', err));
  }, []);

  const exportarExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Reporte de Daño');

    worksheet.columns = [
      { header: 'Item', key: 'item', width: 10 },
      { header: 'Tiempo', key: 'tiempo', width: 15 },
      { header: 'AIS Cuello', key: 'aisCuello', width: 12 },
      { header: '% Cuello', key: 'porcentajeCuello', width: 12 },
      { header: 'Desc. Cuello', key: 'descCuello', width: 30 },
      { header: 'AIS Tórax', key: 'aisTorax', width: 12 },
      { header: '% Tórax', key: 'porcentajeTorax', width: 12 },
      { header: 'Desc. Tórax', key: 'descTorax', width: 30 },
      { header: 'AIS Brazo', key: 'aisBrazo', width: 12 },
      { header: '% Brazo', key: 'porcentajeBrazo', width: 12 },
      { header: 'Desc. Brazo', key: 'descBrazo', width: 30 },
    ];

    datos.forEach((fila) => {
      const cuello = calcularDanioCompleto(fila.accCuello, 'cuello');
      const torax = calcularDanioCompleto(fila.accTorax, 'torax');
      const brazo = calcularDanioCompleto(fila.accBrazo, 'brazo');

      console.log(`Item ${fila.item} - Cuello:`, cuello, 'Tórax:', torax, 'Brazo:', brazo);

      worksheet.addRow({
        item: fila.item,
        tiempo: fila.tiempo,
        aisCuello: cuello.ais,
        porcentajeCuello: `${cuello.porcentaje}%`,
        descCuello: cuello.descripcion,
        aisTorax: torax.ais,
        porcentajeTorax: `${torax.porcentaje}%`,
        descTorax: torax.descripcion,
        aisBrazo: brazo.ais,
        porcentajeBrazo: `${brazo.porcentaje}%`,
        descBrazo: brazo.descripcion,
      });
    });

    // Estilo del encabezado
    const headerRow = worksheet.getRow(1);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF0B2545' },
      };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, 'reporte_dano.xlsx');
  };

  return (
    <div className="container mt-4">
      <h2>Reporte de Daño</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Item</th>
              <th>Tiempo</th>
              <th>Daño Cuello</th>
              <th>Daño Tórax</th>
              <th>Daño Brazo</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((fila, index) => {
              const cuello = calcularDanioCompleto(fila.accCuello, 'cuello');
              const torax = calcularDanioCompleto(fila.accTorax, 'torax');
              const brazo = calcularDanioCompleto(fila.accBrazo, 'brazo');
              return (
                <tr key={index}>
                  <td>{fila.item}</td>
                  <td>{fila.tiempo}</td>
                  <td>{cuello.descripcion} ({cuello.porcentaje}%)</td>
                  <td>{torax.descripcion} ({torax.porcentaje}%)</td>
                  <td>{brazo.descripcion} ({brazo.porcentaje}%)</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-3 text-end">
        <button className="btn btn-primary" onClick={exportarExcel}>
          Descargar
        </button>
      </div>
    </div>
  );
};

export default Dano;
