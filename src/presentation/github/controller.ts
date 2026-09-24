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
        const payload = req.body;
        let notifyData: { message: string; user: string };

        switch (githubEvent) {
            case "star":
                notifyData = this.githubService.onStarEvent(payload);
                break;
            case "watch":
                notifyData = this.githubService.onWatchEvent(payload);
                break;
                case "push":
                notifyData = this.githubService.onPushEvent(payload);
                break;
            default:
                notifyData = { message: `Unhandled Github event: ${githubEvent}`, user: '' };
        };

        this.discordService.notify(notifyData.message, notifyData.user)
        .then(() => res.status(202).send('Request received!'))
        .catch(() => res.status(500).send('Failed to send notification to Discord.'));

    };

    fetchGithubInfo = (req: Request, res: Response) => {

        res.status(200).send("Hello from GithubController, my gituhb account is: https://github.com/DiEmmal");

    };

};