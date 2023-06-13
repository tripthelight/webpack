import dotenv from "dotenv";
dotenv.config();
import path from "path";
import fs from "fs";
import * as url from "url";
import express from "express";
import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import webpackConfig from "../../webpack.config.js";
import WebpackDevMiddleware from "webpack-dev-middleware";
import ROUTES from "../client/module/webpack/pages.js";

/**
 * VARIABLE
 */
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const APP = express();
const PORT = process.env.PORT || 5000;
const compiler = webpack(webpackConfig);
const DIST_PATH = "../../dist";
const ROUTE_PATH = "../../dist/views";

/**
 * MIDDLEWARE
 */
APP.use(
  WebpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    serverSideRender: true,
    writeToDisk: true,
  })
);
APP.use(express.static(path.join(__dirname, DIST_PATH)));

/**
 * ROUTERS
 */
ROUTES.html.map((name) => {
  return APP.get(name === "index" ? "/" : `/${name}`, (req, res) => {
    const fileUrl = name === "index" ? DIST_PATH : `${ROUTE_PATH}/${name}/`;
    const pathName = path.join(__dirname, fileUrl);
    fs.readdir(pathName, (err, files) => {
      if (err) {
        console.error(err);
        return res.status(500);
        // return res.sendFile(path.join(__dirname, ROUTE_PATH, "error/404.html"));
      }
      const fileName = files.find((file) => path.extname(file) === ".html");
      res.sendFile(path.join(__dirname, fileUrl, fileName));
    });
  });
});
// 404 exception handling
// APP.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, ROUTE_PATH, "error/404.html"));
// });
APP.use((req, res, next) => {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});
APP.use((err, req, res, next) => {
  res.status(err.status || 500);
  if (err.status === 404) {
    res.sendFile(path.join(__dirname, ROUTE_PATH, "error/404.html"));
  } else {
    res.sendFile(path.join(__dirname, ROUTE_PATH, "error/500.html"));
  }
});

/**
 * LISTEN
 */
APP.listen(PORT, () => {
  console.log(`Server is running\nhttp://localhost:${PORT}`);
});
