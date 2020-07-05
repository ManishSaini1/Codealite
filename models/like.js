const mongoose= require('mongoose');



const likeSchema=mongoose.Schema(
    {
        user:
        {
            type : mongoose.Schema.Types.ObjectId
        },
        likeable:
        {
            type:mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: 'onModel'
        },
        onModel:
        {
            type:String,
            required: true, 
            enum: ['Post', 'Comment']
        }
    },
    {
        timeStamp: true
    });
    const Like= mongoose.model('Like', likeSchema);
    module.exports=Like;