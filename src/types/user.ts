export interface LoginUserResponse {
    user: {
        id: number;
        name: string;
        username: string;
        password: string;
        roleId: number;
        lastLoginDate: string;
        orders: number;
        status: string;
        image: string;
        dateOfBirth: string;
        created_at: string;
        updated_at: string;
        role: {
            name: string;
        }
    }
    token: string;
}

export interface RouteResponse {
    status: number;
    message: string;
}

export interface AllUsersResponse {
    id: number;
    name: string;
    username: string;
    lastLoginDate: string;
    role: {
        name: string;
    }
}

export interface SingleUserResponse {
    id: number;
    name: string;
    username: string;
    orders?: number;
    lastLoginDate?: string;
    image?: string;
    status?: string;
    dateOfBirth: string;
    role: {
        name: string;
    }
}