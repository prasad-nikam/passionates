export default function authUser(req,res,next){
    if(!(req?.cookies?.token)){
        return res.status(403).send("You are not logged in")
    }
    next();
}

