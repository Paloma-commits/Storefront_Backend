import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import product_routes from './handlers/products';
import user_routes from './handlers/user';
import order_routes from './handlers/orders';

const app: express.Application = express();
const address: string = '0.0.0.0:3000';

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

//give access to the routes from the server
product_routes(app);
user_routes(app);
order_routes(app);

export default app;

//"test": "ENV=test && db-migrate --env test up && jasmine-ts && db-migrate db:drop test",
//"start": "nodemon src/server.ts",
//"test": "npm run build && ENV=test && db-migrate up -c 4 --env test && jasmine && db-migrate down -c 4 --env test",
