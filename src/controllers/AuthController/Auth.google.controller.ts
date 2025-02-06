import { Request, Response, NextFunction } from "express";
import AppError from "../../errors/AppError";

class GoogleAuthController {
    constructor() {}
     
    public async googleLoginController(req: Request, res: Response, next: NextFunction): Promise<void> {
        res.redirect("/api/v1/auth/");
    }

    public async getUserController(req: Request, res: Response, next: NextFunction): Promise<void> {
        if (!req.user) {
            res.status(401).json(new AppError("User not found", 401));
            return;
        }
        res.status(200).json({messege: "User found", user: req.user});
    }

    public async logoutController(req: Request, res: Response, next: NextFunction): Promise<void> {
        req.logout((err) => {
            if (err) {
                return next(new AppError("Error logging out", 500, err));
            }
            req.session.destroy(() => {
                res.clearCookie('connect.sid');
                res.status(200).json({ message: "Logged out"   });
            });
        });
    }

    public async isLoggedIn(req: Request, res: Response, next: NextFunction): Promise<void> {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.status(401).json({ message: "User not authenticated" });
        }
    }
}

export default GoogleAuthController;