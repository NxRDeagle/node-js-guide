import chalk from "chalk";
import dedent from "dedent-js";

export const printError = (error) => {
  console.log(`${chalk.bgRed("ERROR:")} ${error}`);
};

export const printSuccess = (message) => {
  console.log(`${chalk.bgGreen("SUCCESS:")} ${message}`);
};

export const printHelp = () => {
  console.log(dedent`${chalk.bgCyan("HELP")}
  Without parameters - get weather
  -s [CITY] for saving city
  -h to get available commands
  -t [API_KEY] for saving token
  `);
};

export const printWeather = (result) => {
  console.log(
    dedent`${chalk.bgYellow("WEATHER:")} The weather in ${result.location.name}
		${result.current.weather_descriptions}
		Temperature: ${result.current.temperature}°C (feels like ${
      result.current.feelslike
    }°C)
		Humidity: ${result.current.humidity}%
		Wind speed: ${result.current.wind_speed}m/s
		`
  );
};
