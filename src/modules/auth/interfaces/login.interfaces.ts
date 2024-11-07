export declare interface LoginRequest {
    email: string;
    password: string;
}

export declare interface LoginResponse {
    id: number;
    accessToken: string;
    refreshToken: string;
    message: string;
    name:string
    email: string;
}