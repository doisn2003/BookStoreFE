import React from 'react';
import { useNavigate } from 'react-router';
import SignupForm from '@components/SignupForm/SignupForm';
import './Signup.scss';
import api from '../../services/api';
import { API_ENDPOINTS } from '../../constants';
import type { SignupFormData } from '../../components/SignupForm/SignupForm';

const Signup: React.FC = () => {
    const navigate = useNavigate();

    const handleSubmit = async (data: SignupFormData) => {
        try {
            // Chuyển đổi field trước khi gửi
            const payload = {
                name: data.name,
                email: data.emailOrPhone,
                password: data.password,
                
            };
    
            console.log('Sending payload:', payload); // DEBUG
    
            await api.post(API_ENDPOINTS.AUTH.REGISTER, payload);
            navigate('/');
        } catch (error: unknown) {
            const errMsg = (error as { response?: { data?: { message?: string } } })?.response?.data?.message;
            alert(errMsg || 'Register failed!');
        }
    };
    

    const handleHavingAccount = () => {
        navigate('/');
    };

    return (
        <div className="login-container">
            <div className="login-content">
                <div className="login-left">
                    <img
                        src="/src/assets/book-logo.jpg"
                        alt="LOGO"
                        className="facebook-logo"
                    />
                </div>

                <div className="login-right">
                    <SignupForm
                        onSubmit={handleSubmit}
                        onHavingAccount={handleHavingAccount}
                    />
                </div>
            </div>
        </div>
    );
};

export default Signup; 