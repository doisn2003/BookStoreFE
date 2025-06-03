import React from 'react';
import { useNavigate } from 'react-router';
import LoginForm from '@components/LoginForm/LoginForm';
import './Login.scss';
import api from '../../services/api';
import { API_ENDPOINTS, STORAGE_KEYS } from '../../constants';
import { useAuthStore } from '../../store/authStore';
import type { LoginFormData } from '../../components/LoginForm/LoginForm';
import type { AuthState } from '../../store/authStore';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const setUser = useAuthStore((state: AuthState) => state.setUser);
    const setToken = useAuthStore((state: AuthState) => state.setToken);

    const handleSubmit = async (data: LoginFormData) => {
        try {
            const res = await api.post(API_ENDPOINTS.AUTH.LOGIN, {
                email: data.emailOrPhone,
                password: data.password,
            });
            const { token, user } = res.data;
            setToken(token);
            setUser(user);
            localStorage.setItem(STORAGE_KEYS.TOKEN, token);
            localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
            navigate('/home');
        } catch (error: unknown) {
            const errMsg = (error as { response?: { data?: { message?: string } } })?.response?.data?.message;
            alert(errMsg || 'Login failed!');
        }
    };

    const handleCreateAccount = () => {
        navigate('/signup');
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-content">
                    <div className="login-left">
                        <img
                            src="/src/assets/book-logo.jpg"
                            alt="LOGO"
                            className="facebook-logo"
                        />
                        <h2>BookStore is the best place to read and share your favorite books.</h2>
                    </div>

                    <div className="login-right">
                        <LoginForm
                            onSubmit={handleSubmit}
                            onCreateAccount={handleCreateAccount}
                        />
                        <div className="login-options">
                            <button 
                                className="admin-login-button"
                                onClick={() => navigate('/admin/login')}
                            >
                                Login as Admin
                            </button>
                            <button 
                                className="register-button"
                                onClick={() => navigate('/register')}
                            >
                                Register
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login; 