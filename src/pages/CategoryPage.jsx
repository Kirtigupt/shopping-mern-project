import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SkeletonGrid } from '../components/SkeletonCard';
import { ShoppingCart, ArrowLeft, Heart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

const CategoryPage = () => {
    const { category } = useParams();
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const { addToast } = useToast();
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const categoryMap = {
        'men': 'Men',
        'women': 'Women',
        'electronics': 'Electronics',
        'beauty': 'Beauty',
        'jewellery': 'Jewelery',
        'home': 'Home',
        'home-decor': 'Home'
    };

    const targetCategory = categoryMap[category?.toLowerCase()] || category;

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:5000/api/products/category/${targetCategory}`)
            .then(res => res.json())
            .then(data => {
                setFilteredProducts(data || []);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching category products:', err);
                setLoading(false);
            });
    }, [targetCategory]);

    const handleAddToCart = (product) => {
        addToCart({ ...product, quantity: 1 });
        addToast(`${product.title} added to cart!`, 'success');
    };

    const handleToggleWishlist = (product) => {
        const wasIn = isInWishlist(product.id);
        toggleWishlist(product);
        addToast(wasIn ? 'Removed from wishlist' : `${product.title} added to wishlist!`, wasIn ? 'info' : 'success');
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-color)' }}>
            <Navbar />

            <div className="container" style={{ padding: '2rem 1rem' }}>
                <div style={{ marginBottom: '2rem' }} className="animate-fadeInUp">
                    <Link to="/shop" className="btn" style={{ color: 'var(--text-secondary)', paddingLeft: 0, marginBottom: '1rem', display: 'inline-flex' }}>
                        <ArrowLeft size={18} style={{ marginRight: '0.5rem' }} /> Back to Shop
                    </Link>
                    <h1 style={{
                        fontSize: '2.5rem', fontWeight: '800', textTransform: 'capitalize', marginBottom: '0.5rem',
                        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                    }}>
                        {targetCategory} Collection
                    </h1>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        {loading ? 'Loading...' : `${filteredProducts.length} products found`}
                    </p>
                </div>

                {loading ? (
                    <SkeletonGrid count={8} />
                ) : filteredProducts.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem' }} className="animate-fadeIn">
                        <h2>No products found in this category.</h2>
                        <Link to="/shop" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                            <ArrowLeft size={16} style={{ marginRight: '0.5rem' }} /> Back to Shop
                        </Link>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '2rem' }}>
                        {filteredProducts.map((product, i) => (
                            <div key={product.id || product._id} className="card animate-fadeInUp"
                                style={{ padding: '1rem', display: 'flex', flexDirection: 'column', animationDelay: `${i * 0.06}s`, opacity: 0 }}>
                                <Link to={`/product/${product.id || product._id}`} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                                    <div style={{
                                        height: '300px', background: 'var(--bg-color)', borderRadius: 'var(--radius-md)', marginBottom: '1rem', overflow: 'hidden', position: 'relative'
                                    }}>
                                        {product.rating >= 4.8 && <span className="badge badge-trending">Best Seller</span>}
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                                            onMouseOver={(e) => e.target.style.transform = 'scale(1.08)'}
                                            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                                        />
                                    </div>
                                    <h3 style={{ fontWeight: '600', marginBottom: '0.25rem', fontSize: '1rem', height: '2.5rem', overflow: 'hidden' }}>{product.title}</h3>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.5rem', color: '#fbbf24' }}>
                                        <Star size={14} fill="currentColor" />
                                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>{product.rating}</span>
                                    </div>
                                </Link>
                                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <p style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '1.25rem' }}>₹{product.price.toLocaleString()}</p>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button className="btn" style={{
                                            padding: '0.5rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)',
                                            background: 'var(--surface)', color: isInWishlist(product.id) ? '#ef4444' : 'var(--text-secondary)'
                                        }} onClick={() => handleToggleWishlist(product)}>
                                            <Heart size={18} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
                                        </button>
                                        <button className="btn btn-primary" style={{ padding: '0.5rem' }} onClick={() => handleAddToCart(product)}>
                                            <ShoppingCart size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default CategoryPage;
