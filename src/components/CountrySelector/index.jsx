import React from "react";

CountrySelector.propTypes = {};

function CountrySelector({ country, handleOnchange }) {
  return (
    <section className="section__countrySelector">
      <form action="">
        <label htmlFor="select-option">Quốc gia: </label>
        <select name="" id="select-option" onChange={(e) => handleOnchange(e)}>
          {country ? (
            country.map((data, idx) => (
              <option key={idx} value={data?.ISO2.toLowerCase()}>
                {data?.Country}
              </option>
            ))
          ) : (
            <option></option>
          )}
        </select>
      </form>
    </section>
  );
}

export default CountrySelector;
