// /*
// ! reference Section 9 Mini-project: 28-Stu_Mini_Project/Develop/server/src/service/historyService.ts
// */

// import fs from 'node:fs/promises';
// import { v4 as uuid4 } from 'uuid';

// // // TODO: Define a City class with name and id properties
// class City {
//   name: string;
//   id: string;

//   constructor (
//     name: string,
//     id: string
//   ) {
//     this.name = name;
//     this.id = id;
//   }
// };


// // // TODO: Complete the HistoryService class
// class HistoryService {
//  //  // TODO: Define a read method that reads from the searchHistory.json file
//   private async read() {
//     return await fs.readFile('searchHistory.json', {flag: 'a+', encoding: 'utf8',});
//   }
//   // // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
//   private async write(cities: City[]) {
//     return await fs.writeFile('searchHistory.json', JSON.stringify(cities, null, '\t'));
//   }
//   // // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
//   async getCities() {
//     return await this.read().then((cities) => {
//       let parsedSearchedCities: City[];
//     try {
//       parsedSearchedCities = [].concat(JSON.parse(cities));
//     } catch (er) {
//       parsedSearchedCities = [];
//     }
//   return parsedSearchedCities});
//   }
//   // // TODO Define an addCity method that adds a city to the searchHistory.json file
//   async addCity(city: string) {
//     if (!city) {
//       throw new Error(`Hey Goofy, you can't add a new city to your search if you leave the "city" blank`);
//     }
//     const newCity: City = { name: city, id: uuid4() };
//     return await this.getCities()
//     .then((cities) => {
//       if (cities.find((index) => index.name === city)) {
//         return cities;
//       }
//       return [...cities, newCity];
//     })
//     .then ((updatedSearchedCities) => this.write(updatedSearchedCities))
//     .then(() => newCity);
//     }
  
//   // // TODO: Define a removeCity method that removes a city from the searchHistory.json file
//   async removeCity(id: string) {
//     return await this.getCities()
//     .then((cities) => cities.filter((cities) => cities.id !== id))
//     .then ((filteredCities) => this.write (filteredCities));
//   }
// }

// export default new HistoryService();
