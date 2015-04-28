var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017/testdb';
var dataList = []
var globalCount = 0
console.time('insert,10w');
MongoClient.connect(url, {
  server: {
    poolSize: 50
  }
},function(err, db) {
  if(err) throw(err)

  var listData = []
  for(var i=0; i<100000; i++){
    listData.push({
      count:i
    })
  }
  db.collection('test1').insert(listData,function(err,results){
    if(err){
      console.log(err)
    }else{
      console.log(results)
    }
  });
  console.timeEnd('insert,10w');
});