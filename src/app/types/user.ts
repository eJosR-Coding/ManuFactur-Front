export interface IUser {
    _id: string;
    username: string;
    email: string;
    profile: {
      bio?: string;
      profilePicture?: string;
    };
  }
  