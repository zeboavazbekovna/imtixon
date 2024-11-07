import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { User } from "../user";
import { DeviceModule } from "../device";


@Module({
    imports: [SequelizeModule.forFeature([User]),DeviceModule],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule {}