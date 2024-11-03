import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Products = ({ url }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${url}api/products`);
                if (Array.isArray(response.data)) {
                    setProducts(response.data);
                }
            } catch (error) {
                console.error('Error fetching Product:', error?.message);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [url]);

    return (
        <div className='products'>
            <section className='products'>
                <h1 className="heading"><span>Products</span></h1>
                <div className="box-container">
                    {loading ? (
                        <h1 className="heading"><span>Loading...</span></h1>
                    ) : (
                        products.length > 0 ? (
                            products.map((product) => (
                                <div className="box" key={product._id}>
                                    <img src={`${url}uploads/${product.file}`} alt={product.title} />
                                    <h3>{product.title}</h3>
                                    <Link to={'/login'}>Buy now</Link>
                                </div>
                            ))
                        ) : (
                            <h2>No products available.</h2>
                        )
                    )}
                </div>
            </section>
        </div>
    );
};

export default Products;
