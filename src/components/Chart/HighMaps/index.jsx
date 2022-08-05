import React from "react";
import HighChartsReact from "highcharts-react-official";
import HighChart from "highcharts";
import highChartsMap from "highcharts/modules/map";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { cloneDeep } from "lodash";

//load highCharts modules
highChartsMap(HighChart);

const initOptions = {
  chart: {
    height: "500",
  },
  title: {
    text: null,
  },
  mapNavigation: {
    enabled: true,
  },
  colorAxis: {
    min: 0,
    stops: [
      [0.2, "#FFC4AA"],
      [0.4, "#FF8A66"],
      [0.6, "#FF392B"],
      [0.8, "#B71525"],
      [1, "	#7A0826"],
    ],
  },
  legend: {
    layout: "vertical",
    align: "right",
    verticalAlign: "bottom",
  },
  series: [
    {
      mapData: {},
      name: "Dân số",
      joinBy: ["hc-key", "key"],
    },
  ],
};

function HighMaps({ mapData }) {
  const [options, setOptions] = useState({});
  const chartsRef = useRef(null);

  useEffect(() => {
    const fakeData = mapData?.features?.map((feature, index) => ({
      key: feature.properties["hc-key"],
      value: index,
    }));

    setOptions({
      ...initOptions,
      series: [
        {
          ...initOptions.series[0],
          mapData: mapData,
          data: fakeData,
        },
      ],
    });
  }, [mapData]);

  useEffect(() => {
    if (chartsRef && chartsRef.current) {
      chartsRef?.current?.chart?.series[0]?.update({
        mapData: mapData,
      });
    }
  }, [mapData]);

  return (
    <section className="section__highmap">
      <HighChartsReact
        highcharts={HighChart}
        options={cloneDeep(options)}
        constructorType="mapChart"
        ref={chartsRef}
      />
    </section>
  );
}

export default HighMaps;
