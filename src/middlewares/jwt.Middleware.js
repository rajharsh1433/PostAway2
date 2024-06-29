import jwt from 'jsonwebtoken';

const jwtAuth = (req, res, next) => {
    // 1. Read the token
    const authHeader = req.headers.authorization;

    // 2. If no token, return unauthorized
    if (!authHeader) {
        console.log(authHeader);
        return res.status(401).send("Unauthorized");
    }

    // 3. Extract the token from the "Bearer " prefix
    const token = authHeader.replace('Bearer ', '');

    // 4. Validate the token
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userID = payload.userID;// Attach the decoded payload to the request object
        next();  // Call next to pass control to the next middleware or route handler
    } catch (err) {
        console.log(err);
        return res.status(401).send("Invalid token");
    }
};

export default jwtAuth;
