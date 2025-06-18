export interface Task {
    id: string;
    title: string;
    description: string;
    projectId: string;
    status: 'to-do' | 'in-progress' | 'in-review' | 'on-hold' | 'done' | 'blocked';
    priority: 'low' | 'medium' | 'high' | 'critical';
    startDate: Date;
    dueDate: Date;
    createdAt: Date;
    updatedAt: Date;
}