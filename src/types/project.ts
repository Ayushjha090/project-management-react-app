import type { Task } from "./task";

export interface Project {
    id: string;
    name: string;
    description: string;
    status: 'in-progress' | 'planning' | 'on-hold' | 'completed' | 'cancelled';
    priority: 'low' | 'medium' | 'high' | 'critical';
    tasks: Task[];
    startDate: Date | null;
    dueDate: Date | null;
    createdAt: Date;
    updatedAt: Date;
}