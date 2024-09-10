const redis = require("redis");

// No need to specify host and port explicitly for default localhost:6379
const redis_client = redis.createClient( {
    port:process.env.REDIS_PORT,
    host:process.env.REDIS_HOST
});
redis_client.connect().then(()=>{console.log("Initiated redis")}).catch(err=>console.log(err));

redis_client.on("connect", () => {
    console.log("Client connected to Redis...");
});
redis_client.on("ready", () => {
    console.log("Client connected to Redis and ready to use...");
});
redis_client.on("error", (err) => {
    console.error("Redis error: ", err);
});
redis_client.on("end", () => {
    console.log("Client disconnected from Redis...");
});


process.on("SIGINT", () => {
    redis_client.quit();
});

module.exports = redis_client;
