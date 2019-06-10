var express = require('express');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var router = express.Router();
var crypto = require('crypto');

var Web3   = require('web3');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/powerGrid/vp/', function(req, res, next) {
   var adrs = req.body.adrs;
   var hash = req.body.pass;
   MyContract.methods.getVp().call({from:accountAddress}).then((txn) =>{
   
   	    if(adrs == txn._adrs && hash == txn._hash){
   	    	console.log(txn._adrs +',,'+txn._hash);
   	    	res.render('vp');
   	    }   
        console.log(JSON.stringify(txn));});


  
});

router.post('/powerGrid/grid/', function(req, res, next) {
   var adrs = req.body.adrs2;
   var hash = req.body.pass2;
   console.log('adrs='+adrs+',hash='+hash);
   MyContract.methods.getGrid(adrs).call({from:accountAddress}).then((txn) =>{
        console.log(JSON.stringify(txn));
        console.log(txn._adrs+'==='+txn._max_pow);
        res.render('grid',{adrs:txn._adrs,pow:txn._max_pow});
         
    });


});

router.post('/powerGrid/vpSetup/', function(req, res, next) {
	var adrs = req.body.adrs1;
   var hash = req.body.pass1;
  console.log('adrs='+adrs+',hash='+hash);
   MyContract.methods.setVp(adrs,hash).send({from:accountAddress,gas:600000}).then((txn) =>{
        console.log(JSON.stringify(txn));
      
    });
   res.redirect('/');
});



router.post('/powerGrid/newGrid/', function(req, res, next) {
	var adrs = req.body.adrs;
   var max_power = req.body.max_power;
  
   MyContract.methods.vpCreateNewGrid(adrs,max_power).send({from:accountAddress,gas:600000}).then((txn) =>{
        console.log(JSON.stringify(txn));
      
    });
   res.redirect('back');
});

router.post('/powerGrid/gridSetup/', function(req, res, next) {
	var adrs = req.body.adrs3;
   var hash = req.body.pass3;
  
   MyContract.methods.createNewGrid(adrs,hash).send({from:accountAddress,gas:600000}).then((txn) =>{
        console.log(JSON.stringify(txn));
      
    });
  res.redirect('/');
});

router.post('/powerGrid/gridStatus/', function(req, res, next) {
	var adrs = req.body.adrs;
   var power = req.body.power;
  
   MyContract.methods.createNewGrid(adrs,hash).send({from:accountAddress,gas:600000}).then((txn) =>{
        console.log(JSON.stringify(txn));
      
    });
  res.redirect('/');
});

module.exports = router;
