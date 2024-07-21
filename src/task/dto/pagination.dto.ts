import {
  IsBase64,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Min,
} from "class-validator";
import { Type } from "class-transformer";

export class PaginationDto {
  @IsOptional()
  @IsBase64()
  pageToken?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize?: number = 10;
}

export class SortingDto {
  @IsOptional()
  @IsString()
  sortBy?: string = "createdAt";

  @IsOptional()
  @IsIn(["asc", "desc"])
  sortOrder?: "asc" | "desc" = "desc";
}

export class FilteringDto {
  @IsOptional()
  @IsString()
  @Matches(/^(\w+:\w+(,\w+:\w+)*)?$/)
  filter?: string;
}

// export class paginatedQueryDto {
//   @IsOptional()
//   @Type(() => Number)
//   @IsInt()
//   @Min(1)
//   page?: number = 1;
//
//   @IsOptional()
//   @Type(() => Number)
//   @IsInt()
//   @Min(1)
//   pageSize?: number = 10;
//
//   @IsOptional()
//   @IsString()
//   sortBy?: string = "createdAt";
//
//   @IsOptional()
//   @IsIn(["asc", "desc"])
//   sortOrder?: "asc" | "desc" = "desc";
//
//   @IsOptional()
//   @IsString()
//   @Matches(/^(\w+:\w+(,\w+:\w+)*)?$/)
//   filter?: string;
// }
