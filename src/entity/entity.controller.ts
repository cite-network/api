import { Controller, Delete, Get, Param, Post, Put, Req } from "@nestjs/common";
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

  @Put(":id")
  async updateEntity(@Param("id") id: string, @Req() request: Request) {
    const result = await this.entityService.updateEntity(id, request.body);
    if (result.hasError) handleErrorResult(result);
    return result.data;
  }

  @Delete(":id")
  async deleteEntity(@Param("id") id: string) {
    const result = await this.entityService.deleteEntity(id);
    if (result.hasError) handleErrorResult(result);
    return result.data;
  }
}
