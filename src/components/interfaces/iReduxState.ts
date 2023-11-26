import { IFriend } from "./IFriend";
import { IFriendGoodDeeds } from "./IFriendGoodDeeds";
import { IGoodDeed } from "./IGoodDeed";
import { IUser } from "./IUser";
import { ISignInData } from "./iSignInData";
import { ISignUpData } from "./iSignUpData";

export interface IReduxState {
  signUpData: ISignUpData;
  signInData: ISignInData;
  isInvalidData: boolean;
  isAuth: boolean;
  isAuthInProgress: boolean;
  user: IUser;
  goodDeeds: IGoodDeed[];
  users: IUser[];
  friends: IFriend[];
  friendGoodDeeds: IFriendGoodDeeds;
}
