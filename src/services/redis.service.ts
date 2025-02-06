import { createClient, RedisClientType } from "redis";

class RedisService {
    private client: RedisClientType;

    constructor() {
        console.log(process.env.REDIS_URL);
        this.client = createClient({
            url: process.env.REDIS_URL || "redis://localhost:6379",
        });
        this.client.on("error", (err) => console.error("Redis Client Error", err));
    }

    public async connect(): Promise<void> {
        try {
            await this.client.connect();
            console.log("Connected to Redis");
        } catch (error) {
            console.error("Failed to connect to Redis", error);
        }
    }

    public async set(key: string, value: string, expireTime?: number): Promise<void> {
        try {
            if (expireTime) {
                await this.client.set(key, value, { EX: expireTime });
            } else {
                await this.client.set(key, value);
            }
        } catch (error) {
            console.error(`Failed to set key ${key} in Redis`, error);
        }
    }

    public async get(key: string): Promise<string | null> {
        try {
            return await this.client.get(key);
        } catch (error) {
            console.error(`Failed to get key ${key} from Redis`, error);
            return null;
        }
    }

    public async del(key: string): Promise<void> {
        try {
            await this.client.del(key);
        } catch (error) {
            console.error(`Failed to delete key ${key} from Redis`, error);
        }
    }

    public async disconnect(): Promise<void> {
        try {
            await this.client.disconnect();
            console.log("Disconnected from Redis");
        } catch (error) {
            console.error("Failed to disconnect from Redis", error);
        }
    }
    public async checkHealth(): Promise<boolean> {
        try {
            await this.client.set('health', 'ok');
            const reply = await this.client.get('health');
            return reply === 'ok';
        } catch (error) {
            console.error('Redis Health Check Failed:', error);
            return false;
        }
    }
    public getClient(): RedisClientType {
        return this.client;
    }
}

export default new RedisService();