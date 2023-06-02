export interface UserState {
    id?: number;
    email?: string;
    nickname?: string;
    photo?: string;
    loggedIn?: boolean;
    access_token?: string;
    expires_in?: number;
}