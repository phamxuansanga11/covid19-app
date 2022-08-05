import React from "react";
import PropTypes from "prop-types";
import iconSuccess from "../../assets/icon-error.png";

Alert.propTypes = {};

function Alert(props) {
  return (
    <section className="section__alert">
      <p className="notification">Không có số liệu từ quốc gia này</p>
      <i className="icon">
        <img src={iconSuccess} alt="" />
      </i>
    </section>
  );
}

export default Alert;
