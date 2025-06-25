export const PROJECT_STATUS_MAP = {
    'in-progress': 'In Progress',
    'planning': 'Planning',
    'on-hold': 'On Hold',
    'completed': 'Completed',
    'cancelled': 'Cancelled',
}

export const PROJECT_UI_STATUS_MAP: Record<string, Record<string, string>> = {
  "in-progress": {
    label: "In Progress",
    color: "text-blue-600",
    bgColor: "bg-blue-200",
    borderColor: "border-blue-300",
  },
  planning: {
    label: "Planning",
    color: "text-yellow-600",
    bgColor: "bg-yellow-200",
    borderColor: "border-yellow-300",
  },
  "on-hold": {
    label: "On Hold",
    color: "text-gray-600",
    bgColor: "bg-gray-200",
    borderColor: "border-gray-300",
  },
  completed: {
    label: "Completed",
    color: "text-green-600",
    bgColor: "bg-green-200",
    borderColor: "border-green-300",
  },
  cancelled: {
    label: "Cancelled",
    color: "text-red-600",
    bgColor: "bg-red-200",
    borderColor: "border-red-300",
  },
};

export const PROJECT_UI_PRIORITY_MAP: Record<string, Record<string, string>> = {
  low: {
    label: "Low",
    color: "text-green-600",
    bgColor: "bg-green-200",
    borderColor: "border-green-300",
  },
  medium: {
    label: "Medium",
    color: "text-yellow-600",
    bgColor: "bg-yellow-200",
    borderColor: "border-yellow-300",
  },
  high: {
    label: "High",
    color: "text-red-600",
    bgColor: "bg-red-200",
    borderColor: "border-red-300",
  },
  critical: {
    label: "Critical",
    color: "text-purple-600",
    bgColor: "bg-purple-200",
    borderColor: "border-purple-300",
  },
};