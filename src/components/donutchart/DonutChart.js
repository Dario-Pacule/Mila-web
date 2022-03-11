import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Styles from "./DonutChart.module.css"

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DonutChart({ level }) {

  const data = {
    datasets: [
      {
        label: 'Nivel de Humidade do solo',
        data: [level, 100 - level],
        backgroundColor: [
          'rgba(43,182,115, 1)',
          'rgba(236, 236, 236, 0.3',
        ],
        borderColor: [
          'rgba(43,182,115, 1)',
          'rgba(236, 236, 236, 1)',
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className={Styles.donut_Chart}>
      <Doughnut data={data} />
    </div>
  );
}