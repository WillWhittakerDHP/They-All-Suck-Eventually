// import fs from 'node:fs/promises';
import dotenv from 'dotenv';
dotenv.config();

// // TODO: Define an interface for the Coordinates object
interface Coordinates {
  name: string,
  lat: number,
  lon: number,
  country: string, 
  state: string
}

// // TODO: Define a class for the Weather object
class Weather {
  temp: number;
  description: string;
  icon: string;
  wind_speed: number;
  dt_txt: string;
  
  constructor (
    temp: number,
    description: string,
    icon: string,
    wind_speed: number,
    dt_txt: string,
  ) {
    this.temp = temp;
    this.description = description;
    this.icon = icon;
    this.wind_speed = wind_speed;
    this.dt_txt = dt_txt;
  }
};
  
// // TODO: Complete the WeatherService class
class WeatherService {
  // // TODO: Define the baseURL, API key, and city name properties=
  private baseURL?: string;
  private apiKey?: string;
  name: string;
  
  constructor() {
    this.baseURL = process.env.API_BASE_URL || '';
    this.apiKey = process.env.API_KEY || '';
    this.name = '';
  }
  // // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    const query = `${this.baseURL}/geo/1.0/direct?q=${this.name}&limit=1&appid=${this.apiKey}`
    return query;
  }
  
  // // TODO: Create fetchLocationData method 
  private async fetchLocationData(query: string): Promise<Coordinates> {
    try {
      const response = await fetch(query);
      const rawLocationData: Coordinates[] = await response.json();
      return rawLocationData[0];
      } catch (err) {console.log(`Error:`, err);
        return err as Coordinates;
      }
    }
    
    // // TODO: Create destructureLocationData method
    private destructureLocationData(rawLocationData: Coordinates) {
      if (!rawLocationData) {throw new Error(`Try again, goofball. There's no city to be found`)}
      const destructuredLocationData: Coordinates = {
        name: rawLocationData.name,
        lat: rawLocationData.lat,
        lon: rawLocationData.lon,
        country: rawLocationData.country, 
        state: rawLocationData.state
      }; 
      return destructuredLocationData;
    }
    
    // // TODO: Create fetchAndDestructureLocationData method
    private async fetchAndDestructureLocationData(): Promise<Coordinates> {
      try{
        const geocode = this.buildGeocodeQuery();
        const coordinates: Coordinates = await this.fetchLocationData(geocode).then((data: Coordinates) =>
          this.destructureLocationData(data))
        return coordinates as Coordinates;
      } catch (err) {console.log(`Error:`, err);
        return err as Coordinates;
    }
  }
  
  // // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    const weatherQuery = `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${this.apiKey}`
    return weatherQuery;
  }
  
  // // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    try {
      const weatherData = await fetch(this.buildWeatherQuery(coordinates));
      const weatherDataArray = await weatherData.json();
      return weatherDataArray.list;
    } catch (err) {console.log(`Error:`, err);
      return err;
    }
  }
  
  // // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(weatherData: any) {
    if (!weatherData) {throw new Error(`We couldn't find any weather data for that city. ${this.name} must not exist`)}
    const currentWeather: Weather = {
      temp: weatherData[0].main.temp,
      description: weatherData[0].weather[0].main,
      icon: weatherData[0].weather[0].icon,
      wind_speed: weatherData[0].wind.speed,
      dt_txt: weatherData[0].dt_txt,
    }; 
    return currentWeather;
  }
  
  // // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: Weather[]) {
    const forecastArray: Weather[] = [currentWeather]
    const result = weatherData.filter((boot) => boot.dt_txt.includes(`12:00:00`)) 
    console.log(result);
    for (const sock of result) {
      forecastArray.push(
        new Weather(
          sock.temp,
          sock.description,
          sock.icon,
          sock.wind_speed,
          sock.dt_txt
          )
        )
      }
    }

  
  // // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    try{
      this.name = city;
      const coordinates = await this.fetchAndDestructureLocationData();
      const weatherData = await this.fetchWeatherData(coordinates) as Weather[];
      const currentWeather = this.parseCurrentWeather(weatherData);
      const forecastArray = this.buildForecastArray(currentWeather, weatherData);
      return forecastArray;
    } catch (err) {console.log(`Error:`, err);
      return err;
    }
  }
}

export default new WeatherService();
