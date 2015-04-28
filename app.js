/**
 * Created by pzc on 15-3-26.
 */

var cheerio = require('cheerio');
var request = require('request');
var app=require('express')();

var options = {};

//app.engine('hbs', exhbs(hbshelper));
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'hbs');
//
for(var i=0;i<100;i++){
  options={
    url: 'http://www.douban.com/group/shanghaizufang/discussion?start='+(i*25),
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6',
      'Cache-Control': 'max-age=0',
      'Connection': 'keep-alive',
      'Cookie': 'bid="bFmN7ZKrx38"; ll="108296"; dbcl2="62641207:vklJJxeLqWw"; ck="H3B8"; ap=1; push_noty_num=0; push_doumail_num=0',
      'DNT': '1',
      'Host': 'www.douban.com',
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/41.0.2272.76 Chrome/41.0.2272.76 Safari/537.36 }'
      }
  };
  request(options, function (error, response, body) {
    var $ = null;
    var i = 0;
    var sCurText='';
    var searchText='天山小区';
    if (!error && response.statusCode == 200) {
      $ = cheerio.load(body,{decodeEntities: false})
      var regExp = new RegExp(searchText, 'g');
      var content=$('.olt').html();
      if (!regExp.test(content)) {
        return;
      } else {
        if (sCurText != searchText) {
          i = 0;
          sCurText = searchText;
        }
      }
      $('a').each(function(){
        var html = $(this).html();
        if(html.match(regExp)){
          console.log(this.attribs)
        }
      });
    }
  });
}

