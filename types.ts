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
  status: "published" | "unpublished";
  dailyRate: number;
  county: string;
  location: string;
  description: string;
  thumbnail: string;
  images: string[];
  owner: string;
}
//ITurfFetched
export interface ITurfFetched extends ITurfBase, IFetched {}
export interface IOrderBase {
  turf: string | ITurfFetched;
  user: string | IUserFetched;
  startDate: Date;
  endDate: Date;
  dailyRate: number;
  owner: string;
  totalPrice: number;
  status: "pending" | "completed" | "cancelled";
  payment: "pending" | "completed" | "cancelled";
}
export interface IOrderFetched extends IFetched, IOrderBase {
  user: IUserFetched;
  turf: ITurfFetched;
}

export interface INotification {
  subject: string;
  link: string;
  to: string;
  from: string;
  message: string;
  type: "order" | "message";
  read: boolean;
  createdAt: string;
}
export interface INotificationFetched extends INotification {
  id: string;
}
