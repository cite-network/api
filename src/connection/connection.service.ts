import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/lib/prisma.service";
import { ErrorCode, errorResult, successResult } from "src/utils/services";
import { z } from "zod";

const connectionSchema = z.object({
  type: z.enum(["author", "citation"]),
  source_entity_id: z.string(),
  target_entity_id: z.string(),
  metadata: z.any(),
  weight: z.number().optional(),
});

@Injectable()
export class ConnectionService {
  constructor(private prisma: PrismaService) {}

  async getConnections() {
    return this.prisma.connection.findMany();
  }

  async createConnection(data: any) {
    const validationResult = connectionSchema.safeParse(data);
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

  async updateConnection(id: string, data: any) {
    const connection = await this.prisma.connection.findUnique({
      where: { id },
    });
    if (!connection) {
      return errorResult(ErrorCode.NOT_FOUND, "Connection not found");
    }
    const validationResult = connectionSchema.partial().safeParse(data);
    if (!validationResult.success) {
      return errorResult(ErrorCode.BAD_REQUEST, "Invalid input");
    }
    const connectionToUpdate = validationResult.data;
    const entities = [] as string[];
    if (connectionToUpdate.source_entity_id)
      entities.push(connectionToUpdate.source_entity_id);
    if (connectionToUpdate.target_entity_id)
      entities.push(connectionToUpdate.target_entity_id);
    const count = await this.prisma.entity.count({
      where: {
        id: {
          in: entities,
        },
      },
    });
    if (count !== entities.length) {
      return errorResult(ErrorCode.NOT_FOUND, "One or more entities not found");
    }
    const result = await this.prisma.connection.update({
      where: { id },
      data,
    });
    return successResult(result);
  }

  async deleteConnection(id: string) {
    const connection = await this.prisma.connection.findUnique({
      where: { id },
    });
    if (!connection) {
      return errorResult(ErrorCode.NOT_FOUND, "Connection not found");
    }
    const result = await this.prisma.connection.delete({
      where: { id },
    });
    return successResult(result);
  }
}
