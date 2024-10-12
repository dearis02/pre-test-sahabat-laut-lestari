interface LoginReq {
    username: string;
    password: string;
}

interface LoginRes {
    accessToken: string;
    refreshToken: string;
}

interface CheckSessionReq {
    token: string;
}
export type { LoginReq, LoginRes, CheckSessionReq };