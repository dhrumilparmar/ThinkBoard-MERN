// paste the env keys in .env
// install @upstash/ratelimit@2.0.5 @upstash/redis@1.34.9
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';import dotenv from 'dotenv';
dotenv.config();

const ratelimit = new Ratelimit({
    redis : Redis.fromEnv(),
    limiter : Ratelimit.slidingWindow(20, "20 s"),
});

export default ratelimit;