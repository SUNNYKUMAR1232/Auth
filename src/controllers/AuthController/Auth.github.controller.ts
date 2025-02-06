import { Request, Response, NextFunction } from "express"; // Added import
import IAuthGithub from "../../interfaces/Auth.interfaces/auth.github.interface";
class GithubAuth implements IAuthGithub {
    constructor() { }
    public async githubLoginController(_req: Request, res: Response, _next: NextFunction): Promise<void> {
        res.redirect("/api/v1/auth");
    }

    public async getUserController(req: Request, res: Response, _next: NextFunction): Promise<void> {
        if (!req.user) {
            res.status(401).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ user: req.user });
    }

    public async LogoutController(req: Request, res: Response, next: NextFunction): Promise<void> {
        req.logout((err) => {
            if (err) {
                return next(err);
            }
            req.session.destroy(() => {
                res.clearCookie('connect.sid');
                res.status(200).json({ message: "Logged out" });
            });
        });
    }

    public async isLoggedIn(req: Request, res: Response, next: NextFunction): Promise<void> {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect("/api/v1/auth/github");
    }
}

export default GithubAuth;