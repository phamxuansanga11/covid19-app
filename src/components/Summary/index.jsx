import React from "react";
import PropTypes from "prop-types";
import LineChart from "../Chart/LineChart";
import { useEffect } from "react";
import { useState } from "react";
import HighMaps from "../Chart/HighMaps";

Summary.propTypes = {
  dayOneCountry: PropTypes.array,
  countrySelectId: PropTypes.string,
};
Summary.defaultProps = {
  dayOneCountry: [],
  countrySelectId: "",
};

function Summary({ dayOneCountry, countrySelectId }) {
  const [mapData, setMapData] = useState();

  useEffect(() => {
    if (countrySelectId) {
      import(
        `@highcharts/map-collection/countries/${countrySelectId}/${countrySelectId}-all.geo.json`
      ).then((res) => setMapData(res));
    } else if (countrySelectId === "") {
      setMapData([]);
    }
  }, [countrySelectId]);

  return (
    <section className="section__summary">
      <div className="wrapper__grid">
        <div className="grid-left">
          <LineChart data={dayOneCountry} />
        </div>
        <div className="grid-right">
          <HighMaps mapData={mapData} />
        </div>
      </div>
    </section>
  );
}

export default Summary;
