
export interface Task {
  _id: string;
  name: string;
  category: string;
  lane: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Lane {
  _id: string;
  name: string;
  order: number;
}

export interface Timer {
  _id: string;
  taskId: string;
  createdAt: Date;
  duration: number;
  complete: boolean;
}
export interface Category {
  _id: string;
  name: string;
}
