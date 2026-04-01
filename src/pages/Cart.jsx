import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShoppingBag } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, total } = useCart();
    const navigate = useNavigate();
    const { addToast } = useToast();

    const handleRemove = (item) => {
        removeFromCart(item.id);
        addToast(`${item.title} removed from cart`, 'info');
    };

    if (cart.length === 0) {
        return (
            <div style={{ minHeight: '100vh', background: 'var(--bg-color)' }}>
                <Navbar />
                <div className="container flex-center" style={{ flexDirection: 'column', height: '70vh' }}>
                    <div className="animate-bounceIn" style={{
                        width: '100px', height: '100px', borderRadius: '50%',
                        background: 'var(--surface)', border: '2px solid var(--border)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        marginBottom: '1.5rem'
                    }}>
                        <ShoppingBag size={48} color="var(--text-secondary)" />
                    </div>
                    <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.75rem' }}>Your Cart is Empty</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Looks like you haven't added anything yet.</p>
                    <button onClick={() => navigate('/shop')} className="btn btn-primary" style={{ padding: '0.875rem 2rem' }}>
                        Start Shopping <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                    </button>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-color)' }}>
            <Navbar />

            <div className="container" style={{ padding: '2rem 1rem' }}>
                <button onClick={() => navigate('/shop')} className="btn" style={{ marginBottom: '1rem', color: 'var(--text-secondary)', paddingLeft: 0 }}>
                    <ArrowLeft size={20} style={{ marginRight: '0.5rem' }} /> Continue Shopping
                </button>

                <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '2rem' }}>Shopping Cart</h1>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2rem', alignItems: 'start' }}>

                    {/* Cart Items */}
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {cart.map((item, i) => (
                            <div key={item.id} className="card animate-fadeInUp"
                                style={{ padding: '1.25rem', display: 'flex', gap: '1.25rem', alignItems: 'center', animationDelay: `${i * 0.08}s`, opacity: 0 }}>
                                <div style={{
                                    width: '90px', height: '90px', borderRadius: 'var(--radius-md)',
                                    overflow: 'hidden', background: 'var(--bg-color)', flexShrink: 0
                                }}>
                                    <img src={item.image} alt={item.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>

                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontWeight: '600', marginBottom: '0.25rem', fontSize: '1rem' }}>{item.title}</h3>
                                    <p style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '1.1rem' }}>₹{item.price.toLocaleString()}</p>
                                </div>

                                <div style={{
                                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                                    border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '0.25rem'
                                }}>
                                    <button onClick={() => updateQuantity(item.id, -1)} className="btn" style={{ padding: '0.25rem 0.5rem' }}><Minus size={16} /></button>
                                    <span style={{ width: '24px', textAlign: 'center', fontWeight: '700' }}>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, 1)} className="btn" style={{ padding: '0.25rem 0.5rem' }}><Plus size={16} /></button>
                                </div>

                                <span style={{ fontWeight: '700', minWidth: '80px', textAlign: 'right' }}>
                                    ₹{(item.price * item.quantity).toLocaleString()}
                                </span>

                                <button onClick={() => handleRemove(item)} className="btn" style={{ color: '#ef4444', padding: '0.5rem' }}>
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="card animate-slideInRight" style={{ padding: '2rem', position: 'sticky', top: '100px' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem' }}>Order Summary</h2>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Subtotal ({cart.length} items)</span>
                            <span style={{ fontWeight: '600' }}>₹{total.toLocaleString()}</span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Shipping</span>
                            <span style={{ color: 'var(--success)', fontWeight: '600' }}>Free</span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Tax (GST 18%)</span>
                            <span style={{ fontWeight: '600' }}>₹{Math.round(total * 0.18).toLocaleString()}</span>
                        </div>

                        <div style={{ height: '1px', background: 'var(--border)', margin: '1.25rem 0' }} />

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '1.25rem' }}>
                            <span style={{ fontWeight: '800' }}>Total</span>
                            <span style={{ fontWeight: '800', color: 'var(--primary)' }}>₹{Math.round(total * 1.18).toLocaleString()}</span>
                        </div>

                        <button onClick={() => navigate('/checkout')} className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1rem' }}>
                            Proceed to Checkout <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Cart;
