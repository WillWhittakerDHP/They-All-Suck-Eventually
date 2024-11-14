import { Router, type Request, type Response } from 'express';
const router = Router();

// import HistoryService from '../../service/historyService.js';
// import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
//23/mod/ser/src/rout/tiproutes
router.post('/', (req: Request, res: Response) => {
  // // This API route ("/api/tips") is a POST Route for a new UX/UI tip
  // router.post('/', async (req: Request, res: Response) => {
  //   const { username, topic, tip } = req.body;
  //   if (req.body) {
  //     await TipService.addTip(username, topic, tip);
  //     res.json('Tip added successfully');
  //   } else {
  //     res.send('Error in adding tip');
  //   }
  // });
  // TODO: GET weather data from city name
    //router.get('/history', async (req: Request, res: Response) => {});
//     // This API route ("/api/tips") is a GET Route for retrieving all the tips
    // router.get('/', async (req: Request, res: Response) => {
    //   console.info(`${req.method} request received for tips`);
    //   const data = await TipService.getTips();
    //   res.json(data);
    // });
  // TODO: save city to search history
    //router.delete('/history/:id', async (req: Request, res: Response) => {});
});

// This API route ("/api/tips") is a GET Route for retrieving all the tips
router.get('/', async (req: Request, res: Response) => {
  console.info(`${req.method} request received for tips`);
  const data = await TipService.getTips();
  res.json(data);
});

// TODO: GET search history
router.get('/history', async (req: Request, res: Response) => {});
  // This API route ("/api/tips") is a GET Route for retrieving all the tips
    // router.get('/', async (req: Request, res: Response) => {
    //   console.info(`${req.method} request received for tips`);
    //   const data = await TipService.getTips();
    //   res.json(data);
    // });

// TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {});

export default router;
