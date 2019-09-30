const mongoose = require('mongoose');
const schema = mongoose.Schema;
    
const productSchema = new schema({
    imagePath: {type: mongoose.Schema.Types.String, required:true},
    // imagePath2: {type: mongoose.Schema.Types.String, required:true},
    // imagePath3: {type: mongoose.Schema.Types.String, required:true},
    // imagePath4: {type: mongoose.Schema.Types.String, required:true},
    // imagePath5: {type: mongoose.Schema.Types.String, required:true},
    name: {type: mongoose.Schema.Types.String, required:true},
    desc: {type: mongoose.Schema.Types.String, required:true},
    price: {type: mongoose.Schema.Types.Number, required:true},
});

module.exports = mongoose.model("DND - Products",productSchema);