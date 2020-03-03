export interface TokenObj {
    access_token: string;
    refresh_token: string;
}

export interface LocalStorage {
    setToken(tokenObj: TokenObj): void,
    getAccessToken(): string | null,
    getRefreshToken(): string | null,
    clearToken(): void
}

const LocalStorageService: LocalStorage = {
    setToken: (tokenObj: TokenObj) => {
        localStorage.setItem('access_token', tokenObj.access_token);
        localStorage.setItem('refresh_token', tokenObj.refresh_token);
    },
    getAccessToken: () => {
        return localStorage.getItem('access_token');
    },
    getRefreshToken: () => {
        return localStorage.getItem('refresh_token');
    },
    clearToken: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    }
}

export default LocalStorageService;