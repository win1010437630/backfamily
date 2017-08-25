var express=require("express");
var mysql=require("mysql");
var router=express.Router();

var pool=mysql.createPool({
	host:"localhost",// 127.0.0.1
	user:"root",//用户名
	password:"",//密码
	database:"livehere",//数据库
	port:"3306"
});

router.post("/par",function(req,res){
	var name=req.body["username"];
	var type=req.body["messtype"];
	var code=req.body["code"];
	var phone=req.body["phone"];
	var address=req.body["address"];

	res.header("Access-Control-Allow-Origin", "*");
		pool.query(`insert into parcel (username,messtype,code,phone,address) values ('${name}','${type}','${code}','${phone}','${address}')`,function(err,rows,fields){
			if(err) throw err;
			if(rows){
				res.send('success')
			}

		})
})

router.get("/parcel",function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
		pool.query('select * from parcel',function(err,rows,fields){
			if(err) throw err;
			res.send(rows)
	
		})
})
module.exports=router;

