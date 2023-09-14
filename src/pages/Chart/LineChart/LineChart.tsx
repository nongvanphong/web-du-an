import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

type LineAreaChartProps = {
  chartData: number[];
  chartOptions: { xaxis?: { categories: string[] } };
};

export function LineAreaChart({ chartData, chartOptions }: LineAreaChartProps) {
  const [stateChartData, setChartData] = useState(chartData);
  const [stateChartOptions, setChartOptions] = useState(chartOptions);

  useEffect(() => {
    setChartData(chartData);
    setChartOptions(chartOptions);
  }, [chartData, chartOptions]);

  return (
    <ReactApexChart
      options={stateChartOptions}
      series={stateChartData}
      type="area"
      width="100%"
      height="100%"
    />
  );
}
