import { Icons } from "@/components/icons";

export const statuses = [
    {
      value: "TODO",
      label: "Todo",
      icon: Icons.circle,
    },
    {
      value: "IN_PROGRESS",
      label: "In Progress",
      icon: Icons.pending,
    },
    {
      value: "COMPLETED",
      label: "Completed",
      icon: Icons.checked,
    },
  ]

export const priorities = [
    {
      value: "HIGH",
      label: "High",
      icon: Icons.up,
    },
    {
      value: "MEDIUM",
      label: "Medium",
      icon: Icons.right,
    },
    {
      value: "LOW",
      label: "Low",
      icon: Icons.down,
    },
]