import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Plus, Minus, ArrowLeft, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const { addToast } = useToast();
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5000/api/products/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.message) {
                    setProduct(null);
                } else {
                    setProduct(data);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching product:', err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', background: 'var(--bg-color)' }}>
                <Navbar />
                <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>
                    <div className="skeleton" style={{ width: '200px', height: '2rem', margin: '0 auto 1rem' }}></div>
                    <div className="skeleton" style={{ width: '300px', height: '1rem', margin: '0 auto' }}></div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div style={{ minHeight: '100vh', background: 'var(--bg-color)' }}>
                <Navbar />
                <div className="container flex-center" style={{ flexDirection: 'column', padding: '6rem 2rem', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '1rem' }}>Product not found</h2>
                    <button onClick={() => navigate('/shop')} className="btn btn-primary" style={{ marginTop: '1rem' }}>Back to Shop</button>
                </div>
            </div>
        );
    }

    const productImages = [product.image, product.image, product.image];

    const handleAddToCart = () => {
        addToCart({ ...product, quantity });
        addToast(`${product.title} added to cart!`, 'success');
    };

    const handleToggleWishlist = () => {
        const wasIn = isInWishlist(product.id);
        toggleWishlist(product);
        addToast(wasIn ? 'Removed from wishlist' : `${product.title} added to wishlist!`, wasIn ? 'info' : 'success');
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-color)' }}>
            <Navbar />

            <div className="container" style={{ padding: '2rem 1rem' }}>
                <button onClick={() => navigate(-1)} className="btn" style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)', paddingLeft: 0 }}>
                    <ArrowLeft size={20} style={{ marginRight: '0.5rem' }} /> Back
                </button>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                    {/* Image Section */}
                    <div className="animate-fadeIn">
                        <div style={{
                            borderRadius: 'var(--radius-xl)', overflow: 'hidden',
                            boxShadow: 'var(--shadow-lg)', marginBottom: '1rem',
                            aspectRatio: '1/1', background: 'var(--bg-color)'
                        }}>
                            <img src={productImages[activeImage]} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            {productImages.map((img, idx) => (
                                <div key={idx} onClick={() => setActiveImage(idx)} style={{
                                    cursor: 'pointer', borderRadius: 'var(--radius-md)', overflow: 'hidden',
                                    border: activeImage === idx ? '2px solid var(--primary)' : '2px solid transparent',
                                    width: '80px', height: '80px', background: 'var(--bg-color)',
                                    transition: 'border-color 0.2s ease'
                                }}>
                                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="animate-slideInRight">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                            <div style={{ display: 'flex', color: '#fbbf24' }}>
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={18} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                                ))}
                            </div>
                            <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: '500' }}>
                                {product.rating} ({Math.floor(product.rating * 20 + 35)} reviews)
                            </span>
                        </div>

                        <h1 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '1rem', lineHeight: 1.2 }}>{product.title}</h1>
                        <p style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '1.5rem' }}>₹{product.price.toLocaleString()}</p>

                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem', fontSize: '1rem' }}>{product.description}</p>

                        {/* Actions */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                            <div style={{
                                display: 'flex', alignItems: 'center',
                                border: '1px solid var(--border)', borderRadius: 'var(--radius-md)'
                            }}>
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="btn" style={{ padding: '0.625rem 1rem' }}><Minus size={16} /></button>
                                <span style={{ padding: '0 1rem', fontWeight: '700', fontSize: '1.1rem' }}>{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)} className="btn" style={{ padding: '0.625rem 1rem' }}><Plus size={16} /></button>
                            </div>

                            <button onClick={handleToggleWishlist} className="btn" style={{
                                padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)',
                                background: 'var(--surface)', color: isInWishlist(product.id) ? '#ef4444' : 'var(--text-secondary)',
                                transition: 'all 0.2s ease'
                            }}>
                                <Heart size={24} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                            </button>

                            <button onClick={handleAddToCart} className="btn btn-primary" style={{ flex: 1, padding: '0.875rem', fontSize: '1rem' }}>
                                <ShoppingCart size={20} style={{ marginRight: '0.5rem' }} /> Add to Cart
                            </button>
                        </div>

                        {/* Features */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                            {[
                                { icon: <Truck size={20} />, label: 'Free Shipping' },
                                { icon: <Shield size={20} />, label: 'Warranty' },
                                { icon: <RotateCcw size={20} />, label: '30-Day Return' },
                            ].map((f, i) => (
                                <div key={i} style={{
                                    textAlign: 'center', padding: '1rem',
                                    background: 'var(--bg-color)', borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--border)'
                                }}>
                                    <div style={{ color: 'var(--primary)', marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}>{f.icon}</div>
                                    <span style={{ fontSize: '0.8125rem', fontWeight: '600' }}>{f.label}</span>
                                </div>
                            ))}
                        </div>

                        {/* Product Info */}
                        <div style={{ background: 'var(--surface)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                            <h3 style={{ fontWeight: '700', marginBottom: '1rem' }}>Product Details</h3>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {[`Category: ${product.category}`, 'Premium Quality Material', 'Free Shipping Available', 'Authentic & Original'].map((item, i) => (
                                    <li key={i} style={{ padding: '0.5rem 0', borderBottom: i < 3 ? '1px solid var(--border)' : 'none', display: 'flex', alignItems: 'center' }}>
                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)', marginRight: '0.75rem' }} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div style={{ marginTop: '4rem' }} className="animate-fadeInUp">
                    <h2 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '2rem' }}>Customer Reviews</h2>
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        {[
                            { name: 'Amit S.', text: 'Excellent product! Exactly as described and the delivery was super fast. Highly recommended.' },
                            { name: 'Neha K.', text: 'Great quality and value for money. The packaging was beautiful too. Love it!' }
                        ].map((review, i) => (
                            <div key={i} className="card" style={{ padding: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div style={{
                                            width: '36px', height: '36px', borderRadius: '50%',
                                            background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: 'white', fontWeight: '700', fontSize: '0.875rem'
                                        }}>
                                            {review.name.charAt(0)}
                                        </div>
                                        <div>
                                            <span style={{ fontWeight: '600' }}>{review.name}</span>
                                            <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Verified Buyer</span>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', color: '#fbbf24' }}>
                                        {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
                                    </div>
                                </div>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>"{review.text}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ProductDetails;
