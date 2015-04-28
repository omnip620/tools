/**
 * Created by pzc on 15-3-27.
 */
var fs=require('fs');
var path=require('path');
var out = process.stdout;

var filePath='./public/zh-hans_windows_xp_professional_with_service_pack_3_x86_cd_vl_x14-74070.iso';
var readStream=fs.createReadStream(filePath);
var writeStream=fs.createWriteStream('file.iso');

var stat=fs.statSync(filePath);

var totalSize = stat.size;
var passedLength = 0;
var lastSize = 0;
var startTime = Date.now();

readStream.on('data', function(chunk) {

  passedLength += chunk.length;

  if (writeStream.write(chunk) === false) {
    readStream.pause();
  }
});

readStream.on('end', function() {
  writeStream.end();
});

writeStream.on('drain', function() {
  readStream.resume();
});

setTimeout(function show() {
  var percent = Math.ceil((passedLength / totalSize) * 100);
  var size = Math.ceil(passedLength / 1000000);
  var diff = size - lastSize;
  lastSize = size;
  out.write('\n');
  out.write('已完成' + size + 'MB, ' + percent + '%, 速度：' + diff * 2 + 'MB/s');
  if (passedLength < totalSize) {
    setTimeout(show, 500);
  } else {
    var endTime = Date.now();
    console.log();
    console.log('共用时：' + (endTime - startTime) / 1000 + '秒。');
  }
}, 500);