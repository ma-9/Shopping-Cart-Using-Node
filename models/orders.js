var mongoose = require('mongoose');
const schema = mongoose.Schema;

const orderSchema = new schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    cart: {type: Object, required: true},
    address: {type: String, required: true},
    name: {type: String, required: true},
    paymentId: {type: String, required: true}
});

module.exports = mongoose.model('DND-Orders',orderSchema);