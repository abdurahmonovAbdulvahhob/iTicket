import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class CreateSeatTypeDto {
  @ApiProperty({
    example: "VIP",
    description: "Seat type's name",
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}