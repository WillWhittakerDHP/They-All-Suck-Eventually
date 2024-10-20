/*
! reference Section 9 Mini-project: 28-Stu_Mini_Project/Develop/server/src/service/parkService.ts
*/

import fs from 'node:fs/promises';
import dotenv from 'dotenv';
dotenv.config();

// // TODO: Define an interface for the Coordinates object
interface Coordinates {
  latitude: number;
  longitude: number;
}

// TODO: Define a class for the Weather object
class Weather {
}

// TODO: Complete the WeatherService class
class WeatherService {
  // // TODO: Define the baseURL, API key, and city name properties=
    private baseURL?: string;
    private apiKey?: string;
  
    constructor() {
      this.baseURL = process.env.API_BASE_URL || '';
      this.apiKey = process.env.API_KEY || '';
    }
  // // TODO: Create fetchLocationData method 
  // IS THIS URL okay?
  private async fetchLocationData(query: string) {
    try {
    const response = await fetch(`${this.baseURL}/${query}&api_key=${this.apiKey}`);
    const city = await response.json();
    const fetchedLocationData = await this.destructureLocationData(city.data);
    return fetchedLocationData;
    } catch (err) {console.log(`Error:`, err);
      return err;
    }
  }
  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {
  //   const destructuredLocationData: Coordinates[] = locationData.map((city) =>{
  //       const cityCoordinates: Coordinates = {  
  //       longitude: city.longitude,
  //       latitude: city.latitude,
  //     };
  //     return cityCoordinates;
  //   });
  //   return destructuredLocationData;
  // }
  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}
  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
}

export default new WeatherService();
