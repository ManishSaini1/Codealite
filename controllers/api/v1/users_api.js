const User= require('../../../models/user');
const jwt=require('jsonwebtoken');
module.exports.createSession= async function(req ,res)
{
    console.log("***********  in create Session");


    try{
        let user=await User.findOne({email :req.body.email});
            if(!user || user.password != req.body.password)
            {
                return res.json(422, 
                    {
                        message  :"Invalid UserName or Password"
                    });
            }
            return res.json(200, {
                message : "SIgn in Successfull and please keep Your Token Safe :)", 
                data  :{
                    token : jwt.sign(user.toJSON(), 'codeial', {expiresIn : '600000'})
                }
            });
    }
    catch(error)
    {
        if(error){console.log('***Error', error);}
        return res.json(500, {
            message :" INternal SServer Error"
        });

    }
  
}