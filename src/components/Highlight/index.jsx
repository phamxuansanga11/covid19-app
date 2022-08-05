import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { useEffect } from "react";

Highlight.propTypes = {
  dayOneCountry: PropTypes.array,
  momentFunc: PropTypes.func,
};
Highlight.defaultProps = {
  dayOneCountry: [],
  momentFunc: null,
};

function Highlight({ dayOneCountry, momentFunc }) {
  const [data, setData] = useState();
  useEffect(() => {
    if (dayOneCountry) {
      setData(dayOneCountry[dayOneCountry.length - 1]);
    }
    // console.log("data ne`", data);
  }, [dayOneCountry]);
  return (
    <section className="section__highlight">
      <h2 className="date__current">Ngày: {momentFunc(data?.Date)}</h2>
      <div className="wrapper__grid">
        <div className="grid__item">
          <p className="text">Số ca nhiễm</p>
          <p className="number">{data?.Confirmed} </p>
        </div>
        <div className="grid__item">
          <p className="text">Khỏi</p>
          <p className="number">{data?.Active}</p>
        </div>
        <div className="grid__item">
          <p className="text">Tử vong</p>
          <p className="number">{data?.Deaths}</p>
        </div>
      </div>
    </section>
  );
}

export default Highlight;
