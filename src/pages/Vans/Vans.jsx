import { useState, useEffect } from 'react' ;
import { Link, useSearchParams } from 'react-router-dom' ;


function Vans() {
    const [vans, setVans] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const typeFilter = searchParams.get('type');
    console.log(typeFilter);

    useEffect( () => {
        fetch('/api/vans')
            .then( response => response.json() )
            .then( data => setVans(data.vans) )

    }, []);

    const displayedVans = typeFilter 
        ? vans.filter( van => van.type.toLowerCase() === typeFilter.toLowerCase())
        : vans

    const vanElements = displayedVans.map( van => {
        return (
            <div key={ van.id } className='van-tile'>
                <Link to={`/vans/${van.id}`} >
                    <img src={ van.imageUrl } alt='' />
                    <div className='van-info'>
                        <h3>{ van.name }</h3>
                        <p>${ van.price }<span>/day</span></p>
                    </div>
                    <i className={ `van-type ${ van.type } selected` }>{ van.type }</i>
                </Link>
            </div>
        );
    });


    function handleFilterChange(key, value) {
        // Similar to useState, but this one you can change the value directly
        setSearchParams( prevSearchParams => {
            if(value === null) {
                prevSearchParams.delete(key);

            } else {
                prevSearchParams.set(key, value);
            }

            return prevSearchParams;
        });
    }

    // // In JavaScript
    // function genNewSearchParamString(key, value) {
    //     const sp = new URLSearchParams(searchParams);

    //     if(value === null) {
    //         sp.delete(key);

    //     } else {
    //         sp.set(key, value);
    //     }

    //     return `?${sp.toString()}`;
    // }
    // <Link to={genNewSearchParamString("type", "jedi")}>Jedi</Link>

    return (
        <div className='van-list-container'>
            <h1>Explore our van options</h1>

            <div className='van-list-filter-buttons'>
                <button
                    className={`van-type simple ${typeFilter === 'simple' ? 'selected' : ''}`}
                    onClick={ () => handleFilterChange('type', 'simple') }
                >
                    Simple
                </button>

                <button
                    className={`van-type luxury ${typeFilter === 'luxury' ? 'selected' : ''}`}
                    onClick={ () => handleFilterChange('type', 'luxury') }
                >
                    Luxury
                </button>

                <button
                    className={`van-type rugged ${typeFilter === 'rugged' ? 'selected' : ''}`}
                    onClick={ () => handleFilterChange('type', 'rugged') }
                >
                    Rugged
                </button>

                {
                    typeFilter && (
                        <button
                            className='van-type clear-filters'
                            onClick={ () => handleFilterChange('type', null) }
                        >
                            Clear filter
                        </button>
                    )
                }
            </div>
            
            <div className='van-list'>
                { vanElements }
            </div>
        </div>
    );
}


export default Vans ;
