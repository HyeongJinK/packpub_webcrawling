//packpub.com 웹크롤링

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
var request = require("sync-request");  
var cheerio = require("cheerio");
var fs =require('fs');
var num = 0; 

var url = "https://www.packtpub.com/all-books?search=&availability_list%5BAvailable%5D=Available&offset=&rows=48&sort=&theme_raw=true";
var checked = true;

let isbnlist = "";

while(checked) {
  console.log(num / 4751 * 100 +"%")
  url = "https://www.packtpub.com/all-books?search=&availability_list%5BAvailable%5D=Available&offset="+num+"&rows=48&sort=&theme_raw=true";
  
  var res = request("GET", url);
  var body = res.body.toString('utf-8');
  
  let $ = cheerio.load(body);
  let postElements = $("div.book-block-outer[data-product-id]");
 // console.log(postElements)
  postElements.each(function() {
  //console.log($(this).attr("data-product-id"));   //isbn
    isbnlist = isbnlist + $(this).attr("data-product-id") + "\t"
  });
  num += 48;
 
  if (num > 4751) {
    checked = false;
  }
}

// 비동기 방식으로 파일을 생성. 함수의 인자는 앞에서 부터 순서대로 파일명, 입력데이터, 인코딩, 콜백함수
fs.writeFileSync("isbn.txt", isbnlist, 'utf-8', function(e){
  if(e){
      // 파일생성 중 오류가 발생하면 오류출력
      console.log(e);
  }else{
      // 파일생성 중 오류가 없으면 완료 문자열 출력
      console.log('WRITE DONE!');
  }
});