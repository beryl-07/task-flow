import * as React from "react";

import { type Row } from "@tanstack/react-table";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { TaskType } from "@/pages/data-table/schema.ts";

interface DeleteDialogProps extends React.ComponentPropsWithoutRef<typeof Dialog> {
    tasks: Row<TaskType>["original"][];
    showTrigger?: boolean;
    onSuccess?: () => void;
}

export function DeleteDialog({
                                 tasks,
                                 showTrigger = true,
                                 onSuccess,
                                 ...props
                             }: DeleteDialogProps) {
    const [isDeletePending, startDeleteTransition] = React.useTransition();

    async function deleteTasks() {
        return await fetch(`${import.meta.env.VITE_API_URL}/tasks/deleteMany`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                taskIds: tasks.map((task) => task.id),
            }),
        });
    }

    async function handleDelete() {
        const response = await deleteTasks();
        let error = null;
        if (!response.ok) {
            const responseBody = await response.json();
            error = responseBody.error;
        }

        if (error) {
            console.log(error);
            return;
        }

        startDeleteTransition(() => {
            props.onOpenChange?.(false);
            console.log("Tasks deleted");
            onSuccess?.();
            window.location.reload();
        });
    }

    return (
        <Dialog {...props}>
            {showTrigger ? (
                <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                        <Icons.trash className="mr-2 size-4" aria-hidden="true" />
                        Delete ({tasks.length})
                    </Button>
                </DialogTrigger>
            ) : null}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your{" "}
                        <span className="font-medium">{tasks.length}</span>
                        {tasks.length === 1 ? " task" : " tasks"} from our servers.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2 sm:space-x-0">
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                        aria-label="Delete selected rows"
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isDeletePending}
                    >
                        {isDeletePending && (
                            <Icons.loader
                                className="mr-2 size-4 animate-spin"
                                aria-hidden="true"
                            />
                        )}
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}