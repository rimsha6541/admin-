import { useState } from 'react';
import { Line } from 'react-chartjs-2';

const SaleChart = ({ salesReport }) => {
  const [activeButton, setActiveButton] = useState({
    title: 'Order',
    color: 'green',
  });

  const handleClick = ({ title, color }) => {
    setActiveButton({ title, color });
  };

  const barOptions = {
    data: {
      labels: salesReport?.map((or) => or.o_id),
      datasets: [
        activeButton.title === 'Order'
          ? {
              label: 'Order',
              data: salesReport?.map((or) => or.total_bill),
              borderColor: '#F97316',
              backgroundColor: '#F97316',
              borderWidth: 3,
              yAxisID: 'y',
            }:
            {
              label: 'Order',
              data: salesReport?.map((or) => or.order),
              borderColor: '#F97316',
              backgroundColor: '#F97316',
              borderWidth: 3,
              yAxisID: 'y',
            }
      ],
    },
    options: {
      responsive: true,
    },
    legend: {
      display: false,
    },
  };

  return (
    <>
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 mb-4">
        <ul className="flex flex-wrap -mb-px">

          <li className="mr-2">
            <button
              type="button"
              className={`inline-block p-2 rounded-t-lg border-b-2 border-transparent ${
                activeButton.title === 'Orders'
                  ? 'text-orange-500 border-orange-500 dark:text-orange-500 dark:border-orange-500'
                  : 'text-orange-500 border-orange-500 dark:text-orange-500 dark:border-orange-500'
              }  focus:outline-none`}
            >
              Orders
            </button>
          </li>
        </ul>
      </div>

      <Line {...barOptions} />
    </>
  );
};

export default SaleChart;
