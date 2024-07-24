import { useState } from "react";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";
import { TaskPriority, TaskSchema, TaskStatus, TaskType } from "@/pages/data-table/schema.ts";

// import { TaskSchema} from "./schema";
import { DeleteDialog } from "./dialogs/delete-dialog";
import EditDialog from "@/pages/data-table/dialogs/edit-dialog.tsx";
import React from "react";
import { priorities, statuses } from "./filters";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [dialogContent, setDialogContent] = useState<React.ReactNode | null>(
    null
  );
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [isUpdatePending, startUpdateTransition] = React.useTransition();
  const task = TaskSchema.parse(row.original);

  const handleEditClick = () => {
    setDialogContent(<EditDialog task={task} />);
  };
  async function editTask(task: TaskType) {
    return await fetch(`http://127.0.0.1:3333/tasks/${task.id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
  }

  function onSubmit(values: TaskType) {
    (async () => {
      const response = await editTask(values);
      let error = null;
      if (!response.ok) {
        const responseBody = await response.json();
        error = responseBody.error;
      }

      if (error) {
        return;
      }
      window.location.reload();
    })();
  }
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DialogTrigger asChild onClick={handleEditClick}>
            <DropdownMenuItem>
              <Icons.edit className="mr-2 h-4 w-4" />
              Edit Details
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup
                value={task.status}
                onValueChange={(value) => {
                  startUpdateTransition(() => {
                    console.log(value);
                    onSubmit({
                      ...task,
                      status:value as TaskStatus
                    })
                  });
                }}
              >
                {statuses.map((status, index) => (
                  <DropdownMenuRadioItem
                    key={index}
                    value={status.value}
                    className="capitalize"
                    disabled={isUpdatePending}
                  >
                    {status.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Priority</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup
                value={task.priority}
                onValueChange={(value) => {
                  startUpdateTransition(() => {
                    console.log(value);
                    onSubmit({
                      ...task,
                      priority:value as TaskPriority
                    })
                  });
                }}
              >
                {priorities.map((priority, index) => (
                  <DropdownMenuRadioItem
                    key={index}
                    value={priority.value}
                    className="capitalize"
                    disabled={isUpdatePending}
                  >
                    {priority.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => setShowDeleteDialog(true)}
            className="text-red-600"
          >
            <Icons.delete className="mr-2 h-4 w-4" />
            Delete Details
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {dialogContent && <DialogContent>{dialogContent}</DialogContent>}
      <DeleteDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        tasks={[task]}
        showTrigger={false}
        onSuccess={() => row.toggleSelected(false)}
      />
    </Dialog>
  );
}
