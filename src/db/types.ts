// src/db/types.ts
import { Generated } from 'kysely';

export interface Task {
  id: Generated<number>;
  title: string;
  description: string | null;
  status: string;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}

export interface DB {
  tasks: Task;
}
