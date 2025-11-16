import axios from "axios";
import { getKeyValue, TOKEN_DICTIONARY } from "./storage.service.js";

export const getWeather = async (city) => {
  const token = await getKeyValue(TOKEN_DICTIONARY.token);
  if (!token) {
    throw new Error("Token is not set, please use '-t [API_KEY]'");
  }

  const { data } = await axios.get("http://api.weatherstack.com/current", {
    params: {
      access_key: token,
      query: city,
      units: "m",
    },
  });

  return data;
};
