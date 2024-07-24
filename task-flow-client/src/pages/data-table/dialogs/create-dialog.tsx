import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icons } from "@/components/icons";
import { useForm } from "react-hook-form";

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

import { TaskSchema, TaskType } from "../schema";
import { CreateTaskForm } from "@/pages/data-table/dialogs/create-task-form.tsx";
import { redirect } from "react-router-dom";

export function CreateTaskDialog() {
  const [open, setOpen] = React.useState(false);
  const [isCreatePending, startCreateTransition] = React.useTransition();

  const form = useForm<TaskType>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      title: "",
      assignedTo: "",
      startAt: new Date(),
      endAt: (() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow;
      })(),
      status: "TODO",
      priority: "MEDIUM",
    },
  });

  async function createTask(task: TaskType) {
    return await fetch(`http://127.0.0.1:3333/tasks/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
  }

  function onSubmit(data: TaskType) {
    (async () => {
      console.log("data");
      console.log(data);
      try {
        const response = await createTask(data);
        console.log(response);
        let error = null;
        if (!response.ok) {
          const responseBody = await response.json();
          error = responseBody.error;
        }

        if (error) {
          console.log(error);
          return;
        }
        console.log("Done");
        startCreateTransition(() => {
          console.log("in");
          form.reset();
          setOpen(false);
          redirect("/");
        });
      } catch (error) {
        console.error(error);
      }
    })();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Icons.plus className="mr-2 size-4" aria-hidden="true" />
          New task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create task</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new task.
          </DialogDescription>
        </DialogHeader>
        <CreateTaskForm form={form} onSubmit={onSubmit}>
          <DialogFooter className="gap-2 pt-2 sm:space-x-0">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isCreatePending} type="submit">
              {isCreatePending && (
                <Icons.loader
                  className="mr-2 size-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Create
            </Button>
          </DialogFooter>
        </CreateTaskForm>
      </DialogContent>
    </Dialog>
  );
}
