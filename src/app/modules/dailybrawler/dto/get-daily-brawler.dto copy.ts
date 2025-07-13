import { ApiProperty } from "@nestjs/swagger";

export class GetDailyBrawlerDto {
  @ApiProperty({
    description: "Unique identifier for the daily brawler",
    example: "dailyBrawler123",
    type: String,
  })
  id: string;

  @ApiProperty({
    description: "Date for the daily brawler",
    example: "2023-10-01T00:00:00.000Z",
    type: Date,
  })
  date: Date;

  @ApiProperty({
    description: "Indicates if the daily brawler is active",
    example: true,
    type: Boolean,
  })
  active: boolean;

  @ApiProperty({
    description: "Brawler details associated with the daily brawler",
    type: Object,
    example: { // Added missing example
      id: "brawler123",
      name: "Shelly",
      rarity: "Trophy Road"
    }
  })
  brawler: any; 
}