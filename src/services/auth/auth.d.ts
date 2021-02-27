declare interface IUserInfo {
    accessToken: string;
    accessTokenExpiresAt: string;
    refreshToken: string;
    refreshTokenExpiresAt: string;
    client: IClient;
    user: IUser;
    access_token: string;
}

declare interface IClient {
    id: string;
    clientId: string;
    clientSecret: string;
    grants: string[];
}

declare interface IUser {
    id: string;
    fullName: string;
    email: string;
    isVerified: boolean;
}