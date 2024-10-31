import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Req,
} from "@nestjs/common";
import { ConnectionService } from "./connection.service";
import { handleErrorResult } from "src/utils/services";

@Controller("connection")
export class ConnectionController {
  constructor(private connectionService: ConnectionService) {}

  @Get()
  async getConnections() {
    return this.connectionService.getConnections();
  }

  @Post()
  async createConnection(@Req() request: Request) {
    const result = await this.connectionService.createConnection(request.body);
    if (result.hasError) handleErrorResult(result);
    return result.data;
  }

  @Put(":id")
  async updateConnection(@Param("id") id: string, @Req() request: Request) {
    const result = await this.connectionService.updateConnection(
      id,
      request.body,
    );
    if (result.hasError) handleErrorResult(result);
    return result.data;
  }

  @Delete(":id")
  @HttpCode(204)
  async deleteConnection(@Param("id") id: string) {
    const result = await this.connectionService.deleteConnection(id);
    if (result.hasError) handleErrorResult(result);
    return result.data;
  }
}
