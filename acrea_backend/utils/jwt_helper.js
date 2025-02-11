const jwt = require("jsonwebtoken");
const httpErrors = require("http-errors");
const redis_client = require("./init_redis");

module.exports = {
    verifyAccessToken: (req, res, next) => {
        if (!req.headers["authorization"]) {
            return next(httpErrors.Unauthorized());
        }
        const authHeader = req.headers["authorization"];
        const token = authHeader.split(" ")[1];
        
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if (err) {
                if (err.name === "JsonWebTokenError") {
                    return next(httpErrors.Unauthorized());
                }
                return next(httpErrors.Unauthorized(err.message));
            }
            req.payload = payload;
            next();
        });
    },

    signAccessToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {
                payload_test: "payload_test"
            };
            const secret = process.env.ACCESS_TOKEN_SECRET;
            const options = {
                expiresIn: "1h",
                audience: userId,
                issuer: "testIssuer"
            };
            
            jwt.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err);
                    reject(httpErrors.InternalServerError());
                }
                resolve(token);
            });
        });
    },

    signRefreshToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {
                payload_test: "payload_test"
            };
            const secret = process.env.REFRESH_TOKEN_SECRET;
            const options = {
                expiresIn: "1y",
                audience: userId,
                issuer: "testIssuer"
            };
            
            jwt.sign(payload, secret, options, async (err, token) => {
                if (err) {
                    console.log(err);
                    reject(httpErrors.InternalServerError());
                }
                try {
                    await redis_client.set(userId, token, {
                        EX: 365 * 24 * 60 * 60
                    });
                    resolve(token);
                } catch (error) {
                    console.log(error);
                    reject(httpErrors.InternalServerError());
                }
            });
        });
    },

    verifyRefreshToken: (refreshToken) => {
        return new Promise((resolve, reject) => {
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, payload) => {
                if (err) {
                    return reject(httpErrors.Unauthorized());
                }
                const userId = payload.aud;
                try {
                    const redisToken = await redis_client.get(userId);
                    if (refreshToken === redisToken) {
                        return resolve(userId);
                    }
                    reject(httpErrors.Unauthorized());
                } catch (error) {
                    console.log(error);
                    reject(httpErrors.InternalServerError());
                }
            });
        });
    }
}; 