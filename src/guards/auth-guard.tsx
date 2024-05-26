import type { FC, ReactNode } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

interface AuthGuardProps {
    children: ReactNode;
}

export const AuthGuard: FC<AuthGuardProps> = (props) => {
    const { children } = props;
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [checked, setChecked] = useState(false);

    const check = useCallback(() => {
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            setChecked(true);
        }
    }, [isAuthenticated]);

    // Only check on mount, this allows us to redirect the user manually when auth state changes
    useEffect(() => {
        check();
    }, []);

    if (!checked) {
        return null;
    }

    // If got here, it means that the redirect did not occur, and that tells us that the user is
    // authenticated / authorized.

    return <>{children}</>;
};
