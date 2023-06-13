import dotenv from "dotenv";
dotenv.config();
import PAGES from "./pages.js";
import HtmlWebpackPlugin from "html-webpack-plugin";

const TEMPLATE = (_pages) => {
  if (_pages === "index") {
    return `./src/client/${_pages}.html`;
  } else if (_pages.includes("error")) {
    if (_pages === "error404") {
      return `./src/client/views/error/404.html`;
    }
    if (_pages === "error500") {
      return `./src/client/views/error/500.html`;
    }
  } else {
    return `./src/client/views/${_pages}.html`;
  }
};
const FILENAME = (_pages) => {
  const MODE = process.env.MODE === "development";
  if (_pages === "index") {
    return MODE ? `${_pages}.html` : `${_pages}.[contenthash].html`;
  } else if (_pages.includes("error")) {
    if (_pages === "error404") {
      return MODE ? `views/error/404.html` : `views/error/404.[contenthash].html`;
    }
    if (_pages === "error500") {
      return MODE ? `views/error/500.html` : `views/error/500.[contenthash].html`;
    }
  } else {
    return MODE ? `views/${_pages}/${_pages}.html` : `views/${_pages}/${_pages}.[contenthash].html`;
  }
};
const CHUNKS = (_pages) => {
  if (_pages === "index") {
    return [`${_pages}`];
  } else if (_pages.includes("error")) {
    if (_pages === "error404") {
      return [`error404`];
    }
    if (_pages === "error500") {
      return [`error500`];
    }
  } else {
    return [`${_pages}`];
  }
};

const RETURN_OBJ = (_pages) => {
  const values = [];

  const extract = (_pages) => {
    if (typeof _pages === "object") {
      if (Array.isArray(_pages)) {
        _pages.forEach((item) => extract(item));
      } else {
        for (let key in _pages) {
          extract(_pages[key]);
        }
      }
    } else {
      values.push(_pages);
    }
  };

  extract(_pages);
  return values;
};

const multipleHtmlPlugins = RETURN_OBJ(PAGES.html).map((name) => {
  return new HtmlWebpackPlugin({
    template: TEMPLATE(name),
    filename: FILENAME(name),
    chunks: CHUNKS(name),
    inject: "body",
    minify: false,
  });
});

export default multipleHtmlPlugins;
