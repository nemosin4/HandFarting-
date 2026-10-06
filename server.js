var express = require("express")
var app = express()
var fso = require("fs")
var path = require("path")
var multer = require("multer")
const serveIndex = require('serve-index');
const uploadDir = path.join(__dirname, 'files/audios');
app.use('/audios', express.static(uploadDir), serveIndex(uploadDir, { icons: false ,'template': path.join(__dirname,'/fileview.htm')}));
app.use(express.static(path.join(__dirname, 'files')));
app.get("/",function(req,res)){
	res.send('<script language="JavaScript">location.href="/home"</script>')
}
app.get("/home",function(req,res){
	var files = fso.readdirSync(path.join(__dirname,"files","audios"))
	var fileshtml = ""

	fileshtml = fileshtml + "<center>\n"
	for (var index = 0;index < files.length;index = index + 1) {
		var artist 
		artist = fso.readFileSync(path.join(__dirname,"files","comments",files[index] + "artist.txt"),"utf8")
	fileshtml = fileshtml + `<div class="framesimple"><p class="text">${files[index].replace(/^.*?\;/, "")}<br>アーティスト : ${artist}</p><input type="button" value="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;再生&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" class="linkbutton" onclick="location.href='audios/${files[index]}'" ><br><br><input type="button" value="コメントをつける" class="linkbutton" onclick="location.href = '/rate?file=${files[index]}'"></div><br>`
	}
	fileshtml = fileshtml + "</center>"
	var html = fso.readFileSync(path.join(__dirname,"files","home.htm"),"utf8")
	html = html.replace("{{list}}",fileshtml)
	res.send(html)
})
app.get("/rate",function(req,res){
	var comments = fso.readFileSync(path.join(__dirname,"files","comments",req.query.file + ".txt"),"utf8")
	var comhtml = fso.readFileSync(path.join(__dirname,"files","comments.htm"),"utf8")
	comhtml = comhtml.replace("{{comments}}",comments)
	comhtml = comhtml.replace("{{filename}}",req.query.file)
	res.send(comhtml)
})
app.get("/comsend",function(req,res){
	var nowmade = fso.readFileSync(path.join(__dirname,"files","comments", req.query.file + ".txt"),"utf8")
	fso.writeFileSync(path.join(__dirname,"files","comments",req.query.file + ".txt"),"[" + req.query.name + "]" + " " + req.query.com + "\n" + nowmade)
res.send("送信が完了しました。<a href='/home'>戻る</a>")
})
var storage = multer.diskStorage({
	destination: function(req,file,cb) {
		cb(null,"files/audios/")
	},
	filename : function(req,file,cb) {
	var ext = path.extname(file.originalname);
	var filename = 9999999999999999 - Date.now() + ";" + req.body.name + ext
	cb(null,filename)
	fso.writeFileSync(path.join(__dirname,"files","comments",filename + ".txt"),"")
	fso.writeFileSync(path.join(__dirname,"files","comments",filename + "artist" + ".txt"),req.body.artist)
	}
})
var upload = multer({
	storage : storage,
	fileFilter: function (req,file,cb) {
		var fuckintosh
		fuckintosh = file.originalname.slice(-4)
		if (fuckintosh == ".mp3") {
			cb(null,true)
		} else if(fuckintosh == ".MP3") {
			cb(null,true)
		} else if(fuckintosh == ".wav") {
			cb(null,true)
		} else if(fuckintosh == ".WAV") {
			cb(null,true)
		} else if(fuckintosh == ".M4A") {
			cb(null,true)
		} else if(fuckintosh == ".m4a") {
			cb(null,true)
		} else if(fuckintosh == "FLAC") {
			cb(null,true)
		} else if(fuckintosh == "flac") {
			cb(null,true)
		} else {
			cb(null,true)
		}
		
		
	}
	
})
app.get("/serverstopfuckintoshaiueo",function(req,res){
server.close()
})
app.post("/send",upload.single("file"),function(req,res){
	res.send("ｱｯﾌﾟﾛｰﾄﾞが完了しました。<a href='/home' target='_top'>ﾎｰﾑに戻る</a>")
})
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname,"files","404.htm"));
});
var server = app.listen(3000,"0.0.0.0",function(){
	console.log("started server")
}
)
