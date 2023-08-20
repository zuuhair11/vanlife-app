import { Link, NavLink } from 'react-router-dom' ;


function Header() {
    return (
        <header>
            <Link className='site-logo' to='/'>#VanLife</Link>
            
            <nav>
                <NavLink 
                    to='/host' 
                    className={ ({ isActive }) => isActive ? 'active-link' : null }
                >
                    Host
                </NavLink>
                <NavLink 
                    to='/about' 
                    className={ ({ isActive }) => isActive ? 'active-link' : null }
                >
                    About
                </NavLink>
                <NavLink 
                    to='/vans' 
                    className={ ({ isActive }) => isActive ? 'active-link' : null }
                >
                    Vans
                </NavLink>
            </nav>
        </header>
    );
}


export default Header ;
