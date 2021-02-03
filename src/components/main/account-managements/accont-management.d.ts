export interface AccountManagementProps {
    page: 'login' | 'signup' | 'profile';
    onSuccess?: () => void;
    className?: string
}