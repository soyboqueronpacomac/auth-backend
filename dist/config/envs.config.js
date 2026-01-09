"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
require("dotenv/config");
const zod_1 = require("zod");
const envsSchema = zod_1.z.object({
    PORT: zod_1.z.coerce.number().default(3001),
    NODE_ENV: zod_1.z
        .enum(['development', 'production', 'test'])
        .default('development'),
    DATABASE_URL: zod_1.z.string().min(1, 'DATABASE_URL is required'),
    REDIS_URL: zod_1.z.string().min(1, 'REDIS_URL is required'),
    JWT_SECRET: zod_1.z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
    JWT_EXPIRES_IN: zod_1.z.string().default('2h'),
    FRONTEND_URL: zod_1.z.string().url().default('http://localhost:4200'),
    ALLOWED_ORIGINS: zod_1.z.preprocess((val) => (typeof val === 'string' ? val.split(',') : val), zod_1.z.array(zod_1.z.string()).default(['http://localhost:4200'])),
});
const { success, data, error } = envsSchema.safeParse(process.env);
if (!success) {
    console.error('❌ Invalid environment variables configuration:');
    console.error(JSON.stringify(error.format(), null, 2));
    process.exit(1);
}
exports.envs = data;
//# sourceMappingURL=envs.config.js.map