import { ApiProperty } from "@nestjs/swagger";

export class PaginationEntity {
  // Add Base64 regex in format
  @ApiProperty({ required: false, nullable: true })
  pageToken: string;

  @ApiProperty({ required: false, nullable: true })
  pageSize: number;
}

export class SortingEntity {
  @ApiProperty({ required: false, nullable: true })
  sortBy: string;

  @ApiProperty({ required: false, nullable: true })
  sortOrder: "asc" | "desc";
}

export class FilteringEntity {
  @ApiProperty({
    format: "/^(\\w+:\\w+(,\\w+:\\w+)*)?$/",
    required: false,
    nullable: true,
  })
  filter: string;
}
