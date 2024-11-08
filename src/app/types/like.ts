export interface ILike {
    _id: string;
    user: string;  // Reference to IUser._id
    post?: string; // Reference to IPost._id if it's a post like
    comment?: string; // Reference to IComment._id if it's a comment like
  }
  