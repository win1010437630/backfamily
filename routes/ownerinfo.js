var express=require('express');
var mysql=require('mysql');
var router=express.Router();
var fs=require('fs');
var formidable=require('formidable');

var pool=mysql.createPool({
	host:'127.0.0.1',
	user:'root',
	password:'',
	database:'livehere',
	port:3306
})

router.get('/oi',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	pool.query('select * from ownerinform',function(err,rows){
		if(err) throw err;
		res.send(rows);
	})
});

module.exports=router;
