import { ENVS } from "../../config/envs.adapter.js";

export class DiscordService {

    constructor(
        private readonly webhookUrl = ENVS.DISCORD_WEBHOOK_URL
    ) { };

    async notify(message: string): Promise<boolean> {

        const body = {
            content: message,
            embeds: [
                { image: { url: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHBkNjV2Y2JqMzJlbHp0M3J0ZXpqOXc4ZW9xaDVudGoxbjR0aXVzZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/paoX8smVvbggCXLu80/giphy.gif" } }
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