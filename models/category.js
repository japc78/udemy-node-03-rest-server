
const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
    name: {
        type: String,
        required: [true, 'The name is required']
    },

    state: {
        type: Boolean,
        default: true,
        required: [true, 'The state is required']
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'The user id is required']
    }

})

module.exports = model('Role', CategorySchema);