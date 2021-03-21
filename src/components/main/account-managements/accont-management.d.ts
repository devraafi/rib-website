export interface AccountManagementProps {
    page: 'login' | 'signup' | 'profile' | 'forgot-password';
    onSuccess?: () => void;
    className?: string
}