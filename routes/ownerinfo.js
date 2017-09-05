var express=require('express');
var mysql=require('mysql');
var router=express.Router();
var fs=require('fs');
var formidable=require('formidable');

var pool=mysql.createPool({
	host:'localhost',
	user:'root',
	password:'',
	database:'livehere',
	port:3306
})
var add='localhost';
router.get('/oi',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	pool.query('select * from ownerinform',function(err,rows){
		if(err) throw err;
		res.send(rows);
	})
});
router.post('/owneri',function(req,res){
	var id=req.body['id'];
	res.header("Access-Control-Allow-Origin", "*");
	pool.query(`select * from ownerinform where id='${id}'`,function(err,rows){
		if(err) throw err;
		res.send(rows);
	})
});

router.post('/pass',function(req,res){
	var id=req.body['id'];
	var password=req.body['password'];
	res.header("Access-Control-Allow-Origin", "*");
	pool.query(`update ownerinform set password='${password}' where id='${id}'`,function(err,rows){
		if(err) throw err;
		console.log(password)
		res.send(rows);
	})
});
router.post('/is',function(req,res){
	var id=req.body['id'];
	var flag=req.body['flag'];
	res.header("Access-Control-Allow-Origin", "*");
	pool.query(`update ownerinform set flag='${flag}' where id='${id}'`,function(err,rows){
		if(err) throw err;
		console.log(id)
		res.send(rows);
	})
});


router.post('/setpsd',function(req,res){
	var id=req.body['id'];
	var psd=req.body['psd'];
	res.header("Access-Control-Allow-Origin", "*");
	pool.query(`update ownerinform set password='${psd}' where id='${id}'`,function(err,rows){
		if(err) throw err;
		res.send('success');
	})
});

/*router.post('/newss', function(req, res) {
  	//var one=req.body["name"];
  	//var two=req.body["age"];
  	//res.send({name:one,age:two});
  	//getUserByName(one,function(a,b){
  		//res.send(b);
  	//})
	  console.log('into up ....11');
    var form = new formidable.IncomingForm();  //创建IncomingForm对象
    form.uploadDir = "public/images/";
    //设置上传文件存放的文件夹，可以使用fs.rename()来改变上传文件的存放位置和文件名
    //如果form.uploadDir不赋值，它默认的位置是C:\User\用户名\AppData\Local\Temp
    //form.encoding = "utf-8";  //设定文件的编码
    form.parse(req, function(error, fields, files){
        for (var i in files) {
            var file = files[i];
            var fName = (new Date()).getTime()
            switch (file.type) {
                case "image/jpeg":
                    fName = fName + ".jpg";
                    break;
                case "image/png":
                    fName = fName + ".png";
                    break;
            }
        	var newPath= "public/images/" + fName;
        	fs.renameSync(file.path,newPath);//重命名
        	res.send(newPath);
        };
    });
});*/

router.post('/img_upload',function(req,res){	
	res.header("Access-Control-Allow-Origin", "*"); 
	var form = new formidable.IncomingForm();
	form.uploadDir='public/upload/'; 
	form.parse(req,function(error,fields,files){
		for(var i in files){
			var file = files[i];  
			var fName = (new Date()).getTime()  
			switch(file.type){   
				case "image/jpeg":
				fName=fName+".jpg";
				break;
				case "image/jpg":
				fName=fName+".jpg";
				break;
				case "image/png":
				fName=fName+".png";
				break;
				case "image/gif":
				fName=fName+".gif";
				break;
			}
			var newPath='public/upload/'+fName; 
			fs.renameSync(file.path,newPath);   
			res.send(newPath);
		}	
		pool.query(`insert into ownerinform(portrait) values('http://${add}:8005/upload/${fName}')`,function(err,rows){
			if (err) throw err;
			if(rows){
				res.send('上传成功')
			}			
		})	
	})
});
/*
router.post('/img_update',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var id=req.body['id'];
	var portrait=req.body['portrait'];

	pool.query(`update ownerinform set portrait='${portrait}' where id='${id}'`,function(err,rows){
		if(err) throw err;
		console.log(rows)
		res.send('修改成功')
	})

});*/

module.exports=router;
