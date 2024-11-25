// import fs from 'node:fs/promises';
import dotenv from 'dotenv';
dotenv.config();

// // TODO: Define an interface for the Coordinates object
interface Coordinates {
  cityName: string,
  lat: number,
  lon: number,
  country: string, 
  state: string
}

// // TODO: Define a class for the Weather object
class Weather {
  temp: number;
  condition: string;
  icon: string;
  wind_speed: number;
  dt_txt: string;
  
  constructor (
    temp: number,
    condition: string,
    icon: string,
    wind_speed: number,
    dt_txt: string,
  ) {
    this.temp = temp;
    this.condition = condition;
    this.icon = icon;
    this.wind_speed = wind_speed;
    this.dt_txt = dt_txt;
  }
};
  
// // TODO: Complete the WeatherService class
class WeatherService {
  // // TODO: Define the baseURL, API key, and city cityName properties=
  private baseURL?: string;
  private apiKey?: string;
  cityName: string;
  
  constructor() {
    this.baseURL = process.env.API_BASE_URL || '';
    this.apiKey = process.env.API_KEY || '';
    this.cityName = '';
  }
  // // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    const query = `${this.baseURL}/geo/1.0/direct?q=${this.cityName}&limit=1&appid=${this.apiKey}`
    return query;
  }
  
  // // TODO: Create fetchLocationData method 
  private async fetchLocationData(query: string): Promise<Coordinates> {
    // try {
    const response = await fetch(query);
    const rawLocationData: Coordinates = await response.json();
    return rawLocationData;
    // } catch (err) {console.log(`Error:`, err);
    //   return err;
    // }
  }
  
  // // TODO: Create destructureLocationData method
  private destructureLocationData(rawLocationData: Coordinates) {
    if (!rawLocationData) {throw new Error(`Try again, goofball. There's no city to be found`)}
    const destructuredLocationData: Coordinates = {
      cityName: rawLocationData.cityName,
      lat: rawLocationData.lat,
      lon: rawLocationData.lon,
      country: rawLocationData.country, 
      state: rawLocationData.state
    }; 
    return destructuredLocationData;
  }
  
  // // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(): Promise<Coordinates> {
    // try{
      const geocode = this.buildGeocodeQuery();
      const coordinates: Coordinates = await this.fetchLocationData(geocode).then((data: Coordinates) =>
        this.destructureLocationData(data))
      return coordinates as Coordinates;
    // } catch (err) {console.log(`Error:`, err);
    //   return err;
    // }
  }
  
  // // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    const weatherQuery = `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`
    return weatherQuery;
  }
  
  // // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    try {
      const weatherData = await fetch(this.buildWeatherQuery(coordinates));
      const weatherDataArray: Weather[] = await weatherData.json();
      return weatherDataArray;
    } catch (err) {console.log(`Error:`, err);
      return err;
    }
  }
  
  // // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(weatherData: any) {
    if (!weatherData) {throw new Error(`We couldn't find any weather data for that city. ${this.cityName} must not exist`)}
    const currentWeather: Weather = {
      temp: weatherData[0].list.main.temp,
      condition: weatherData[0].list.weather.main,
      icon: weatherData[0].list.weather.icon,
      wind_speed: weatherData[0].list.wind.speed,
      dt_txt: weatherData[0].list.dt_txt,
    }; 
    return currentWeather;
  }
  
  // // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    const forecastArray: Weather[] = [currentWeather]
    const result = weatherData.filter((boot) => boot.dt_txt.includes(`12:00:00`)) 
      for (const sock of result) {
        forecastArray.push(
          new Weather(
            sock.list.main.temp,
            sock.list.weather.main,
            sock.list.weather.icon,
            sock.list.wind.speed,
            sock.list.dt_txt
          )
        )
      }
    }
  
  // // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    try{
      this.cityName = city;
      const coordinates = await this.fetchAndDestructureLocationData();
      const weatherData = await this.fetchWeatherData(coordinates) as any[];
      const currentWeather = this.parseCurrentWeather(weatherData);
      const forecastArray = this.buildForecastArray(currentWeather, weatherData);
      return forecastArray;
    } catch (err) {console.log(`Error:`, err);
      return err;
    }
  }
}

export default new WeatherService();
