import express, { Application, Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
dotenv.config();
import "./config/envConfig";
import cors from "cors";
import Database from "./config/DB";
import { GlobalRoutes } from "./routes/routes";
import morganConfig from "./config/morganConfig";
import CorsConfig from "./config/corsConfig";
import helmetConfig from "./config/HelmetConfig";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import BodyParser from "body-parser";
import csrf from "csurf";
import cookieParser from "cookie-parser";
import createHttpError from "http-errors";
import path from "path";
import pluralize from "pluralize";
import ejs from "ejs";

console.log({
  URL: process.env.MONGO_URI,
  NODE_ENV: process.env.NODE_ENV,
});

const options = {
  secret: process.env.SECRET || "your_secret_key",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl:
      process.env.MONGO_URI ||
      "mongodb+srv://sunnykumar232327zz7JuKTlw0LAJWm:7zz7JuKTlw0LAJWm@cluster0.9w00dzc.mongodb.net",
    collectionName: "sessions",
  }),
  cookie: {
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    maxAge: 1000 * 60  , // 1 minute
  },
};
class App {
  private readonly App: Application = express();
  private readonly PORT: string | number = process.env.PORT || 5000;
  private readonly HOST: string = process.env.HOST || "localhost";
  constructor() {
    this.init();
  }
  private init() {
    this.initConfig();
    this.initMiddlewares();
    this.initPassport();
    this.initRoutes();
    this.initErrorHandling();
  }
  private initConfig() {
    new Database();
  }
  private initMiddlewares() {
    this.App.use(session(options));
    this.App.use(express.json());
    this.App.use(BodyParser.json());
    this.App.use(BodyParser.urlencoded({ extended: true }));
    this.App.use(cookieParser());
    this.App.use(csrf({ cookie: true }));
    this.App.use(passport.authenticate("session"));
    this.App.use(cors());
    morganConfig.init(this.App);
    helmetConfig.init(this.App);
    CorsConfig.init(this.App);
    dotenv.config();
    // view engine setup
    this.App.set('views', path.join(__dirname, 'views'));
    this.App.set('view engine', 'ejs');

    this.App.locals.pluralize = pluralize;
  }
  private initRoutes() {
    this.App.use("/api/v1/", new GlobalRoutes().getRoutes());
  }
  private initErrorHandling() {
    // Middleware for handling messages
    this.App.use((req: any, res: Response, next: NextFunction) => {
      const msgs = req.session.messages || [];
      res.locals.messages = msgs;
      res.locals.hasMessages = !!msgs.length;
      req.session.messages = [];
      next();
    });

    // Middleware for setting CSRF token
    this.App.use((req: any, res: Response, next: NextFunction) => {
      res.locals.csrfToken = req.csrfToken();
      next();
    });

    // Middleware for handling 404 errors
    this.App.use((req: Request, res: Response, next: NextFunction) => {
      next(createHttpError(404));
    });

    // General error handling middleware
    this.App.use(
      (err: any, req: Request, res: Response, next: NextFunction) => {
        res.locals.message = err.message;
        res.locals.error = req.app.get("env") === "development" ? err : {};

        res.status(err.status || 500);
        res.status(404).json({
            message: err.message,
            error: err
            });
      }
    );
  }
  private initPassport() {
    this.App.use(passport.initialize());
    this.App.use(passport.session());
  }
  public listen() {
    this.App.listen(this.PORT, () => {
      console.log(`Server is running on http://${this.HOST}:${this.PORT}`);
    });
  }
}

export default App;
