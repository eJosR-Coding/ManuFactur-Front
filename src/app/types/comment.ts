export interface IComment {
  _id: string;
  body: string;
  user: { _id: string; username: string };
  post: string;
  parentCommentId?: string; // Cambiado a parentCommentId para consistencia
  replies?: IComment[];
  createdAt: string;
  updatedAt: string;
}
