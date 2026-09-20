import express from "express";
import { ENVS } from "./config/envs.adapter.js";
import { GithubController } from "./presentation/github/controller.js";

(async () => {
    main();
})();

function main() {
    const app = express();
    const githubController = new GithubController();

    app.use(express.json());

    app.get("/api/github", githubController.fetchGithubInfo);
    app.post("/api/github", githubController.webhookHandler);

    app.listen(ENVS.PORT, () => {
        console.log(`Server running on port ${ENVS.PORT}`);
    });
};