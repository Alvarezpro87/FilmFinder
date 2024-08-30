import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; 
import Footer from './components/Footer'; 
import MovieSearch from './pages/MovieSearch';
import FavoriteList from './pages/FavoriteList';
import SharedFavoriteList from './pages/SharedFavoriteList';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';

const App: React.FC = () => {
    return (
        <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#1e1e1e', color: '#ffffff' }}>
            <Router>
                <Header />
                <div className="flex-grow-1">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/search" element={<MovieSearch />} />
                        <Route path="/favorites" element={<FavoriteList />} />
                        <Route path="/share/:token" element={<SharedFavoriteList />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </div>
                <Footer />
            </Router>
        </div>
    );
};

export default App;
