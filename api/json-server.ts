// https://github.com/typicode/json-server/issues/833#issuecomment-463154781

import { calls } from './calls';
import jsonServer from 'json-server';

const server = jsonServer.create();
const middlewares = jsonServer.defaults({
  readOnly: true,
});
const router = jsonServer.router(calls);
const port = 3030;

server.use(middlewares);
server.use(router);
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
