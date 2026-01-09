"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const common_1 = require("@nestjs/common");
const config_1 = require("./config");
async function bootstrap() {
    const logger = new common_1.Logger('Bootstrap');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, cookie_parser_1.default)());
    app.setGlobalPrefix('api');
    app.enableVersioning({
        type: common_1.VersioningType.URI,
        defaultVersion: '1',
    });
    app.enableCors({
        origin: config_1.envs.ALLOWED_ORIGINS,
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    await app.listen(config_1.envs.PORT);
    logger.log(`🚀 Server running on port ${config_1.envs.PORT}`);
}
bootstrap();
//# sourceMappingURL=main.js.map