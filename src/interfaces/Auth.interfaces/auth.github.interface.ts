// Purpose: Interface for the Github Auth Controller.
import { Request, Response, NextFunction } from "express";
interface IAuthGithub {
    githubLoginController(req: Request, res: Response, next: NextFunction): Promise<void>;
    getUserController(req: Request, res: Response, next: NextFunction): Promise< void>;
    LogoutController(req: Request, res: Response, next: NextFunction): Promise<void>;
    isLoggedIn(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export default IAuthGithub;