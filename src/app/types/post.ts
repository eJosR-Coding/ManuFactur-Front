export interface IPost {
    _id: string;
    title: string;
    body: string;
    user: { _id: string; username: string }; // Ensure user is an object here
    project?: string; // Reference to a project if needed
    comments: string[]; // Array of comment IDs
    likes: string[]; // Array of user IDs
    createdAt: string;
    updatedAt: string;
    imageUrl?: string; // Optional image URL for the post
  }
  