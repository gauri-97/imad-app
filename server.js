var express = require('express');
var morgan = require('morgan');
var path = require('path');
var app = express();
var Pool=require('pg').Pool;
var crypto=require('crypto');
var bodyParser=require('body-parser');
var config={
	user:'postgres',
	database:'postgres',
	host:'localhost',
	port:'5432',
	password:'0000'
};
var pool=new Pool(config);
app.use(morgan('combined'));
app.use(bodyParser.JSON());

var articles={
	'article-one':
	{
		title:"Article One||Gauri Singh",
		heading:"Article One",
		content:`<p>
						Welcome to the article one of my web app.
						Isn't this great?
					</p>`
	},
	'article-two':
	{
		title:"Article Two||Gauri Singh",
		heading:"Article Two",
		content:`<p>
						Welcome to the article two of my web app.
						Hope you have fun!
					</p>`
	},
	'article-three':
	{
		title:"Article Three||Gauri Singh",
		heading:"Article Three",
		content:`<p>
					Welcome to the article three of my web app.
						Toodles.
					</p>`
	}
};


function createtemplate(data){
	var title=data.title;
	var heading=data.heading;
	var date=data.date;
	var content=data.content;
	var template=`
	<!doctype html>
	<html>
		<head>
			<title> ${title}</title>
			<meta name="viewport" content="width=device-width ,initial scale=1"/>
			<link href="/ui/style.css" rel="stylesheet" />
		</head>
		<body>
			<div class="container">
				<div>
				<a href="/">Home</a>
				</div>
				<hr/>
				<h2><b>${date.toDateString()}<b/><h2>
				<hr/>
				<h3>${heading}</h3>
				<div>
					${content}
				</div>
			</div>
		</body>
	</html>`;
	return template;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var cnt=0;
app.get('/counter',function(req,res){
	cnt=cnt+1;
	res.send(cnt.toString());
})

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

var names=[];
app.get('/submit-name',function(req,res){
var name=req.query.name;
names.push(name);
res.send(JSON.stringify(names)); 
});

app.get('/:articlename',function(req,res){
	var articlename=req.params.articlename;
	pool.query("SELECT * FROM articles WHERE name=$1",[articlename],function(err,result){
		if(err)
		{
			res.status(500).send(err.toString());
		}
		else if(result.rows.length===0)
		{
			res.status(404).send("Not Found");
		}
		else
		{
			res.send(createtemplate(result.rows[0]));
		}
	});
});

function hash(input,salt){
	var hashed=crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
	return hashed.toString('hex');
}

app.get('/hash/:input',function(req,res){
	var hashedString=hash(req.params.input,"Thisissalt")
	res.send(hashedString)
});

app.post('/create-user',function(Req,res){
	var username=req.body.username;
	var password=req.body.password;

	var salt=crypto.getRandomBytes(128).toString('hex');
	var dbString=hash(password,salt);
	pool.query('Insert into "user" (username,password) values ($1,$2)',[username,dbString],function(err,result){
		if(err)
		{
			res.status(500).send(err.toString());
		}
		else
		{
			res.send("User successfully created"+username);
		}
});


app.get('/database',function(rew,res){
	pool.query('SELECT * from articles',function(err,result){
		if(err)
		{
			res.status(500).send(err.toString());
		}
		else
		{
			res.send(JSON.stringify(result.rows));
		}
	});
 
});
	

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 2345;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
