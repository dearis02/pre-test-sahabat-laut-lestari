import { useMutation } from "@tanstack/react-query";
import { LoginReq, LoginRes } from "@/types/auth";
import { $isLoggedIn } from "@/stores/auth";
import api from "@/utils/api";

const ACCESS_TOKEN_KEY = "accessToken"
const REFRESH_TOKEN_KEY = "refreshToken"

function useLogin() {
    const query = useMutation({
        mutationFn: async (req: LoginReq): Promise<LoginRes> => {
            return api.post("/auth/login", req);
        },
    });

    return query;
}

async function rotateToken(accessToken: string): Promise<LoginRes> {
    return api.get("/auth/refresh-token", {
        params: {
            token: accessToken
        }
    });
}

function setLoginSession(login: boolean) {
    $isLoggedIn.set(login)
}

function setToken(accessToken: string, refreshToken: string) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

function clearToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
}

function isUserLoggedIn() {
    return $isLoggedIn.value || !!localStorage.getItem("accessToken");
}

function getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export { useLogin, setLoginSession, setToken, isUserLoggedIn, clearToken, rotateToken, getAccessToken };