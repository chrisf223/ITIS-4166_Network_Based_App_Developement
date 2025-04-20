const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = new Schema({
    title: {type: String, required: [true, 'title is required']},
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    content: {type: String, required: [true, 'content is required'], 
              minLength: [10, 'the content should have at least 10 characters']}
},
{timestamps: true}
);
//collection name is stories in the database
module.exports = mongoose.model('Story', storySchema);


