import React from 'react';
import Login from '../Login/Login';
import Slid from './Slid';
import { useLoaderData } from 'react-router';
import PopulerBook from './PopulerBook';
import ReaderStats from './ReaderStats';
import TopReviewer from './TopReviewer';
import SpecialOffer from './SalesOffer/SpecialOffer/SpecialOffer';


const Home = () => {
    const populerBook= useLoaderData()
    return (
        <div>
            <Slid></Slid>
            <PopulerBook populerBook={populerBook}></PopulerBook>
            <SpecialOffer></SpecialOffer>
            <TopReviewer></TopReviewer>
            <ReaderStats></ReaderStats>
        </div>
    );
};

export default Home;