import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

type CandlestickData = { x: number; y: [number, number, number, number] };
type DataPoint = { x: number; y: number };
type Series = {
  name: string;
  type?: string;
  data: CandlestickData[] | DataPoint[];
};

type StockChartProps = {
  data: {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    sma_5: number;
    sma_20: number;
    sma_50: number;
    sma_75: number;
    MiddleBand: number;
    UpperBand: number;
    LowerBand: number;
  }[];
};

export const StockChart: React.FC<StockChartProps> = ({ data }) => {
  const [options, setOptions] = useState<ApexOptions>({});
  const [series, setSeries] = useState<Series[]>([]);

  useEffect(() => {
    const chartOptions: ApexOptions = {
      chart: {
        type: 'candlestick',
        height: 350,
      },
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        title: {
          text: '価格',
        },
        labels: {
          formatter: (value: number) => value.toFixed(2),
        },
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: (value: number) => value.toFixed(2),
        },
      },
      legend: {
        position: 'bottom',
      },
      stroke: {
        width: 2,
      },
      colors: [
        '#00E396',
        '#0090FF',
        '#775DD0',
        '#FF4560',
        '#008FFB',
        '#FEB019',
        '#FF4560',
        '#00E396',
      ],
      plotOptions: {
        candlestick: {
          colors: {
            upward: '#3C90EB',
            downward: '#DF7D46',
          },
        },
      },
    };

    const chartSeries: Series[] = [
      {
        name: '価格',
        type: 'candlestick',
        data: data.map((item) => ({
          x: new Date(item.date).getTime(),
          y: [item.open, item.high, item.low, item.close],
        })),
      },
      {
        name: 'SMA 5',
        type: 'line',
        data: data.map((item) => ({
          x: new Date(item.date).getTime(),
          y: item.sma_5,
        })),
      },
      {
        name: 'SMA 20',
        type: 'line',
        data: data.map((item) => ({
          x: new Date(item.date).getTime(),
          y: item.sma_20,
        })),
      },
      {
        name: 'SMA 50',
        type: 'line',
        data: data.map((item) => ({
          x: new Date(item.date).getTime(),
          y: item.sma_50,
        })),
      },
      {
        name: 'SMA 75',
        type: 'line',
        data: data.map((item) => ({
          x: new Date(item.date).getTime(),
          y: item.sma_75,
        })),
      },
      {
        name: 'Middle Band',
        type: 'line',
        data: data.map((item) => ({
          x: new Date(item.date).getTime(),
          y: item.MiddleBand,
        })),
      },
      {
        name: 'Upper Band',
        type: 'line',
        data: data.map((item) => ({
          x: new Date(item.date).getTime(),
          y: item.UpperBand,
        })),
      },
      {
        name: 'Lower Band',
        type: 'line',
        data: data.map((item) => ({
          x: new Date(item.date).getTime(),
          y: item.LowerBand,
        })),
      },
    ];

    setOptions(chartOptions);
    setSeries(chartSeries);
  }, [data]);

  return <Chart options={options} series={series} height={350} />;
};
