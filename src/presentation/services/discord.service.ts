import { ENVS } from "../../config/envs.adapter.js";

export class DiscordService {

    constructor(
        private readonly webhookUrl = ENVS.DISCORD_WEBHOOK_URL
    ) { };

    async notify(message: string, user: string): Promise<boolean> {

        const body = {
            content: `User ${user} triggered a Github event:`,
            embeds: [
                { 
                    title: "Github Event",
                    description: message,
                }
            ],
        };

        const response = await fetch(this.webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            console.log(`Failed to send notification to Discord. Status: ${response.status}`);
            return false;
        };

        return true;

    };

};