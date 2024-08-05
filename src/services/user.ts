import { LoginUserResponse, AllUsersResponse, SingleUserResponse } from '../types/user';
import { customPost, loginRoute, customGet, getAllUsersRoute, getUserByIdRoute, blockUserRoute, customPut, registerRoute, logoutRoute } from './services';

export async function login(username: string, password: string): Promise<LoginUserResponse> {
    return customPost<LoginUserResponse>({ url: loginRoute, body: { username, password }, requiresAuth: false });
}

export async function getAllUsers(): Promise<AllUsersResponse[]> {
    return customGet<AllUsersResponse[]>({ url: getAllUsersRoute, requiresAuth: true });
}

export async function getUserById(id: number): Promise<SingleUserResponse> {
    return customGet<SingleUserResponse>({ url: getUserByIdRoute + id, requiresAuth: true });
}

export async function blockUser(user: SingleUserResponse): Promise<void> {
    return customPut<void>({
        url: blockUserRoute + user.id, body: {
            name: user.name,
            username: user.username,
            dateOfBirth: user.dateOfBirth,
            status: user.status,
            orders: user.orders,

        }, requiresAuth: true
    });
}

export async function register(username: string, password: string, name: string, orders: number, image: File, dateOfBirth: string): Promise<AllUsersResponse> {
    const formData = new FormData();
    formData.append('image', image);
    const userData = {
        username,
        password,
        name,
        orders,
        dateOfBirth,
        role: "employee"
    };
    formData.append('userData', JSON.stringify(userData));
    console.log(formData.get('image'));

    return customPost<AllUsersResponse>({ url: registerRoute, body: formData, requiresAuth: false });
}

export async function logout(): Promise<void> {
    return customPost<void>({ url: logoutRoute, requiresAuth: true });
}