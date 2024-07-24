import { ColumnDef } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import { statuses, priorities } from "./filters"
import { DataTableRowActions } from "./data-table-row-actions"
import {TaskType} from "./schema"
import { Icons } from "@/components/icons"
import {formatDateTime} from "@/lib/utils.ts";

export const columns: ColumnDef<TaskType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
          <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Id
            <Icons.sort className="ml-2 h-4 w-4" />
          </Button>
      )
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <Icons.sort className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "assignedTo",
    header: ({ column }) => {
      return (
          <Button
              variant="ghost"
              className="-ml-4"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Assigned To
            <Icons.sort className="ml-2 h-4 w-4" />
          </Button>
      )
    },
  },
  {
    accessorKey: "startAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="-ml-4"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Start At
          <Icons.sort className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const formatted = formatDateTime(row.getValue("startAt"))
      return <div className=" font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "endAt",
    header: ({ column }) => {
      return (
          <Button
              variant="ghost"
              className="-ml-4"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            End At
            <Icons.sort className="ml-2 h-4 w-4" />
          </Button>
      )
    },
    cell: ({ row }) => {
      const formatted = formatDateTime(row.getValue("endAt"))
      return <div className=" font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
          <Button
              variant="ghost"
              className="-ml-4"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <Icons.sort className="ml-2 h-4 w-4" />
          </Button>
      )
    },
    cell: ({ row }) => {
      const status = statuses.find(
          (status) => status.value === row.getValue("status")
      )

      if (!status) {
        return null
      }

      return (
          <div className="flex w-[100px] items-center">
            {status.icon && (
                <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
            )}
            <span>{status.label}</span>
          </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => {
      return (
          <Button
              variant="ghost"
              className="-ml-4"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Priority
            <Icons.sort className="ml-2 h-4 w-4" />
          </Button>
      )
    },
    cell: ({ row }) => {
      const priority = priorities.find(
          (priority) => priority.value === row.getValue("priority")
      )

      if (!priority) {
        return null
      }

      return (
          <div className="flex w-[100px] items-center">
            {priority.icon && (
                <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
            )}
            <span>{priority.label}</span>
          </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: "actions",
    header: () => <div>Actions</div>,
    cell: ({ row }) => <DataTableRowActions row={row}/>
  },
]
