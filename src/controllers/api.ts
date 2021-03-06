"use strict";

import * as async from "async";
import * as request from "request";
import * as graph from "fbgraph";
import { Response, Request, NextFunction } from "express";

/**
 * Get /api
 * List of API example.
 */

 export let getApi = (req: Request, res: Response) => {
    res.render("api/index", {
        title: "API Example"
    });
 };

 /**
  * GEt /api/facebook
  * Facebook API exemple
  */
  export let getFacebook = (req: Request, res: Response, next: NextFunction) => {
    const token = req.user.tokens.find((token: any) => token.kind === "facebook");
    graph.setAccessToken(token.accessToken);
    graph.get(`${req.user.facebook}?fields=id,name,email,first_name,last_name,gender,link,locale,timezone`, (err: Error, results: graph.FacebookUser) => {
       if (err) { return next(err); }
       res.render("api/facebook", {
           title: "Facebook API",
           profile: results
       });
    });
  };