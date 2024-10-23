import { Module } from "@nestjs/common";
import { EntityService } from "./entity/entity.service";
import { ConnectionService } from "./connection/connection.service";
import { EntityController } from "./entity/entity.controller";
import { ConnectionController } from "./connection/connection.controller";
import { PrismaService } from "./lib/prisma.service";

@Module({
  imports: [],
  controllers: [EntityController, ConnectionController],
  providers: [EntityService, ConnectionService, PrismaService],
})
export class AppModule {}
