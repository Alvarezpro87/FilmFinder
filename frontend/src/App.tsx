import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; 
import Footer from './components/Footer'; 
import MovieSearch from './pages/Search';
import Favorite from './pages/Favorite';
import Home from './pages/Home';
import SharedFavorites from './components/SharedFavorites';

const App: React.FC = () => {
    return (
        <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#1e1e1e', color: '#ffffff' }}>
            <Router>
                <Header />
                <div className="flex-grow-1">
                    <Routes>
                        <Route path="/" element={<Home />} />                        
                        <Route path="/search" element={<MovieSearch />} />
                        <Route path="/favorite" element={<Favorite />} />                        
                        <Route path="/favorites/shared/:uuid" element={<SharedFavorites />} />  {/* Corrigi o path aqui */}                 
                    </Routes>
                </div>
                <Footer />
            </Router>
        </div>
    );
};

export default App;
