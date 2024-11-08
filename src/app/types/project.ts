export interface IProject {
    _id: string;
    name: string;
    description?: string;
    creator: string; // Reference to IUser._id
    members: string[]; // Array of user IDs
    posts: string[]; // Array of post IDs
  }
  