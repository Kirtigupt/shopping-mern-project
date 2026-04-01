import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SkeletonGrid } from '../components/SkeletonCard';
import { ArrowRight, ShoppingCart, Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

const Shop = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const { addToast } = useToast();
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';

    const heroImages = [
        'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1920&q=80',
    ];

    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching products:', err);
                setLoading(false);
            });

        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % heroImages.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    // Filter products when search query changes
    useEffect(() => {
        if (searchQuery) {
            const lower = searchQuery.toLowerCase();
            const filtered = products.filter(p =>
                p.title.toLowerCase().includes(lower) ||
                p.category.toLowerCase().includes(lower) ||
                p.description?.toLowerCase().includes(lower)
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }
    }, [searchQuery, products]);

    // Add badge logic
    const getBadge = (product) => {
        if (product.id <= 5) return { type: 'new', label: 'New' };
        if (product.price > 10000) return { type: 'sale', label: 'Premium' };
        if (product.rating >= 4.8) return { type: 'trending', label: 'Best Seller' };
        return null;
    };

    const handleAddToCart = (product) => {
        addToCart({ ...product, quantity: 1 });
        addToast(`${product.title} added to cart!`, 'success');
    };

    const handleToggleWishlist = (product) => {
        const wasInWishlist = isInWishlist(product.id);
        toggleWishlist(product);
        if (wasInWishlist) {
            addToast(`Removed from wishlist`, 'info');
        } else {
            addToast(`${product.title} added to wishlist!`, 'success');
        }
    };

    const displayProducts = filteredProducts;

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-color)' }}>
            <Navbar />

            {/* Hero Section */}
            <section style={{
                height: '55vh',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                color: 'white',
                padding: '1rem'
            }}>
                <div style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    background: `linear-gradient(135deg, rgba(15,23,42,0.6), rgba(99,102,241,0.3)), url(${heroImages[currentImage]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'opacity 1s ease-in-out',
                    animation: 'zoomIn 20s infinite alternate',
                    zIndex: 0
                }} />

                <div style={{ position: 'relative', zIndex: 1, background: 'rgba(0,0,0,0.2)', padding: '2.5rem', borderRadius: 'var(--radius-2xl)', backdropFilter: 'blur(4px)' }}
                    className="animate-fadeInUp">
                    <h1 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: '900', marginBottom: '1rem', letterSpacing: '-0.03em' }}>
                        Elevate Your Style
                    </h1>
                    <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.9 }}>
                        Discover the latest trends in fashion, accessories, and electronics.
                    </p>
                    <Link to="/collections">
                        <button className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}>
                            Shop Now <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
                        </button>
                    </Link>

                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '2rem' }}>
                        {heroImages.map((_, idx) => (
                            <button
                                key={idx}
                                style={{
                                    width: idx === currentImage ? '2rem' : '0.5rem',
                                    height: '0.5rem',
                                    borderRadius: '999px',
                                    background: idx === currentImage ? 'white' : 'rgba(255,255,255,0.4)',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                                onClick={() => setCurrentImage(idx)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="container" style={{ padding: '4rem 1rem' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '2rem', textAlign: 'center' }}>Shop by Category</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                    {['Men', 'Women', 'Electronics', 'Beauty'].map((cat) => (
                        <Link key={cat} to={`/category/${cat.toLowerCase()}`} style={{ textDecoration: 'none' }}>
                            <div className="card" style={{
                                padding: '2rem', textAlign: 'center', cursor: 'pointer',
                                background: 'var(--surface)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                            }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-main)' }}>{cat}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Search results header */}
            {searchQuery && (
                <div className="container" style={{ padding: '0 1rem' }}>
                    <div style={{
                        background: 'var(--surface)',
                        padding: '1rem 1.5rem',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--border)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1rem'
                    }}>
                        <span>
                            Showing results for: <strong>"{searchQuery}"</strong>
                            <span style={{ color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>
                                ({displayProducts.length} products found)
                            </span>
                        </span>
                        <Link to="/shop" className="btn btn-outline" style={{ padding: '0.375rem 1rem', fontSize: '0.875rem' }}>
                            Clear Search
                        </Link>
                    </div>
                </div>
            )}

            {/* Products Grid */}
            <section className="container" style={{ padding: '2rem 1rem 4rem' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '2rem', textAlign: 'center' }}>
                    {searchQuery ? 'Search Results' : 'Featured Products'}
                </h2>
                {loading ? (
                    <SkeletonGrid count={8} />
                ) : displayProducts.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem' }}>
                        <h3 style={{ color: 'var(--text-secondary)' }}>No products found for "{searchQuery}"</h3>
                        <Link to="/shop" className="btn btn-primary" style={{ marginTop: '1rem' }}>View All Products</Link>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '2rem' }}>
                        {displayProducts.map((product, index) => {
                            const badge = getBadge(product);
                            return (
                                <div key={product.id || product._id} className={`card animate-fadeInUp`}
                                    style={{ padding: '1rem', display: 'flex', flexDirection: 'column', animationDelay: `${(index % 8) * 0.05}s`, opacity: 0 }}>
                                    <Link to={`/product/${product.id || product._id}`} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                                        <div style={{
                                            height: '300px', background: 'var(--bg-color)',
                                            borderRadius: 'var(--radius-md)', marginBottom: '1rem',
                                            overflow: 'hidden', position: 'relative'
                                        }}>
                                            {badge && <span className={`badge badge-${badge.type}`}>{badge.label}</span>}
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
                                            <button
                                                className="btn"
                                                style={{
                                                    padding: '0.5rem',
                                                    border: '1px solid var(--border)',
                                                    borderRadius: 'var(--radius-md)',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    background: 'var(--surface)',
                                                    color: isInWishlist(product.id) ? '#ef4444' : 'var(--text-secondary)',
                                                    transition: 'all 0.2s ease'
                                                }}
                                                onClick={() => handleToggleWishlist(product)}
                                            >
                                                <Heart size={18} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
                                            </button>
                                            <button
                                                className="btn btn-primary"
                                                style={{ padding: '0.5rem' }}
                                                onClick={() => handleAddToCart(product)}
                                            >
                                                <ShoppingCart size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>

            <Footer />
        </div>
    );
};

export default Shop;
