import { Router, type Request, type Response } from 'express';
// import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

const router = Router();

// TODO: POST Request with city name to retrieve weather data
//23/mod/ser/src/rout/tiproutes
router.post('/', (req: Request, res: Response) => {
  const { cityName } = req.body;
  if (req.body) {
    await WeatherService.getWeatherForCity(cityName);
    res.json('City request successful');
  } else {
    res.send(`Error requesting city`);
  }
});

// TODO: GET weather data from city name
  router.get('/', async (req: Request, res: Response) => {
    const { cityName } = req.body;
    const weatherData = await WeatherService.getWeatherForCity(cityName);
    res.json(weatherData)});

// TODO: save city to search history
  router.delete('/history/:id', async (req: Request, res: Response) => {});

// TODO: GET search history
router.get('/history', async (req: Request, res: Response) => {});

// TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {});

export default router;
