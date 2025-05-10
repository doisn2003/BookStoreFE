import React from 'react';
import './Home.scss';
import Navbar from '@/components/Navbar/Navbar.tsx';

const Home: React.FC = () => {
    return (
        <div className='home-container'>
            <Navbar />
            <div className="home">
                <h1>Welcome to the Home Page</h1>

            </div>
        </div>
    );
};

export default Home; 