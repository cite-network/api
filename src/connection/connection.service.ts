import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/lib/prisma.service";
import { ErrorCode, errorResult, successResult } from "src/utils/services";
import { z } from "zod";

const connectionCreationSchema = z.object({
  type: z.enum(["creation", "citation"]),
  source_entity_id: z.string(),
  target_entity_id: z.string(),
  metadata: z.any(),
  weight: z.number(),
});

@Injectable()
export class ConnectionService {
  constructor(private prisma: PrismaService) {}

  async getConnections() {
    return this.prisma.connection.findMany();
  }

  async createConnection(data: any) {
    const validationResult = connectionCreationSchema.safeParse(data);
    if (!validationResult.success) {
      return errorResult(ErrorCode.BAD_REQUEST, "Invalid input");
    }
    const newConnection = validationResult.data;
    const count = await this.prisma.entity.count({
      where: {
        id: {
          in: [newConnection.source_entity_id, newConnection.target_entity_id],
        },
      },
    });
    if (count !== 2) {
      return errorResult(ErrorCode.NOT_FOUND, "One or more entities not found");
    }
    const result = await this.prisma.connection.create({
      data: newConnection,
    });
    return successResult(result);
  }
}
