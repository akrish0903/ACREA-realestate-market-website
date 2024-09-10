const jwt = require("jsonwebtoken");
const httpErrors = require("http-errors");
const redis_client = require("./init_redis");
module.exports = {
    jwt_utils: (usrId) => {
        return new Promise((resolve, reject) => {
            const payload = {
                payload_test: "payload_test"
            }
            const secret = process.env.ACCESS_TOKEN_SECRET;
            jwt.sign(payload, secret, {
                expiresIn: "1h",
                audience: usrId,
                issuer: "testIssuer"
            }, (err, token) => {
                if (err) {
                    console.log(err)
                    reject(httpErrors.InternalServerError())
                } else {
                    resolve(token)
                }
            });
        })
    },

    jwt_verify_token: (req, res, next) => {
        if (!req.headers["authorization"]) {
            return next(httpErrors.Unauthorized());
        } else {
            var authHeader = req.headers["authorization"];
            var authHeaderSplitted = authHeader.split(" ")
            const token = authHeaderSplitted[1];
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
                if (err) {
                    if (err.name === "JsonWebTokenError") {
                        return next(httpErrors.Unauthorized());
                    } else {
                        return next(httpErrors.Unauthorized(err.message));
                    }
                }
                req.payload = payload
                next();

            })
        }
    },


    jwt_refresh_token: (usrId) => {
        return new Promise((resolve, reject) => {
            const payload = {
                payload_test: "payload_test"
            }
            const secret = process.env.REFRESH_TOKEN_SECRET;
            jwt.sign(
                payload,
                secret, {
                expiresIn: "1y",
                audience: usrId,
                issuer: "testIssuer"
            }, async (err, token) => {
                if (err) {
                    console.log(err)
                    reject(httpErrors.InternalServerError())
                } else {
                    try {
                        await redis_client.set(usrId, token, {
                            EX: 365 * 24 * 60 * 60,

                        })
                        resolve(token)
                    } catch (error) {
                        console.log(error)
                        reject(httpErrors.InternalServerError());
                    }
                }
            });
        })
    },

    jwt_verify_refresh_token: (refreshToken) => {
        return new Promise((resolve, reject) => {
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, payload) => {
                if (err) {
                    reject(httpErrors.Unauthorized());
                }
                const userId = payload.aud;
                try {
                    var redisClientRes = await redis_client.get(userId)
                } catch (error) {
                    console.log(err);
                    reject(httpErrors.InternalServerError());
                }
                if (refreshToken === redisClientRes) {
                    resolve(userId);
                } else {
                    reject(httpErrors.Unauthorized());
                }
            })
        });
    }
}