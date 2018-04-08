var mongoose = require('mongoose');

// Machine Schema
var MachineSchema = mongoose.Schema({
	id: {
		type: String
	},
	manufactureDate: {
		type: String
	},
	name: {
		type: String
	},
	dateOfPurchase: {
		type: String
	},
	price: {
		type: Number,
		min: 0
	},
	quantity: {
		type: Number,
		min: 0
	},
	manufacturer: {
		type: String
	},
	seller: {
		type: String
	},
	spno: {
		type: String
	},
	sadd: {
		type: String
	}	
});

var Machine = module.exports = mongoose.model('Machine', MachineSchema);

