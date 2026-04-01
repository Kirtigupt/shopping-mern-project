import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, Heart } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const Wishlist = () => {
    const { wishlist, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();
    const { addToast } = useToast();
    const navigate = useNavigate();

    const handleMoveToCart = (product) => {
        addToCart({ ...product, quantity: 1 });
        removeFromWishlist(product.id);
        addToast(`${product.title} moved to cart!`, 'success');
    };

    const handleRemove = (product) => {
        removeFromWishlist(product.id);
        addToast(`Removed from wishlist`, 'info');
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-color)' }}>
            <Navbar />
            <div className="container" style={{ padding: '2rem 1rem' }}>
                <h1 style={{
                    fontSize: '2rem', fontWeight: '800', marginBottom: '2rem', textAlign: 'center',
                    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                }}>My Wishlist</h1>

                {wishlist.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem 0' }} className="animate-fadeIn">
                        <div className="animate-bounceIn" style={{
                            width: '80px', height: '80px', borderRadius: '50%',
                            background: 'var(--surface)', border: '2px solid var(--border)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            margin: '0 auto 1.5rem'
                        }}>
                            <Heart size={40} color="var(--text-secondary)" />
                        </div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', marginBottom: '1.5rem' }}>Your wishlist is empty.</p>
                        <button onClick={() => navigate('/shop')} className="btn btn-primary" style={{ padding: '0.875rem 2rem' }}>
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '2rem' }}>
                        {wishlist.map((product, i) => (
                            <div key={product.id} className="card animate-fadeInUp"
                                style={{ padding: '1rem', display: 'flex', flexDirection: 'column', animationDelay: `${i * 0.08}s`, opacity: 0 }}>
                                <div style={{
                                    height: '250px', background: 'var(--bg-color)', borderRadius: 'var(--radius-md)',
                                    marginBottom: '1rem', overflow: 'hidden', position: 'relative'
                                }}>
                                    <img src={product.image} alt={product.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                                        onMouseOver={e => e.target.style.transform = 'scale(1.08)'}
                                        onMouseOut={e => e.target.style.transform = 'scale(1)'}
                                    />
                                    <button onClick={() => handleRemove(product)} style={{
                                        position: 'absolute', top: '0.5rem', right: '0.5rem',
                                        background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%',
                                        padding: '0.5rem', cursor: 'pointer', color: '#ef4444',
                                        display: 'flex', transition: 'transform 0.2s ease'
                                    }}
                                        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
                                        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                                <h3 style={{ fontWeight: '600', marginBottom: '0.5rem', fontSize: '1rem', height: '2.5rem', overflow: 'hidden' }}>{product.title}</h3>
                                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <p style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '1.25rem' }}>₹{product.price.toLocaleString()}</p>
                                    <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                                        onClick={() => handleMoveToCart(product)}>
                                        <ShoppingCart size={16} style={{ marginRight: '0.375rem' }} /> Move to Cart
                                    </button>
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

export default Wishlist;
