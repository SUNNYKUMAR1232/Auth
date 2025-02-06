import morgan, { StreamOptions } from "morgan";
import { Request, Response, NextFunction,Application } from "express";
class MorganConfig {
    private format: string;

    constructor() {
        // Define custom token for Morgan
        morgan.token("custom", (req:Request, res:Response) => {
            return [
                req.method,
                req.url,
                res.statusCode,
                res.get("Content-Length") || 0,
                "-",
                `${new Date().toUTCString()}`
            ].join(" ");
        });

        // Define Morgan format
        this.format = ":custom";
    }

    public init(app: Application): void {
        app.use(morgan(this.format, {
            stream: process.stdout as StreamOptions
        }));
    }
}

export default new MorganConfig();