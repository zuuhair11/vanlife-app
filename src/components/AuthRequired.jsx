import { Navigate, Outlet, useLocation } from 'react-router-dom' ;


function AuthRequired() {
    const isLoggedIn = localStorage.getItem('loggedin');
    const location = useLocation();

    if(!isLoggedIn) {
        return (
            <Navigate 
                to='login' 
                state={{
                    message: 'You must log in first',
                    from: location.pathname
                }}

                replace={ true }
            />
        );
    }

    return <Outlet />;
}


export default AuthRequired ;
