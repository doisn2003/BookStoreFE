import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@components/Button/Button';
import FormInput from '@components/FormInput/FormInput';
import './SignupForm.scss';

const forgotPasswordSchema = z.object({
    emailOrPhone: z.string().min(1, 'Email or phone number is required')
        .email('Please enter a valid email address')
});

type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

interface ForgotFormProps {
    sendPinCode: (data: ForgotPasswordData) => void;
    onHavingAccount: () => void;
}

const FogotForm: React.FC<ForgotFormProps> = ({ sendPinCode, onHavingAccount }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordData>({
        resolver: zodResolver(forgotPasswordSchema)
    });

    return (
        <div className="bookstore-forgot-container">
            <div className="bookstore-header">
                <h1>Reset Your Password</h1>
                <p>Enter your email to receive a reset code</p>
            </div>
            <form onSubmit={handleSubmit(sendPinCode)} className="forgot-form">
                <div className="form-section">
                    <div className="form-group">
                        <label>Email Address</label>
                        <FormInput
                            type="email"
                            placeholder="Enter your email address"
                            error={errors.emailOrPhone?.message}
                            {...register('emailOrPhone')}
                        />
                        <p className="form-help">
                            We'll send a verification code to your email address
                        </p>
                    </div>
                </div>

                <Button type="submit" fullWidth className="reset-button">
                    Send Reset Code
                </Button>

                <div className="form-footer">
                    <p>Remember your password?</p>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onHavingAccount}
                        className="login-link"
                    >
                        Back to Login
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default FogotForm; 