const mongoose = require('mongoose');

const ProductSchemas = mongoose.Schema({

    title:{
        type: 'string',
    },
    description:{
        type: 'string',
    },
    isDelete:{
        type: 'boolean',
        default: false
    }
});

module.exports =mongoose.model("Product",ProductSchemas);