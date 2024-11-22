import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SeatTypeService } from './seat_type.service';
import { CreateSeatTypeDto } from './dto/create-seat_type.dto';
import { UpdateSeatTypeDto } from './dto/update-seat_type.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SeatType } from './models/seat_type.model';

@ApiTags("SeatType")
@Controller("seat-type")
export class SeatTypeController {
  constructor(private readonly seatTypeService: SeatTypeService) {}

  @Post("create")
  @ApiOperation({summary: "Create a new seat type"})
  @ApiResponse({
    status: 201,
    description: "New seat type created successfully",
    type: SeatType,
  })
  async createSeatType(
    @Body() createSeatTypeDto: CreateSeatTypeDto
  ) {
    return this.seatTypeService.createSeatType(
      createSeatTypeDto
    );
  }

  @Get('all')
  @ApiOperation({summary: "Get all seat types"})
  @ApiResponse({
    status: 200,
    description: "List of all seat types",
    type: [SeatType],
  })
  async getAllSeatTypes() {
    return this.seatTypeService.getAllSeatTypes();
  }


  @Get(':id')
  @ApiOperation({ summary: "Get a seat type by id"})
  @ApiResponse({
    status: 200,
    description: "Get seat type by id",
    type: SeatType,
  })
  async getSeatTypeById(@Param('id') id: number) {
    return this.seatTypeService.getSeatTypeById(id);
  }

  @Put('update/:id')
  @ApiOperation({summary: "Update a seat type by id"})
  @ApiResponse({
    status: 200,
    description: "Update seat type by id",
    type: SeatType,
  })
  async updateSeatTypeById(@Param('id') id: number, @Body() updateSeatTypeDto: UpdateSeatTypeDto){
    return this.seatTypeService.updateSeatType(id, updateSeatTypeDto);
  }

  @Delete('delete/:id')
  @ApiOperation({summary: "Delete a seat type by id"})
  @ApiResponse({
    status: 200,
    description: "Delete seat type by id",
    type: SeatType,
  })
  async deleteSeatType(@Param('id') id: number) {
    return this.seatTypeService.deleteSeatType(id);
  }
}
