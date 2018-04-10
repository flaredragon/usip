var express = require('express')
var router = express.Router()
var Machine = require('../models/machine')
// Get Homepage
router.get('/', ensureAuthenticated, function (req, res) {
  Machine.find({}).exec().then((machines) => {	
    res.render('index', {machines: machines})
  })
})

router.get('/machine', ensureAuthenticated, function (req, res) {
	res.render('addmachine');
  })  

router.get('/machine/:id', ensureAuthenticated, function (req, res) {
   Machine.find({id:req.params.id}).exec().then((machine) => {
    console.log(machine)
	res.render('machine',{machine:machine});
	})
});

router.get('/machine/update/:id',ensureAuthenticated , function(req,res) {
	Machine.find({id:req.params.id}).exec()
	.then( (machine) => {
			console.log(machine);
			res.render('updatemachine',{machine:machine});
	});
});

router.post('/machine/update/:id',ensureAuthenticated , function(req,res) {
	var name = req.body.name;
	var id = req.body.id;
	var manufactureDate = req.body.manufactureDate;
	var dateOfPurchase = req.body.dateOfPurchase;
	var price = req.body.price;
	var quantity = req.body.quantity;
	var manufacturer = req.body.manufacturer;
	var seller = req.body.seller;
	var spno = req.body.spno;
	var sadd = req.body.sadd

	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('dateOfPurchase', 'Date of Purchase is Required').notEmpty();
	req.checkBody('price', 'Price is required').notEmpty();
	req.checkBody('manufacturer', 'Manufacturer is required').notEmpty();
	req.checkBody('seller', 'Seller is required').notEmpty();

	var errors = req.validationErrors();

	if(errors){
		console.log(errors);
		res.render('updatemachine',{
			errors:errors
		});
	} else {
		Machine.find({id:req.params.id}).exec()
		       .then( (umachine) => {
			
			
		Machine.where({ id: req.params.id })
		       .update({ $set: { 	
				name: name,
				manufactureDate: manufactureDate,
				dateOfPurchase: dateOfPurchase,
				price: price,
				quantity: quantity,
				manufacturer: manufacturer,
				seller: seller,
				spno: spno,
				sadd: sadd 
		}},function(err,callback){	
			 if(err)
				console.log(err);
			req.flash('success_msg','Machine Updated');
			res.redirect('/machine/'+req.params.id);		
			});
		})
		}
	
});

router.post('/machine', ensureAuthenticated,function(req, res){
	var name = req.body.name;
	var id = req.body.id;
	var manufactureDate = req.body.manufactureDate;
	var dateOfPurchase = req.body.dateOfPurchase;
	var price = req.body.price;
	var quantity = req.body.quantity;
	var manufacturer = req.body.manufacturer;
	var seller = req.body.seller;
	var spno = req.body.spno;
	var sadd = req.body.sadd;

	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('id', 'ID is required').notEmpty();
	req.checkBody('dateOfPurchase', 'Date of Purchase is Required').notEmpty();
	req.checkBody('price', 'Price is required').notEmpty();
	req.checkBody('manufacturer', 'Manufacturer is required').notEmpty();
	req.checkBody('seller', 'Seller is required').notEmpty();

	var errors = req.validationErrors();

	if(errors){
		console.log(errors)
		res.render('addmachine',{
			errors: errors
		});
	} 
	else {
		var newMachine = new Machine({
			name: name,
			id:id,
			manufactureDate: manufactureDate,
			dateOfPurchase: dateOfPurchase,
			price: price,
			quantity: quantity,
			manufacturer: manufacturer,
			seller: seller,
			spno: spno,
			sadd: sadd
		});

		newMachine.save((err, saved) => {
			if(err)
				{
			res.render('addmachine',{error_msg:'Something Went Wrong Try Again'});		
			console.log(err);
			}
         		  Machine
			      .findOne({_id: saved._id})
			      .exec((err,machine) => {
					if(err)
						console.log(err);
					
					console.log(machine);

					req.flash('success_msg','Item Added!');
					res.redirect('/');		
				
				});
		      })

		}
});



router.delete('/machine/:id', ensureAuthenticated, function (req, res) {
  const idParam = req.params.id;
  // Removes a product
  Machine.findOne({id: idParam}).remove((err, removed)=> res.json(removed))
})

function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
    return next()  } 
	else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;