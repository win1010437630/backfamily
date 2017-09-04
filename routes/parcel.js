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
/*物业插入邮包信息*/
router.post("/par",function(req,res){
	var name=req.body["username"];
	var type=req.body["messtype"];
	var code=req.body["code"];
	var phone=req.body["phone"];
	var address=req.body["address"];
	var order=[];
	res.header("Access-Control-Allow-Origin", "*");
		pool.query(`insert into parcel (username,messtype,code,phone,address) values ('${name}','${type}','${code}','${phone}','${address}')`,function(err,rows,fields){
			pool.query('select * from parcel',function(err,rows,fields){
			if(err) throw err;
			for(var i in rows){
				order.unshift(rows[i])
			}
			res.send(order)
	
		})



		})
})
/*物业获取邮包信息*/
router.get("/parcel",function(req,res){
	var order=[];
	res.header("Access-Control-Allow-Origin", "*");
		pool.query('select * from parcel',function(err,rows,fields){
			if(err) throw err;
			for(var i in rows){
				order.unshift(rows[i])
			}
			res.send(order)	
		})
})
module.exports=router;

