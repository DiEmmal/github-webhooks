import type { GithubStarEvent } from "../../interfaces/github-star.interface.js";

export class GithubService {

    constructor() { };

    private static formatDate = (dateString: string): string => {
        const date = new Date(dateString);

        return date.toLocaleString("en-US", { timeZone: "UTC" }).replace(",", "");
    };

    onStarEvent = (payload: GithubStarEvent): { message: string; user: string } => {
        const { starred_at, sender, repository, action } = payload;

        return starred_at
            ? { message: `Starred the repository ${repository.full_name} at ${starred_at}.`, user: sender.login }
            : { message: `Deleted their star from the repository ${repository.full_name}.`, user: sender.login };

    };

    onWatchEvent = (payload: any): { message: string; user: string } => {
        const { sender, repository } = payload;

        return { message: `Is watching the repository ${repository.full_name}.`, user: sender.login };

    };

    onPushEvent = (payload: any): { message: string; user: string } => {
        const { sender, repository, ref, commits } = payload;

        return { message: `Pushed to the repository ${repository.full_name} on branch ${ref}. Commits: ${commits.map((commit: any) => commit.message).join(", ")}`, user: sender.login };
    };

};