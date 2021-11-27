import express from 'express';
import { json } from 'express';
import dotenv from 'dotenv';
import path from 'path';

import { makeUserController } from './factories/makeUserController';
const app = express()

app.use(json())
app.use('/api',makeUserController().router)
export default app
