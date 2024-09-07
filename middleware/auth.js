import jwt from 'jsonwebtoken';

export const verifyToken = async(request,response)=>{
    try {
        const token = request.header("Authorization");
        if(!token) return response.status(403).ssend("Access Denied");

        if(token.startsWith("Bearer ")){
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        request.user = verified;
        next();
    } catch (error) {
        console.log(error);
    }
}