import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@components/Button/Button';
import FormInput from '@components/FormInput/FormInput';
import './SignupForm.scss';

const signupSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    gender: z.string().min(1, 'Gender is required'),
    dob: z.string().min(1, 'Date of birth is required'),
    emailOrPhone: z.string().min(1, 'Email or phone number is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type SignupFormData = z.infer<typeof signupSchema>;

interface SignupFormProps {
    onSubmit: (data: SignupFormData) => void;
    onHavingAccount: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSubmit, onHavingAccount }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema)
    });

    return (
        <div className="bookstore-signup-container">
            <div className="bookstore-header">
                <h1>Join BookStore</h1>
                <p>Start your literary journey today</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
                <div className="form-section">
                    <h3>Personal Information</h3>
                    <FormInput
                        type="text"
                        placeholder="Full Name"
                        error={errors.name?.message}
                        {...register('name')}
                    />
                    
                    <div className="form-group">
                        <label>Date of Birth</label>
                        <FormInput
                            type="date"
                            error={errors.dob?.message}
                            {...register('dob')}
                        />
                    </div>

                    <div className="form-group">
                        <label>Gender</label>
                        <div className="gender-options">
                            <label className="radio-option">
                                <input type="radio" value="female" {...register('gender')} />
                                <span>Female</span>
                            </label>
                            <label className="radio-option">
                                <input type="radio" value="male" {...register('gender')} />
                                <span>Male</span>
                            </label>
                            <label className="radio-option">
                                <input type="radio" value="other" {...register('gender')} />
                                <span>Other</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Account Details</h3>
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
                </div>

                <Button type="submit" fullWidth className="signup-button">
                    Create Account
                </Button>

                <div className="form-footer">
                    <p>Already have an account?</p>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onHavingAccount}
                        className="login-link"
                    >
                        Sign In
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SignupForm; 