import { useEffect, useState } from "react";
import {TaskType} from "./schema";
import { columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<{
  data:TaskType[],
  meta: never
}> {
  const res = await fetch(
    // "https://my.api.mockaroo.com/payment_info.json?key=f0933e60"
      "http://localhost:3333/tasks"
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  // console.log(res.json());
  return res.json();
}

export default function TableExample() {
  const [taskData, setTaskData] = useState<TaskType[]>([]);
  useEffect(() => {
    const data = async () => {
      const result = await getData();
      setTaskData(result.data);
    };
    data();
  }, []);
  return <DataTable columns={columns} data={taskData} />;
}
