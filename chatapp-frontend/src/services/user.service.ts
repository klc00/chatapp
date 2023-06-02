import { LoginRequestInterface } from '@/entities/request/login.request.interface';
import { LoginResponseInterface } from '@/entities/response/login.response.interface';
import { PasswordResetRequestInterface } from '@/entities/request/password-reset.request.interface';
import { PasswordResetResponseInterface } from '@/entities/response/password-reset.response.interface';
import { ProfileResponseInterface } from '@/entities/response/profile.response.interface';
import { RegisterRequestInterface } from '@/entities/request/register.request.interface';
import { RegisterResponseInterface } from '@/entities/response/register.response.interface';
import { ResultInterface } from '@/entities/interfaces/result.interface';
import axios from 'axios';
import authHeader from './auth-header';

class UserService {
    login(loginRequest: LoginRequestInterface): Promise<ResultInterface<LoginResponseInterface>> {
        return axios.post('http://localhost:3001/api/user/login', loginRequest)
            .then(res => {
                const result: ResultInterface<LoginResponseInterface> = {
                    statusCode: 200,
                    data: res.data,
                };

                localStorage.setItem("access_token", result.data?.access_token as string);
                localStorage.setItem("expires_in", result.data?.expires_in.toString() as string);

                return result;
            }).catch(error => {
                const result: ResultInterface<LoginResponseInterface> = {
                    statusCode: error.response.data.statusCode,
                    message: error.response.data.message,
                };

                return result;
            });
    }

    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('expires_in');
    }

    register(registerRequest: RegisterRequestInterface): Promise<ResultInterface<RegisterResponseInterface>> {
        return axios.post('http://localhost:3001/api/user/register', registerRequest)
            .then(res => {
                const result: ResultInterface<RegisterResponseInterface> = {
                    statusCode: 200,
                    data: res.data,
                };

                return result;
            }).catch(error => {
                const result: ResultInterface<RegisterResponseInterface> = {
                    statusCode: error.response.data.statusCode,
                    message: error.response.data.message,
                };

                return result;
            });
    }

    passwordReset(passwordResetRequest: PasswordResetRequestInterface): Promise<ResultInterface<PasswordResetResponseInterface>> {
        return axios.post('http://localhost:3001/api/user/resetpassword', passwordResetRequest)
            .then(res => {
                const result: ResultInterface<PasswordResetResponseInterface> = {
                    statusCode: 200,
                    data: res.data,
                };

                return result;
            }).catch(error => {
                const result: ResultInterface<PasswordResetResponseInterface> = {
                    statusCode: error.response.data.statusCode,
                    message: error.response.data.message,
                };

                return result;
            });
    }

    getProfile(): Promise<ResultInterface<ProfileResponseInterface>> {
        return axios.get('http://localhost:3001/api/user/profile', {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") }
        })
            .then(res => {
                const result: ResultInterface<ProfileResponseInterface> = {
                    statusCode: 200,
                    data: res.data,
                };

                return result;
            }).catch(error => {
                const result: ResultInterface<ProfileResponseInterface> = {
                    statusCode: error.response.data.statusCode,
                    message: error.response.data.message,
                };

                return result;
            });
    }
}

export default new UserService();