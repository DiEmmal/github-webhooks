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

    app.post("/api/github", (req, res) => {
        githubController.webhookHandler(req, res);
    });

    app.listen(ENVS.PORT, () => {
        console.log(`Server running on port ${ENVS.PORT}`);
    });
};