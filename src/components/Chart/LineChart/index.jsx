import React from "react";
import HighChartsReact from "highcharts-react-official";
import HighChart from "highcharts";
import { useState, useEffect } from "react";
import moment from "moment";

const generateOptions = (data) => {
  const categories = data.map((item) => moment(item.Date).format("DD/MM/YYYY"));

  return {
    chart: {
      height: 500,
    },
    title: {
      text: "Tổng ca nhiễm",
    },
    xAxis: {
      categories: categories,
      crosshair: true,
    },
    colors: ["#F3585B"],
    yAxis: {
      min: 0,
      title: {
        text: null,
      },
      labels: {
        align: "right",
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y} ca</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "Tổng Ca nhiễm",
        data: data.map((item) => item.Confirmed),
      },
    ],
  };
};

function LineChart({ data }) {
  const [options, setOptions] = useState();
  const [reportStyle, setReportStyle] = useState("all");

  useEffect(() => {
    let customData = [];
    switch (reportStyle) {
      case "all":
        customData = data;
        break;
      case "week":
        customData = data.slice(data.length - 7);
        break;
      case "month":
        customData = data.slice(data.length - 30);
        break;
      default:
        customData = data;
        break;
    }
    setOptions(generateOptions(customData));
  }, [data, reportStyle]);

  return (
    <div>
      <div className="btn__switch">
        <div
          className="btn"
          style={reportStyle === "all" ? { color: "red" } : {}}
          onClick={() => setReportStyle("all")}
        >
          Tất cả
        </div>
        <div
          className="btn"
          style={reportStyle === "week" ? { color: "red" } : {}}
          onClick={() => setReportStyle("week")}
        >
          7 ngày
        </div>
        <div
          className="btn"
          style={reportStyle === "month" ? { color: "red" } : {}}
          onClick={() => setReportStyle("month")}
        >
          30 ngày
        </div>
      </div>
      <HighChartsReact highcharts={HighChart} options={options} />
    </div>
  );
}

export default LineChart;
