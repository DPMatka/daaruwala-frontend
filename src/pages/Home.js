import React from 'react';
import ProductList from '../components/ProductList';

const Home = ({ addToCart }) => {
    return (
        <main className="container mx-auto px-4 py-8">
            <section>
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                    Order Alcohol & Snacks 24/7 in Indore
                </h2>
                <ProductList addToCart={addToCart} />
            </section>
        </main>
    );
};

export default Home;