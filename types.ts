interface IFetched {
  createdAt: Date;
  updatedAt: Date;
  _id: string;
}
export interface IAuthUser {
  email: string;
  displayName?: string;
  photoURL?: string;
  uid: string;
}

export type InputChangeEventTypes =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;
export interface IFUser {
  displayName: string;
  email: string;
  uid: string;
}
export interface IUser extends IFUser {
  status: "active" | "banned";
  isSeller: boolean;
  thumbnail?: string;
}
export interface IUserFetched extends IUser, IFetched {}
