import axios from "axios";

export class CountryApi {
  async fetchCounTries() {
    const response = await axios.get("https://api.covid19api.com/countries");
    return response.data;
  }
  async fetchDayOneCounTries(country) {
    const response = await axios.get(
      `https://api.covid19api.com/dayone/country/${country}`
    );
    return response.data;
  }
}
