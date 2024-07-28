import { Schema, model, Document } from 'mongoose';

interface ITodo extends Document {
  title: string;
  completed: boolean;
  user: Schema.Types.ObjectId;
}

const TodoSchema = new Schema<ITodo>({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export const Todo = model<ITodo>('Todo', TodoSchema);