var express = require("express")
var fso = require("fs")
var app = express()
var path = require("path")
app.use(express.static(path.join(__dirname, "files/")));
app.get("/kyukyuhp",function(req,res){
    
    var lines = new Array()
    lines = fso.readFileSync('acedip.txt', 'utf-8').trim().split(/\r?\n/);
    for (var index = 0;index < lines.length;index = index + 1) {
        if (lines[index] == req.ip) {
            console.log("来たことある訪問者" + req.ip)
            res.sendFile(path.join(__dirname,"files/index.htm"))
            return
        } else {
        }
    }
    fso.appendFile("acedip.txt",req.ip + "\n",function(err,data){
        console.log("来た事ない訪問者" + req.ip)
        if (err) {
            res.send("<h1>Error!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!</h1>")
        }
    })
    fso.readFile(path.join(__dirname,"files/human.htm"),"utf8",function(err,data) {
        var now = Number(data)
        now = now + 1
        now = String(now)
        fso.writeFile(path.join(__dirname,"files/human.htm"),now,function(err) {
            if (err) {
                res.send("<h1>Error!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!</h1>")
            }
        })
    })
    res.sendFile(path.join(__dirname,"files/index.htm"))
})
app.get("/message",function(req,res) {
    var add = req.query.chat
    var name = req.query.name
    if (add == undefined) {

    } else {
        var now = new Date()
        if (name == "") return
        if (add == "") return
    fso.appendFile("chat.txt",`${now.getFullYear() - 26 }/${now.getMonth() + 1}/${now.getDate()}` + "[" + name + "]" + add + "<br>","utf8",function(err){
        console.log(new Date() + "BBSにﾁｬｯﾄされました  [" + name + "]" + "  " + add)
        if(err) {
            res.send("<h1>Error!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!</h1>")
        } else {

        }
    })
    }

    var data
    fso.readFile("chat.txt","utf8",function(err,data){
        if (err) {
            res.send("<h1>Error!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!</h1>")
        } else {
        res.send(
        "<html>" +
        "<head>" +
        "<title>KyukyuBBS</title>" +
        "</head>" +
        "<body bgcolor='skyblue'>" +
        "<center>" +
        "<table width='400' height='768' align='center' bgcolor='white' link='red' vlink='blue' border='1'>" +
        "<tr><td>" +
        "<center>" +
        "<h1><font color='red' face='MS Gothic'><i><b>きゅうきゅうのBBS</b></i></h1>" +
        "<a href='/kyukyuhp'>きゅうきゅうのホームページに戻る</a>" +
        "<br>" +
        "<table width='500' height='500' bgcolor='silver' border='1'><tbody><tr><td>" +
        data + "</tbody></td></tr>" +
        "<form method='GET' action='/message' name='chatsend'>" + 
        "<font color='red' face='MS Gothic'>Name</font>" +
        "<input type='text' name='name'>" +
        "<br>" +
        "<font color='red' face='MS Gothic'>Chat</font>" +
        "<input name='chat' type='text'>" +
        "<input type='submit'>" +
        "<a href='/message'><input value='更新' type='button'></a>"+
        "</form>" +
        "<br><br>" +
        "<hr>"+
        "<font color='red' face='MS Gothic'>ﾘﾛｰﾄﾞすると再度ﾌｫｰﾑが送信されます。更新したい場合は更新ﾎﾞﾀﾝを押すか、/messageにｱｸｾｽします</font>"+
        "</center>" +
        "</td></tr></table>" +
        "</center>"+
        "</body>"+
        "</html>")
        }
    })

})

app.listen(3000,"0.0.0.0",function(){
console.log("started")
})