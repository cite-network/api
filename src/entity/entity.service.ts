import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/lib/prisma.service";
import { errorResult, successResult, ErrorCode } from "src/utils/services";
import { z } from "zod";

const entitySchema = z.object({
  name: z.string(),
  type: z.enum(["person", "org", "content"]),
  metadata: z.any(),
});

@Injectable()
export class EntityService {
  constructor(private prisma: PrismaService) {}

  async getEntities() {
    return this.prisma.entity.findMany({
      include: {
        source_connections: true,
        target_connections: true,
      },
    });
  }

  async createEntity(data: any) {
    const validationResult = entitySchema.safeParse(data);
    if (!validationResult.success) {
      return errorResult(ErrorCode.BAD_REQUEST, "Invalid input");
    }
    const result = await this.prisma.entity.create({
      data: validationResult.data,
    });
    return successResult(result);
  }

  async updateEntity(id: string, data: any) {
    const entity = await this.prisma.entity.findUnique({
      where: { id },
    });
    if (!entity) {
      return errorResult(ErrorCode.NOT_FOUND, "Entity not found");
    }
    const validationResult = entitySchema.partial().safeParse(data);
    if (!validationResult.success) {
      return errorResult(ErrorCode.BAD_REQUEST, "Invalid input");
    }
    const result = await this.prisma.entity.update({
      where: { id },
      data,
    });
    return successResult(result);
  }

  async deleteEntity(id: string) {
    const entity = await this.prisma.entity.findUnique({
      where: { id },
    });
    if (!entity) {
      return errorResult(ErrorCode.NOT_FOUND, "Entity not found");
    }
    const result = await this.prisma.entity.delete({
      where: { id },
    });
    return successResult(result);
  }
}
