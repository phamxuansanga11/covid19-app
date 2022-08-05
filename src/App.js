import { useState, useEffect, useRef } from "react";
import "./App.scss";
import CountrySelector from "./components/CountrySelector";
import Highlight from "./components/Highlight";
import Summary from "./components/Summary";
import { CountryApi } from "./api/CountryApi";
import moment from "moment";
import Alert from "./components/Alert/Alert";

function App() {
  //func moment format
  const momentFunc = (dateToFormat) => {
    return moment(dateToFormat).format("DD/MM/YYYY");
  };

  //clear and setTimeOut
  const setTimeOutRef = useRef(null);
  const handleShowAlert = () => {
    if (setTimeOutRef.current) {
      clearTimeout(setTimeOutRef.current);
    }
    setTimeOutRef.current = setTimeout(() => {
      setIsShowAlert(false);
    }, 2500);
  };

  //get value select onChange
  const handleOnchange = (e) => {
    const newCountry = country.find(
      (country) => country.ISO2.toLowerCase() === e.target.value
    );
    setCountryOnChange(newCountry.Slug);
    setCountrySelectId(newCountry.ISO2.toLowerCase());
    console.log(newCountry.ISO2.toLowerCase());
  };

  const countryApi = new CountryApi();
  const [country, setCountries] = useState();
  const [dayOneCountry, setDayOneCountries] = useState();
  const [countryOnChange, setCountryOnChange] = useState("gabon");
  const [isShowAlert, setIsShowAlert] = useState(false);
  const [countrySelectId, setCountrySelectId] = useState("ga");
  // const [loading, setLoading] = useState(false);

  const fetchCounTries = async () => {
    try {
      const countries = await countryApi.fetchCounTries();
      setCountries(countries);
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchDayOneCountries = async (countryOnChange) => {
    try {
      const dayOneCountries = await countryApi.fetchDayOneCounTries(
        countryOnChange
      );
      if (dayOneCountries.length === 0) {
        setIsShowAlert(true);
        handleShowAlert();
        console.log("data rong~");
      }
      setDayOneCountries(dayOneCountries);
      console.log("day one", dayOneCountries);
    } catch (error) {
      console.log("dayOneCountries API call fail", error);
    }
  };

  useEffect(() => {
    fetchCounTries();
  }, []);
  useEffect(() => {
    fetchDayOneCountries(countryOnChange);
  }, [countryOnChange]);

  return (
    <div className="App">
      <div className="container">
        <h1 className="title__app">Số liệu covid19 </h1>
        <CountrySelector country={country} handleOnchange={handleOnchange} />
        <Highlight dayOneCountry={dayOneCountry} momentFunc={momentFunc} />
        {!isShowAlert ? (
          <Summary
            dayOneCountry={dayOneCountry}
            countrySelectId={countrySelectId}
          />
        ) : (
          ""
        )}
        {isShowAlert && <Alert />}
      </div>
    </div>
  );
}

export default App;
