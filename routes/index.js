var express=require('express');
var mysql=require('mysql');
var router=express.Router();
var fs=require('fs');
var formidable=require('formidable');
var pool=mysql.createPool({
	host:'127.0.0.1',
	user:'root',
	password:'PARIS9797',
	database:'live_here',
	port:3306
});
const add='192.168.43.16';

router.get('/password',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	pool.query('select telphone,password from message',function(err,rows){
		if(err) throw err;
		res.send(rows);
	})
});
router.post('/password',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	pool.query('select id,telphone,password from message',function(err,rows){
		if(err) throw err;
		res.send(rows);
	})
});
router.post('/add',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var id=req.body['id'];
	var telphone=req.body['telphone'];
	var password=req.body['password'];
	pool.query(`update message set telphone='${telphone}',password='${password}' where id='${id}'`,function(err,rows){
		if(err) throw err;
		console.log(rows)
		res.send('success')
	})
});

module.exports = router;
