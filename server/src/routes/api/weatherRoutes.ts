import { Router, type Request, type Response } from 'express';
// import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

const router = Router();

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  const { cityName } = req.body;
  try{
    console.log(cityName);
      const weatherResponse = await WeatherService.getWeatherForCity(cityName);
      res.json(weatherResponse);
      console.log ("ding", weatherResponse);
  } catch (err) { console.log (`Error`, err)}
});

// // TODO: GET weather data from city name
//   router.get('/', async (req: Request, res: Response) => {
//     const { cityName } = req.body;
//     const weatherData = await WeatherService.getWeatherForCity(cityName);
//     res.json(weatherData)});

// // TODO: save city to search history
//   router.delete('/history/:id', async (req: Request, res: Response) => {});

// // TODO: GET search history
// router.get('/history', async (req: Request, res: Response) => {});

// // TODO: DELETE city from search history
// router.delete('/history/:id', async (req: Request, res: Response) => {});

export default router;
