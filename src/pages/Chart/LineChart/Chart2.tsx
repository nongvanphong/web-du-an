import { ApexOptions } from "apexcharts";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

type chartype = {
  series: any[]; // Chú ý kiểu dữ liệu của series phải phù hợp với ứng dụng của bạn
  options: ApexOptions; // Sử dụng kiểu dữ liệu ApexOptions ở đây
  selection: string;
};

const Chart2: React.FC = () => {
  const [series] = useState([
    {
      name: "Inflation",
      data: [2.3, 3.1, 4.0, 1000, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2],
    },
  ]);

  const [options] = useState<ApexOptions>({
    chart: {
      height: 250,
      type: "bar",
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: "top", // top, center, bottom
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: any) {
        return val + "vnđ";
      },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      position: "top",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val: any) {
          return val + "vnđ";
        },
      },
    },
    title: {
      text: "Monthly Inflation in Argentina, 2002",
      floating: true,
      offsetY: 330,
      align: "center",
      style: {
        color: "#444",
      },
    },
  });

  return (
    <div className="w-full   " id="chart">
      <div id="chart-timeline">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={250}
        />
      </div>
    </div>
  );
};

export default Chart2;
