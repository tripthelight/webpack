import PAGES from "./pages.js";

let jsArr = new Object();
const JS_PATH = "./src/client/js";
const ERR_PATH = "./src/client/js/error";
for (let i = 0; i < PAGES.js.length; i++) {
  const JS_PAGES = PAGES.js[i];

  if (typeof JS_PAGES === "object") {
    for (let i = 0; i < JS_PAGES.error.length; i++) {
      if (JS_PAGES.error[i] === "error404") {
        jsArr[JS_PAGES.error[i]] = `${ERR_PATH}/404.js`;
      } else if (JS_PAGES.error[i] === "error500") {
        jsArr[JS_PAGES.error[i]] = `${ERR_PATH}/500.js`;
      }
    }
  } else {
    if (JS_PAGES === "index") {
      jsArr[JS_PAGES] = `${JS_PATH}/${JS_PAGES}.js`;
    } else {
      jsArr[JS_PAGES] = `${JS_PATH}/${JS_PAGES}/${JS_PAGES}.js`;
    }
  }
}

const multipleJsPlugins = jsArr;

export default multipleJsPlugins;
