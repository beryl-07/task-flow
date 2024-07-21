import { ApiProperty } from "@nestjs/swagger";

export class PaginationEntity {
  @ApiProperty({ required: false, nullable: true })
  page: number;

  @ApiProperty({ required: false, nullable: true })
  pageSize: number;
}

export class SortingEntity {
  @ApiProperty({ required: false, nullable: true })
  sortBy:
    | "id"
    | "title"
    | "assignedTo"
    | "startAt"
    | "endAt"
    | "status"
    | "priority"
    | "createdAt"
    | "updatedAt";

  @ApiProperty({ required: false, nullable: true })
  sortOrder: "asc" | "desc";
}

export class FilteringEntity {
  @ApiProperty({
    format: "/^\\w+(\\.\\w+)*$/",
    required: false,
    nullable: true,
  })
  assignedTo: string;

  @ApiProperty({
    format: "/^\\w+(\\.\\w+)*$/",
    required: false,
    nullable: true,
  })
  status: string;

  @ApiProperty({
    format: "/^\\w+(\\.\\w+)*$/",
    required: false,
    nullable: true,
  })
  priority: string;

  @ApiProperty({
    format: "/^\\w+(\\.\\w+)*$/",
    required: false,
    nullable: true,
  })
  from: Date;

  @ApiProperty({
    format: "/^\\w+(\\.\\w+)*$/",
    required: false,
    nullable: true,
  })
  to: Date;
}
