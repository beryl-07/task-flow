import { z } from "zod"

const TaskPriority = z.enum(["HIGH", "LOW", "MEDIUM"]);
export type TaskPriority = z.infer<typeof TaskPriority>;

const TaskStatus = z.enum(["TODO", "IN_PROGRESS", "COMPLETED"]);
export type TaskStatus = z.infer<typeof TaskStatus>;

export const TaskSchema = z.object({
  id: z.string().cuid(),
  title: z.string(),
  assignedTo:  z
      .string()
      // .min(1, { message: "Email is Required" })
      .email({ message: "Must be a valid Email" }),
  startAt: z.coerce.date(),
  endAt: z.coerce.date(),
  status: TaskStatus.default("TODO"),
  priority: TaskPriority.default("MEDIUM"),
  createdAt: z.coerce.date().default(() => new Date()),
  updatedAt: z.coerce.date().optional()
}).refine(data => data.startAt < data.endAt, {
  message: "startAt must be before endAt",
  path: ["startAt"],
});

export type TaskType = z.infer<typeof TaskSchema>;