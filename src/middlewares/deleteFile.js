module.exports.dele = async (path) => {
  var fs = require("fs");
  fs.unlink(path, function (err) {
    if (err) throw err;
  });
};
