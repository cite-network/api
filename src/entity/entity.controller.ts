import { Controller, Get, Post, Req } from "@nestjs/common";
import { EntityService } from "./entity.service";
import { handleErrorResult } from "src/utils/services";

@Controller("entity")
export class EntityController {
  constructor(private entityService: EntityService) {}

  @Get()
  async getEntities() {
    return this.entityService.getEntities();
  }

  @Post()
  async createEntity(@Req() request: Request) {
    const result = await this.entityService.createEntity(request.body);
    if (result.hasError) handleErrorResult(result);
    return result.data;
  }
}
