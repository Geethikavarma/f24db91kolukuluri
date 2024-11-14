exports.api=function(req,res){
    res.status(200).json({
        resources:[
            {resoyrces: 'artifacts',verbs:['GET','POST','PUT','DELETE']}
        ]
    });
};
