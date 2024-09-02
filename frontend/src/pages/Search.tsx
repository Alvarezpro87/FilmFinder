import React from 'react';

import SearchMovies from '../components/SearchMovie';

const Search: React.FC = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
           
            <main className="flex-fill">
                <div className="container my-5">
                    <SearchMovies />
                </div>
            </main>
            
        </div>
    );
};

export default Search;
