import { ApiProperty } from "@nestjs/swagger";

export class CreateDailyBrawlerDto {
  @ApiProperty({
    description: "Brawler ID",
    example: "brawler123",
    type: String,
  })
  brawlerId: string;


  @ApiProperty({
    description: "Date for the daily brawler",
    example: "2023-10-01T00:00:00.000Z",
    type: String,
    required: true,
  })
  date: Date;

  @ApiProperty({
    description: "Indicates if the daily brawler is active",
    example: true,
    type: Boolean,
    required: true,
  })
  active: boolean;
}