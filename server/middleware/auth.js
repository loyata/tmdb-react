import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    try{
        //check if token is valid
        if(req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            const isCustomAuth = token.length < 500;
            let decodedData;

            if (token && isCustomAuth) {
                decodedData = jwt.verify(token, 'test');
                req.userId = decodedData?.id;
            } else {
                decodedData = jwt.decode(token);
                req.userId = decodedData?.sub;
            }
        }
        next();
    }catch (error) {
        console.log(error);
    }
}

export default auth;