export interface AccountManagementProps {
    page: 'login' | 'signup' | 'profile' | 'forgot-password' | 'reset-password';
    onSuccess?: () => void;
    className?: string
}