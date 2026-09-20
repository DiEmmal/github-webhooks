import 'dotenv/config';
import env from 'env-var';

export const ENVS = {

    PORT: env.get('PORT').asPortNumber() ?? process.env.PORT,
    DISCORD_WEBHOOK_URL: env.get('DISCORD_WEBHOOK_URL').required().asString(),

};