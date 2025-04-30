import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from '@mike_hac/eshop-sharedauth';
import { FilterOrderDto } from './dto/filter-order.dto';

@Controller('api/order')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get('search')
  async findByFilter(
    @Query('status') status?: string,
    @Query('freeText') freeText?: string,
    @Query('userId') userId?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('minTotal') minTotal?: number,
    @Query('maxTotal') maxTotal?: number,
  ) {
    const filterDto = new FilterOrderDto();
    filterDto.status = status;
    filterDto.freeText = freeText;
    filterDto.userId = userId;
    filterDto.startDate = startDate ? new Date(startDate) : undefined;
    filterDto.endDate = endDate ? new Date(endDate) : undefined;
    filterDto.minTotal = minTotal;
    filterDto.maxTotal = maxTotal;

    return this.orderService.findByFilter(filterDto);
  }

  @Get('user/:userId')
  async findByUserId(@Param('userId') userId: string) {
    return await this.orderService.findByUserId(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
