import type { Request, Response } from "express";

export class GithubController {

    constructor() { };

    webhookHandler = (req: Request, res: Response) => {
        const githubEvent = req.header("x-github-event") ?? "unknown";
        const signature = req.header("x-hub-signature-256") ?? "unknown";
        // const payload = req.body;

        console.log({ githubEvent, signature });

        res.status(202).send("Request received!");

    };

    fetchGithubInfo = (req: Request, res: Response) => {

        res.status(200).send("Hello from GithubController, my gituhb account is: https://github.com/DiEmmal");

    };

};