export enum AuthStatus {
    Unknown,
    Authenticated,
    Unauthenticated,
    Error,
}

export type User = {
    name: string;
};

export type AuthStateType =
    | {
          status: AuthStatus.Unknown;
      }
    | {
          status: AuthStatus.Authenticated;
          user: User;
      }
    | {
          status: AuthStatus.Unauthenticated;
      }
    | {
          status: AuthStatus.Error;
          message: string;
      };

export class AuthState {
    static initial: AuthStateType = { status: AuthStatus.Unknown };

    static authenticated(user: User): AuthStateType {
        return {
            status: AuthStatus.Authenticated,
            user,
        };
    }

    static error(message: string): AuthStateType {
        return {
            status: AuthStatus.Error,
            message,
        };
    }
}
