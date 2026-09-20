import type { Request, Response } from "express";
import { GithubService } from "../services/github.service.js";
import { DiscordService } from "../services/discord.service.js";

export class GithubController {

    constructor(
        private readonly githubService = new GithubService(),
        private readonly discordService = new DiscordService(),
    ) { };

    webhookHandler = (req: Request, res: Response) => {
        const githubEvent = req.header("x-github-event") ?? "unknown";
        // const signature = req.header("x-hub-signature-256") ?? "unknown";
        const payload = req.body;
        let message: string;

        switch (githubEvent) {
            case "star":
                message = this.githubService.onStarEvent(payload);
                break;
            case "watch":
                message = this.githubService.onWatchEvent(payload);
                break;
            default:
                message = `Unhandled event: ${githubEvent}`;
        };

        this.discordService.notify(message)
        .then(() => res.status(202).send('Request received!'))
        .catch(() => res.status(500).send('Failed to send notification to Discord.'));

    };

    fetchGithubInfo = (req: Request, res: Response) => {

        res.status(200).send("Hello from GithubController, my gituhb account is: https://github.com/DiEmmal");

    };

};