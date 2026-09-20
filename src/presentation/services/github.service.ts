import type { GithubStarEvent } from "../../interfaces/github-star.interface.js";

export class GithubService {

    constructor() { };

    onStarEvent = (payload: GithubStarEvent): string => {
        const { starred_at, sender, repository, action } = payload;

        return starred_at
            ? `User ${sender.login} starred the repository ${repository.full_name} at ${starred_at}.`
            : `User ${sender.login} deleted their star from the repository ${repository.full_name}.`;

    };

    onWatchEvent = (payload: any): string => {
        const { sender, repository } = payload;

        return `User ${sender.login} is watching the repository ${repository.full_name}.`;

    };

};