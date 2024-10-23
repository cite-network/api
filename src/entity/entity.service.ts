import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/lib/prisma.service";
import { errorResult, successResult, ErrorCode } from "src/utils/services";
import { z } from "zod";

const entityCreationSchema = z.object({
  name: z.string(),
  type: z.enum(["creator", "content"]),
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
    const validationResult = entityCreationSchema.safeParse(data);
    if (!validationResult.success) {
      return errorResult(ErrorCode.BAD_REQUEST, "Invalid input");
    }
    const result = await this.prisma.entity.create({
      data: validationResult.data,
    });
    return successResult(result);
  }
}
