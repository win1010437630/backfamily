var express=require('express');
var mysql=require('mysql');
var router=express.Router();
var fs=require('fs');
var formidable=require('formidable');
var pool=mysql.createPool({
	host:'127.0.0.1',
	user:'root',
	password:'PARIS9797',
	database:'livehere',
	port:3306
});
const add='192.168.43.16';

router.get('/all',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	pool.query('select * from notice',function(err,rows){
		if(err) throw err;
		res.send(rows);
	})
});
/*router.post('/password',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	pool.query('select id,title,from,detail from notice',function(err,rows){
		if(err) throw err;
		res.send(rows);
	})
});*/
router.post('/add',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var id=req.body['id'];
	var title=req.body['title'];
	var from=req.body['from'];
	var detail=req.body['detail'];
	pool.query(`update notice set title='${title}',from='${from}',detail='${detail}' where id='${id}'`,function(err,rows){
		if(err) throw err;
		console.log(rows)
		res.send('success')
	})
});

module.exports = router;
