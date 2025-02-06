import { Router, Request, Response } from "express";
import AuthRoute from "./auth.routes";

export class GlobalRoutes {
    private readonly router: Router;
    
    constructor() {
        this.router = Router();
        this.registerRoutes();
    }

    private registerRoutes() {
        this.router.get('/health', (_req: Request, res: Response) => {
            res.status(200).json({ status: 'OK' });
        });
        this.router.get('/', (_req: Request, res: Response) => {
            res.status(200).json({ message: 'Welcome to the API' });
        });
        this.router.use('/auth/', new AuthRoute().getRoutes());
        // Add more routes here
    }

    getRoutes() {
        return this.router;
    }
}