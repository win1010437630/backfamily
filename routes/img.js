var express=require('express');
var mysql=require('mysql');
var router=express.Router();

var fs=require('fs');   //重新命名
var formidable=require('formidable');   //写入文件
const IP='192.168.43.200'
var pool=mysql.createPool({
	host:'localhost',
	user:'root',
	password:'',
	database:'livehere',
	port:3306
})



router.post('/img',function(req,res){
	var aa={}
	var arr=[]
	res.header("Access-Control-Allow-Origin", "*"); //跨域
	var form = new formidable.IncomingForm();
	form.uploadDir='public/upload';
	  //上传图片存放的路径
	
	form.parse(req,function(error,fields,files){
		var jgr={}
		var arr=[]
		for(var i in files){
			var file = files[i];  //保存图片属性
			var fName = (new Date()).getTime()  //用一时间戳作为图片的名字
			switch(file.type){    //检测图片的格式
				case "image/jpeg":
				fName=fName+".jpg";
				break;
				case "image/png":
				fName=fName+".png";
				break;
				case "image/gif":
				fName=fName+".gif";
			}
			var newPath='public/upload/'+fName;  //要返回的图片的路径
			fs.renameSync(file.path,newPath);
			Object.assign({},aa,{path:newPath})
			arr.push("http://localhost:8005/upload/"+fName)
		}
			 res.send(arr)
			 
		/*pool.query(`insert into forum(img) values('http://localhost:8005/upload/${fName}')`,function(err,rows){
			if (err) throw err;
			if(rows){
				res.send('上传成功')
			}			
		})	 */

		
	})
	});

/*插入图片*/
router.post('/img2',function(req,res){
	var font=req.body["font"];
	var picture=req.body["postUrl"];
	var time=req.body['time'];
	res.header("Access-Control-Allow-Origin", "*");
	pool.query(`insert into forum(img,con,time) values('${picture}','${font}','${time}')`,function(err,rows){
		if(err) throw err;
		res.send(rows);
		console.log(time)
	})
})

//调取图片
router.get('/photo',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	pool.query('select * from forum',function(err,rows){
		if(err) throw err;
		res.send(rows);
	})
})
module.exports=router;