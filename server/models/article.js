const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var commentSc = new Schema({ commenterId : String, commenterName : String, comment: String, Date : {type : Date, default : new Date()} })
var articleSchema = new Schema({
   title : {type : String, required : true},
   category : {type : String, required : true},
   content : {type : String, required : true},
   image : {type : String},    
   comments : [commentSc],                                                                                                                                                                                               
   userId: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
    timestamps: true,
});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         

var Article = mongoose.model('Article', articleSchema);

module.exports = Article