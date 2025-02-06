import morgan, { StreamOptions } from "morgan";
import { Request, Response, NextFunction, Application } from "express";
import chalk from "chalk";

class MorganConfig {
    private format: string;
    private Time: string;

    constructor() {
        // Define custom token for Morgan
        morgan.token("custom", (req: Request, res: Response) => {
            const method = chalk.blue(req.method);
            const url = chalk.green(req.url);
            const status = res.statusCode < 400 ? chalk.green(res.statusCode.toString()) : chalk.red(res.statusCode.toString());
            const contentLength = chalk.yellow(res.get("Content-Length") || "0");
            const responseTime = chalk.magenta(`${this.Time} ms`);
            const date = chalk.cyan(new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }));

            return [
                method,
                url,
                status,
                contentLength,
                "-",
                responseTime,
                date.toUpperCase()
            ].join(" ");
        });

        // Define Morgan format
        this.format = ":custom";
    }

    public init(app: Application): void {
        // Add response time header
        app.use((req: Request, res: Response, next: NextFunction) => {
            const startHrTime = process.hrtime();
            res.on("finish", () => {
                const elapsedHrTime = process.hrtime(startHrTime);
                const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
                this.Time= elapsedTimeInMs.toFixed(3);
            });
            next();
        });

        app.use(morgan(this.format, {
            stream: process.stdout as StreamOptions
        }));
    }
}

export default new MorganConfig();