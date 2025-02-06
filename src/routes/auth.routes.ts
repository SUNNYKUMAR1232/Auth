import { Router, Request, Response, NextFunction } from "express";
import { GithubAuth,GoogleAuth } from "../controllers/controller";
import { IAuthRoute } from "../interfaces/Auth.interfaces/auth.route.interface";
import PassportService, { providers } from "../services/passport";

class AuthRoute implements IAuthRoute {
    private readonly passport = new PassportService();
    private readonly GithubController: GithubAuth;
    private  router: Router;

    constructor() {
        this.router = Router();
        this.GithubController = new GithubAuth();
        this.initRoutes();
    }

    public async initRoutes(): Promise<void> {
        await this.GithubAuth();
        await this.GoogleAuth();
    }

    public async GithubAuth(): Promise<void> {
        this.router.get("/logout", this.wrapAsync(this.GithubController.LogoutController));
        this.router.get("/me", this.wrapAsync(this.GithubController.getUserController));
        this.router.get("/github",this.passport.getLogin(providers.GITHUB.name,providers.GITHUB.scope));
        this.router.get("/github/callback",this.passport.getCallback(providers.GITHUB.name,"/api/v1/auth"), (req,res ) => {
            res.redirect("/api/v1/auth");
        });
    }

    public async GoogleAuth(): Promise<void> {
        // Implement Google Auth
        this.router.get('/google', this.passport.getLogin(providers.GOOGLE.name,providers.GOOGLE.scope));
        this.router.get('/google/callback', this.passport.getLogin(providers.GOOGLE.name,providers.GOOGLE.scope), (req, res) => {
            res.redirect('/api/v1/auth');
        });
    }

    private wrapAsync(fn: Function) {
        return (req: Request, res: Response, next: NextFunction) => {
            Promise.resolve(fn(req, res, next)).catch(next);
        };
    }

    public getRoutes(): Router {
        return this.router;
    }
}

export default AuthRoute;