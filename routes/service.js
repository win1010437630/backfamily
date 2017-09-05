var express=require("express");
var mysql=require("mysql");
var router=express.Router();

var pool=mysql.createPool({
	host:'127.0.0.1',
	user:'root',
	password:'PARIS9797',
	database:'livehere',
	port:3306
});

router.get('/service',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	pool.query('select * from service',function(err,rows){
		if(err) throw err;
		res.send(rows);
	})
});

module.exports=router;