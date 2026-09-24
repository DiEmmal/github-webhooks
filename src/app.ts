import express from "express";
import { ENVS } from "./config/envs.adapter.js";
import { GithubController } from "./presentation/github/controller.js";
import { GithubSha256Middleware } from "./presentation/middlewares/github-sha256.middleware.js";

(async () => {
    main();
})();

function main() {
    const app = express();
    const githubController = new GithubController();

    app.use(express.json());

    app.get("/", githubController.fetchGithubInfo);
    app.post("/api/github", [GithubSha256Middleware.verifyGithubSignature],githubController.webhookHandler);

    app.listen(ENVS.PORT, () => {
        console.log(`Server running on port ${ENVS.PORT}`);
    });
};