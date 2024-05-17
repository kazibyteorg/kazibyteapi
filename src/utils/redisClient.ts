import { Redis } from "ioredis";

client.on("connect", function () {
  console.log("Connected to Redis");
});

const redisClient = new Redis();

export default redisClient;
