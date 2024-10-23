import { Controller, Get, Post, Req } from "@nestjs/common";
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
}
