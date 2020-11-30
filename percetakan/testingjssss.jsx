var path = app.activeDocument;
path = path.replace(/\//gi, "");
path = path.replace(/%20/gi, " ");
path = path.replace(/\\/gi, "\/");
alert (path);
var path = document.location.pathname;