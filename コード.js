function doGet(e) {
  // let page = 'index';
  const template = HtmlService.createTemplateFromFile('index').evaluate();

  template
    .setTitle('位置情報を記録')
    // .setFaviconUrl('https://drive.google.com/uc?id=1jDk8h0egYxfKbTTX0YNs-cTHd93Xi68O&.png')//ファビコン
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
 
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  return template;

}

function getScriptUrl() {
  var url = ScriptApp.getService().getUrl();
  return url;
}


function getAppUrl() {
  return ScriptApp.getService().getUrl();
}

function doSubmitAjax(req) {
    const params = req.parameters;
    const resObj = {};
    insertRecord(params);
    return resObj;
}
  
function insertRecord(param){
    // let reservationTime = 0;
    // const fromDate = new Date(param.calendar_date_from +' ' + param.calendar_time_from);
    // const toDate = new Date(param.calendar_date_to + ' ' + param.calendar_time_to);
    // const diffDate = toDate.getTime() - fromDate.getTime();
    // const diffMinute = Math.floor(diffDate / (60000));
    // reservationTime = diffMinute/60;
//ID生成
var uuid =  Math.round(Math.random() * 1e16);

//日付文字列変換
let now = new Date();
var jsyear = now.getFullYear();
  var jsmonth = now.getMonth()+1;
  var jsdate = now.getDate();
  var jsday = now.getDay();
  var ary = [ "日", "月", "火", "水", "木", "金", "土" ];
  var week = ary[jsday];
  var nowday = jsyear + "年" + jsmonth +"月" + jsdate + "日" + week;

//時間文字列変換
var atime = now.getHours();
var btime = now.getMinutes();
var ctime = now.getSeconds();
var dtime = now.getMilliseconds();
var nowtime = atime + "時" + btime + "分" + ctime + "秒" + dtime + "ミリ"
var nokori = '=IFERROR(DATEDIF(TODAY(),INDEX(I:I,ROW(),1),' + '"' + 'D' + '"' + ')+1,0)';
var hyouzi = '=if(index(P:P,ROW(),1)>0,' + '"' + 'on' + '"' + ',' + '"' + 'off' + '"' + ')';

    //この順番にスプレッドシートに格納される
    const data = [[
      uuid,
      param.user_id, 
      param.user_name, 
      param.color,
      param.calendar_date_from,
      param.calendar_date_to,
      param.comment,
      now,
      param.day,
      jsyear,
      jsmonth,
      jsdate,
      week,
      atime,
      btime,
      nokori,
      hyouzi,
    ]];
    //SPREAD_SHEET_IDは連携するスプレッドシートのID、SHEET_NAMEはシート名をそれぞれ置き換えてください。
    const app = SpreadsheetApp.openById('1_sWTOPlUJc2vHUYhtgouy5_DfzHU-yayC_X0MGFyvgU');
    const sheet = app.getSheetByName('シート1');
    const insertRow = sheet.getDataRange().getLastRow() + 1;  //挿入行
    const insertCol = 1;  //挿入列
    const insertRowNum = data.length;  //挿入行数
    const insertColNum = data[0].length;  //挿入列数(データ数)
    const insertRange = sheet.getRange(insertRow, insertCol,insertRowNum,insertColNum);
    insertRange.setValues(data);
//     checkUpdate(msg);
// }

// function checkUpdate(msg){
  // var ACCESS_TOKEN = 'oYAWh7l+clyfvdqnm1nbZcaTsTqfCD1qpxb5inHP4lURm3fNGBdqMrbYpVJ8XNNRVfe9Au6I1ICGyycUGNouTwK8zoFpTPqcodcswg4wrSJXXa7X3rl6WPgkTbvslfaXseYbFa2VDvrc0l5f+7sGpAdB04t89/1O/w1cDnyilFU=';
  // var url = 'https://api.line.me/v2/bot/message/push';
  // var toID = 'Cbe2b39dc2995b5d7dcbfe0e0a6bd8b12';//前回取得したグループID
  var ss = SpreadsheetApp.openById("1_sWTOPlUJc2vHUYhtgouy5_DfzHU-yayC_X0MGFyvgU");
  var mySheet = ss.getSheetByName("シート1");//シートを取得
  // var myCell = mySheet.getActiveCell(); //アクティブセルを取得
  var row = mySheet.getLastRow();
  var q1 = mySheet.getRange(row, 2).getValue();
  var q2 = mySheet.getRange(row, 3).getValue();
  var q6 = mySheet.getRange(row, 7).getValue();
  var q4 = mySheet.getRange(row, 5).getValue();
  var q5 = mySheet.getRange(row, 6).getValue();
  var message = q4 + "が位置情報を記録したよ！\n\n【タイトル】\n" + q5 + "\n【説明】\n" + q6 + "\n【座標】\n" + q1 +"," + q2;
  var mapimage = "https://api.mapbox.com/styles/v1/ensyuringis/cl2looxui000z14nq96jd4mus/static/pin-l-a+ff0000(" + q2 + "," + q1 + ")/" + q2 + "," + q1 + ",16.28,0,0/600x600@2x?access_token=pk.eyJ1IjoiZW5zeXVyaW5naXMiLCJhIjoiY2t6cHBhdHp2MDFlMTJ3bmRsNzY4dTlkbiJ9.BtuWDU9uyDaR5Var2Y6-4A"

  const googlemap = "https://www.google.com/maps?q=" + q1 +"," + q2;

  // UrlFetchApp.fetch(url, {
  //   'headers': {
  //     'Content-Type': 'application/json; charset=UTF-8',
  //     'Authorization': 'Bearer ' + ACCESS_TOKEN,
  //   },
  //   'method': 'POST',
  //   'payload': JSON.stringify({
  //     'to': toID,
  //     'messages':[
  //       {
  //       'type': 'text',
  //       'text': message ,
  //     },
  //     {
  //   "type": "image",
  //   "originalContentUrl": mapimage,
  //   "previewImageUrl": mapimage,
  //     },
  //     ]
  //    })
  //  })


//メールアドレスの宛先を記述する
let address = "satoshi7190@gmail.com";
//メールの件名を記述する
let mailTitle = "演習林GIS記録通知";
//メール本文を記述する
let mailText = message + "<br>" + googlemap + "<br><img src='" +
    mapimage +
    "' width='80%'>";
//オプションでHTMLメール本文を設定する
let options = {
"htmlBody":mailText,
};
//MailAppで宛先、件名、本文、添付ファイルを引数にしてメールを送付
MailApp.sendEmail(address, mailTitle, mailText, options);




}




