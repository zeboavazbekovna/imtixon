export declare interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

export declare interface RegisterResponse {
    id: number;
    name:string
    email: string;
    accessToken: string;
    refreshToken: string;
    message: string;
}