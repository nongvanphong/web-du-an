import { ApexOptions } from "apexcharts";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

type chartype = {
  series: any[]; // Chú ý kiểu dữ liệu của series phải phù hợp với ứng dụng của bạn
  options: ApexOptions; // Sử dụng kiểu dữ liệu ApexOptions ở đây
  selection: string;
};

const Chart1: React.FC = () => {
  //console.log(Date.parse("2023-09-13T09:09:56.000Z"));
  const [chartData, setChartData] = useState<chartype>({
    series: [
      {
        data: [
          [1327359600000, 30.95],
          [1327446000000, 31.34],
          [1327532400000, 31.18],
          [1327618800000, 31.05],
          [1327878000000, 31.0],
          [1327964400000, 30.95],
          [1328050800000, 31.24],
          [1328137200000, 31.29],
          [1328223600000, 31.85],
          [1328482800000, 31.86],
          [1328569200000, 32.28],
          [1328655600000, 32.1],
          [1328742000000, 32.65],
          [1328828400000, 32.21],
          [1329087600000, 32.35],
          [1329174000000, 32.44],
          [1329260400000, 32.46],
          [1329346800000, 32.86],
          [1329433200000, 32.75],
          [1360796400000, 38.61],
          [1360882800000, 38.63],
          [1361228400000, 38.99],
          [1361314800000, 38.77],
          [1361401200000, 38.34],
          [1361487600000, 38.55],
          [1361746800000, 38.11],
          [1361833200000, 38.59],
          [1361919600000, 39.6],
        ],
      },
    ],
    options: {
      chart: {
        id: "area-datetime",
        type: "area",
        height: 350,
        zoom: {
          autoScaleYaxis: true,
        },
      },
      annotations: {
        yaxis: [
          {
            y: 30,
            borderColor: "#999",
            label: {
              // show: true,
              text: "Support",
              style: {
                color: "#fff",
                background: "#00E396",
              },
            },
          },
        ],
        xaxis: [
          {
            x: new Date("14 Nov 2012").getTime(),
            borderColor: "#999",
            // yAxisIndex: 0,
            label: {
              //  show: true,
              text: "Rally",
              style: {
                color: "#fff",
                background: "#775DD0",
              },
            },
          },
        ],
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,

        // style: "hollow",
      },
      xaxis: {
        type: "datetime",
        min: new Date("01 Mar 2012").getTime(),
        tickAmount: 6,
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy",
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100],
        },
      },
    },
    selection: "one_year",
  });

  const updateData = (timeline: string) => {
    if (timeline === "one_month") {
      if (chartData.options.xaxis) {
        chartData.options.xaxis.min = new Date("27 Feb 2012").getTime();
        chartData.options.xaxis.max = new Date("27 Feb 2013").getTime();
      }
    } else {
      if (chartData.options.xaxis) {
        chartData.options.xaxis.min = undefined;
        chartData.options.xaxis.max = undefined;
      }
    }
    setChartData((prevChartData) => ({
      ...prevChartData,
      selection: timeline,
    }));
  };

  return (
    <div className="w-full  bg-white" id="chart">
      <div className="toolbar">
        <button
          id="one_month"
          onClick={() => updateData("one_month")}
          className={chartData.selection === "one_month" ? "active" : ""}
        >
          1M
        </button>
        <button
          id="six_months"
          onClick={() => updateData("six_months")}
          className={chartData.selection === "six_months" ? "active" : ""}
        >
          6M
        </button>
        <button
          id="one_year"
          onClick={() => updateData("one_year")}
          className={chartData.selection === "one_year" ? "active" : ""}
        >
          1Y
        </button>
        <button
          id="ytd"
          onClick={() => updateData("ytd")}
          className={chartData.selection === "ytd" ? "active" : ""}
        >
          YTD
        </button>
        <button
          id="all"
          onClick={() => updateData("all")}
          className={chartData.selection === "all" ? "active" : ""}
        >
          ALL
        </button>
      </div>

      <div id="chart-timeline">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="area"
          height={350}
        />
      </div>
    </div>
  );
};

export default Chart1;
