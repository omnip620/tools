/**
 * Created by pzc on 15-4-22.
 */
var fs = require('fs');
var http = require('http');

var data = fs.readFileSync('/etc/hosts', 'UTF8');
data = data.substring(0, data.indexOf('#+BEGIN'))
http.get("http://www.findspace.name/adds/hosts2", function (res) {
  var host = '';
  res.on('data', function (result) {
    host += result;
  });
  res.on('end', function () {
    fs.writeFile('/etc/hosts', data + host, 'UTF8', function (err, data) {
      if (err) throw err;
    })
  })
}).on('error', function (e) {
  console.log("Got error: " + e.message);
});

