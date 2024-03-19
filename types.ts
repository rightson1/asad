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
  county?: string;
  thumbnail?: string;
}
export interface IUserFetched extends IUser, IFetched {}
export interface ITurfBase {
  title: string;
  size: string;
  hourlyRate: number;
  dailyRate: number;
  county: string;
  location: string;
  description: string;
  thumbnail: string;
  images: string[];
  owner: string;
}
