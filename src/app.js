var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Web3   = require('web3');

var web3 = new Web3('http://localhost:7545');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler

accountAddress = '0x303db143d8ed6a58917d9ebdc082d642dc4cb9c2';
const contractAddress = '0x836aab299d234fa9bc1f079af20d3d0f0fca66c1';
const contractAbi =[
	{
		"constant": true,
		"inputs": [
			{
				"name": "adrs",
				"type": "address"
			}
		],
		"name": "getGrid",
		"outputs": [
			{
				"name": "_adrs",
				"type": "address"
			},
			{
				"name": "_max_pow",
				"type": "uint256"
			},
			{
				"name": "_hash",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_adrs",
				"type": "address"
			},
			{
				"name": "_hash",
				"type": "string"
			}
		],
		"name": "createNewGrid",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_adrs",
				"type": "address"
			},
			{
				"name": "_power",
				"type": "uint256"
			}
		],
		"name": "vpCreateNewGrid",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getVp",
		"outputs": [
			{
				"name": "_adrs",
				"type": "address"
			},
			{
				"name": "_hash",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_adrs",
				"type": "address"
			},
			{
				"name": "_hash",
				"type": "string"
			}
		],
		"name": "setVp",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

MyContract= new web3.eth.Contract(contractAbi, contractAddress);
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
