import { Chart as ChartJS, ArcElement, Tooltip} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { backgroundColors, borderColors } from './assets/constants';

ChartJS.register(ArcElement, Tooltip);

interface DoughnutChartProps {
    style: {
      chart: string,
      legend: string,
      element: string,
      key: string,
      label: string,
      value: string,
      doughnut: string
    }
    data: {
      category: string,
      amount: number
    }[],
}

function DoughnutChartWithLegend(props: DoughnutChartProps) {
  const chartLabels = props.data.map(item => item.category.charAt(0).toUpperCase() + item.category.slice(1))
  const chartValues= props.data.map(item=> item.amount)

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Amount (lei)',
        data: chartValues,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      }
    ]
  }

  return (
      <div className={props.style.chart}>
        <div className={props.style.legend}>
          {chartValues.map((item, index) => (
            <div className={props.style.element} key={index}>
              <div className={props.style.key} style={{backgroundColor: backgroundColors[index], borderColor: borderColors[index]}}></div>
              <p className={props.style.label}>{chartLabels[index]}</p>
              <p className={props.style.value}>{item + ' Lei'}</p>
            </div>
          ))}
        </div>
        <div className={props.style.doughnut}>
          <Doughnut data={data}/>
        </div>
      </div>
  )
}

export default DoughnutChartWithLegend;
