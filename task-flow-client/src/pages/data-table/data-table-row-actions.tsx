import { useState } from "react";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";
import {TaskSchema} from "@/pages/data-table/schema.ts";

// import { TaskSchema} from "./schema";
import {DeleteDialog} from "./dialogs/delete-dialog";
import EditDialog from "@/pages/data-table/dialogs/edit-dialog.tsx";

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
  const task = TaskSchema.parse(row.original);

  const handleEditClick = () => {
    setDialogContent(
        <EditDialog task={task}/>
    );
  };

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DialogTrigger asChild onClick={handleEditClick}>
            <DropdownMenuItem>
              <Icons.edit className='mr-2 h-4 w-4' />
              Edit Details
            </DropdownMenuItem>
          </DialogTrigger>

          <DropdownMenuItem
            onSelect={() => setShowDeleteDialog(true)}
            className='text-red-600'
          >
            <Icons.delete className='mr-2 h-4 w-4' />
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
