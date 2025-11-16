import { homedir } from "os";
import { join } from "path";
import { existsSync, promises } from "fs";

const filepath = join(homedir(), "weather-data.json");

export const TOKEN_DICTIONARY = {
  token: "token",
  city: "city",
};

export const saveKeyValue = async (key, value) => {
  let data = {};
  if (existsSync(filepath)) {
    const file = await promises.readFile(filepath);
    data = JSON.parse(file);
  }
  data[key] = value;
  await promises.writeFile(filepath, JSON.stringify(data));
};

export const getKeyValue = async (key) => {
  if (existsSync(filepath)) {
    const file = await promises.readFile(filepath);
    const data = JSON.parse(file);
    return data[key];
  }
  return undefined;
};
