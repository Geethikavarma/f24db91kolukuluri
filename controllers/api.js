exports.api=function(req,res){
    res.status(200).json({
        resources:[
            {resources: 'artifacts',verbs:['GET','POST','PUT','DELETE']}
        ]
    });
};

