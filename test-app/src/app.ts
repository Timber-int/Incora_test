import 'reflect-metadata';
import express from 'express';
import http from 'http';
import { createConnection } from 'typeorm';
import SocketIO from 'socket.io';

import { apiRouter } from './routes';
import { config } from './config';

const app = express();
const server = http.createServer(app);

// @ts-ignore
export const io = SocketIO(server, { cors: { origin: '*' } });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter);

const { PORT } = config;

server.listen(PORT, async () => {
    console.log(`Server has been started on ${PORT} port...`);
    try {
        const connection = await createConnection();
        if (connection) {
            console.log('Database connected...');
        }
    } catch (e) {
        if (e) {
            console.log(e);
        }
    }
});
