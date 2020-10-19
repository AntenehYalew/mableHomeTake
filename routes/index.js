module.exports = function (app) {
    //import all routes
    app.use(require("./novariant"));
    app.use(require("./multiplevariant"));
    app.use(require("./productoption"));
  };
  