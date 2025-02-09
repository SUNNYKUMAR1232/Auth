// import { createLogger, format, transports } from "winston";
// import fancyLog from "fancy-log";
// import { Application, Request, Response, NextFunction } from "express";

// class LoggerConfig {
//     private logger: any;

//     constructor() {
//         this.logger = createLogger({
//             level: "info",
//             format: format.combine(
//                 format.timestamp(),
//                 format.json()
//             ),
//             transports: [
//                 new transports.Console({
//                     format: format.combine(
//                         format.colorize(),
//                         format.simple()
//                     )
//                 })
//             ],
//         });
//     }

//     public init(app: Application): void {
//         app.use((req: Request, res: Response, next: NextFunction) => {
//             this.logger.info(`${req.method} ${req.url}`);
//             fancyLog.info(`${req.method} ${req.url}`);
//             next();
//         });
//     }

//     public getLogger() {
//         return this.logger;
//     }
// }

// export default new LoggerConfig();
