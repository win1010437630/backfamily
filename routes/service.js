var express=require("express");
var mysql=require("mysql");
var router=express.Router();

/*var pool=mysql.createPool({
	host:'127.0.0.1',
	user:'root',
	password:'PARIS9797',
	database:'livehere',
	port:3306
});*/
var pool=mysql.createPool({
	host:'localhost',
	user:'root',
	password:'',
	database:'livehere',
	port:3306
})

/*维修获取数据库*/
router.get("/service",function(req,res){
	var order=[];
	res.header("Access-Control-Allow-Origin", "*");
		pool.query('select * from service',function(err,rows,fields){
			if(err) throw err;
			for(var i in rows){
				order.unshift(rows[i])
			}
			res.send(order)	
	})
})
/*维修提交新数据，以及重新获取获取*/
router.post("/ser",function(req,res){
	var user=req.body["user"];
	var content=req.body["content"];
	var order=[];
	res.header("Access-Control-Allow-Origin", "*");
		pool.query(`insert into parcel (user,content) values ('${user}','${content}')`,function(err,rows,fields){
			pool.query('select * from service',function(err,rows,fields){
			if(err) throw err;
			for(var i in rows){
				order.unshift(rows[i])
			}
			res.send(order)	
		})
	})
})

module.exports=router;