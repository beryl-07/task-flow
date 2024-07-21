import {
  IsDate,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Min,
} from "class-validator";
import { Transform, Type } from "class-transformer";
import { IsDateOlderThan } from "../../utils/decorators/is-date-older.decorator";

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize?: number = 10;
}

export class SortingDto {
  @IsOptional()
  @IsString()
  @IsIn([
    "id",
    "title",
    "assignedTo",
    "startAt",
    "endAt",
    "status",
    "priority",
    "createdAt",
    "updatedAt",
  ])
  sortBy?: string = "createdAt";

  @IsOptional()
  @IsIn(["asc", "desc"])
  sortOrder?: "asc" | "desc" = "desc";
}

export class FilteringDto {
  @IsOptional()
  @IsString()
  @Matches(/^\w+(\.\w+)*$/)
  assignedTo: string;

  @IsOptional()
  @IsString()
  @Matches(/^\w+(\.\w+)*$/)
  status: string;

  @IsOptional()
  @IsString()
  @Matches(/^\w+(\.\w+)*$/)
  priority: string;

  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsDateOlderThan("to", {
    message: "from must be older than to",
  })
  from: Date;

  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  to: Date;
}
