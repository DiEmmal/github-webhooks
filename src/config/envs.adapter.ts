import 'dotenv/config';
import env from 'env-var';

export const ENVS = {

    PORT: env.get('PORT').required().asPortNumber() ?? process.env.PORT,

};