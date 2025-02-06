import { Router } from "express";

export interface IAuthRoute {
  initRoutes(): Promise<void>;
  GithubAuth(): Promise<void>;
  GoogleAuth(): Promise<void>;
  getRoutes(): Router;
}