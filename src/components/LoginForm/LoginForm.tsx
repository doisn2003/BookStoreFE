import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@components/Button/Button';
import FormInput from '@components/FormInput/FormInput';
import './LoginForm.scss';

const loginSchema = z.object({
    emailOrPhone: z.string().min(1, 'Email or phone number is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
    onSubmit: (data: LoginFormData) => void;
    onCreateAccount: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, onCreateAccount }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    });

    return (
        <div className="bookstore-login-container">
            <div className="bookstore-header">
                <h1>Welcome to BookStore</h1>
                <p>Your Literary Sanctuary</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="login-form">
                <FormInput
                    type="text"
                    placeholder="Email address or phone number"
                    error={errors.emailOrPhone?.message}
                    {...register('emailOrPhone')}
                />

                <FormInput
                    type="password"
                    placeholder="Password"
                    error={errors.password?.message}
                    {...register('password')}
                />

                <Button type="submit" fullWidth className="login-button">
                    Sign In
                </Button>

                <a href="/forgot-password" className="forgot-password">
                    Forgot your password?
                </a>

                <hr className="divider" />

                <Button
                    type="button"
                    variant="secondary"
                    onClick={onCreateAccount}
                    className="create-account-btn"
                >
                    Create New Account
                </Button>
            </form>
        </div>
    );
};

export default LoginForm; 