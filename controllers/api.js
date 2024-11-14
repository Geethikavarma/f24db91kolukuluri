exports.api = function(req,res){
    res.status(20).json({
        resources:[
            {resource: 'gadgets',verbs:['GET','POST','PUT','DELETE']}
        ]
    })
}