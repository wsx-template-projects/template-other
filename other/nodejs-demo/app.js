const fs = require("fs");
const url = require("url");

const app = function (request, response) {
  // console.log("-req-", request, "-res-", response);
  console.log("-url-", request.url);
  //解析请求，包括文件名
  var pathname = url.parse(request.url).pathname;
  //输出请求的文件名
  console.log("Request for " + pathname + "  received.");

  let fileType = pathname.substr(1);
  console.log("-file-type-", fileType);
  //从文件系统中都去请求的文件内容
  fs.readFile(fileType, function (err, data) {
    if (err) {
      console.log(err);
      //HTTP 状态码 404 ： NOT FOUND
      //Content Type:text/plain
      response.writeHead(404, { "Content-Type": "text/html" });
    } else {
      //HTTP 状态码 200 ： OK
      //Content Type:text/plain
      response.writeHead(200, { "Content-Type": "text/html" });
      console.log("-data-", data);
      //相应内容
      response.write(data.toString()); // TODO: 页面输出
    }
    //发送响应数据
    response.end();
  });
};

module.exports = app;
