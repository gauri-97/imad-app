var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));
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

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
app.get('/:articlename',function(req,res){
	var articlename=req.params.articlename;
	res.send(createtemplate(articles[articlename]));
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
