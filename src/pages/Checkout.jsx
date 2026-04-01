import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, ShoppingBag, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const Checkout = () => {
    const { cart, total, clearCart } = useCart();
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [step, setStep] = useState('address'); // address, payment, success
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState('');

    const [address, setAddress] = useState({
        name: '',
        street: '',
        city: '',
        zip: '',
        country: ''
    });

    const handleAddressSubmit = (e) => {
        e.preventDefault();
        setStep('payment');
    };

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate payment processing
        setTimeout(() => {
            setLoading(false);
            setOrderId(Math.random().toString(36).substr(2, 9).toUpperCase());
            clearCart();
            setStep('success');
            addToast('Order placed successfully!', 'success');
        }, 2000);
    };

    if (cart.length === 0 && step !== 'success') {
        return (
            <div style={{ minHeight: '100vh', background: 'var(--bg-color)' }}>
                <Navbar />
                <div className="container flex-center" style={{ flexDirection: 'column', height: '80vh' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Cart is empty</h2>
                    <button onClick={() => navigate('/shop')} className="btn btn-primary">
                        Start Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-color)' }}>
            <Navbar />

            <div className="container" style={{ padding: '2rem 1rem', maxWidth: '800px' }}>
                {step !== 'success' && (
                    <button onClick={() => step === 'payment' ? setStep('address') : navigate('/cart')} className="btn" style={{ marginBottom: '1rem', color: 'var(--text-secondary)', paddingLeft: 0 }}>
                        <ArrowLeft size={20} style={{ marginRight: '0.5rem' }} /> Back
                    </button>
                )}

                {step === 'address' && (
                    <div className="card" style={{ padding: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>Shipping Address</h2>
                        <form onSubmit={handleAddressSubmit} style={{ display: 'grid', gap: '1rem' }}>
                            <input
                                required
                                type="text"
                                placeholder="Full Name"
                                className="input-field"
                                value={address.name}
                                onChange={e => setAddress({ ...address, name: e.target.value })}
                            />
                            <input
                                required
                                type="text"
                                placeholder="Street Address"
                                className="input-field"
                                value={address.street}
                                onChange={e => setAddress({ ...address, street: e.target.value })}
                            />
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <input
                                    required
                                    type="text"
                                    placeholder="City"
                                    className="input-field"
                                    value={address.city}
                                    onChange={e => setAddress({ ...address, city: e.target.value })}
                                />
                                <input
                                    required
                                    type="text"
                                    placeholder="ZIP Code"
                                    className="input-field"
                                    value={address.zip}
                                    onChange={e => setAddress({ ...address, zip: e.target.value })}
                                />
                            </div>
                            <input
                                required
                                type="text"
                                placeholder="Country"
                                className="input-field"
                                value={address.country}
                                onChange={e => setAddress({ ...address, country: e.target.value })}
                            />
                            <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', padding: '1rem' }}>
                                Continue to Payment
                            </button>
                        </form>
                    </div>
                )}

                {step === 'payment' && (
                    <div className="card" style={{ padding: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>Payment Method</h2>

                        <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem', border: '1px solid var(--border)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Total Amount</span>
                                <span style={{ fontWeight: 'bold', fontSize: '1.25rem', color: 'var(--primary)' }}>₹{total.toFixed(2)}</span>
                            </div>
                        </div>

                        <form onSubmit={handlePaymentSubmit} style={{ display: 'grid', gap: '1rem' }}>
                            <div className="input-field" style={{ display: 'flex', alignItems: 'center', gap: '1rem', border: '2px solid var(--primary)', background: '#eff6ff' }}>
                                <CreditCard size={24} color="var(--primary)" />
                                <span style={{ fontWeight: '500' }}>Credit / Debit Card</span>
                            </div>

                            <input
                                required
                                type="text"
                                placeholder="Card Number"
                                className="input-field"
                                maxLength="19"
                            />
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <input
                                    required
                                    type="text"
                                    placeholder="MM / YY"
                                    className="input-field"
                                    maxLength="5"
                                />
                                <input
                                    required
                                    type="text"
                                    placeholder="CVC"
                                    className="input-field"
                                    maxLength="3"
                                />
                            </div>
                            <input
                                required
                                type="text"
                                placeholder="Cardholder Name"
                                className="input-field"
                            />

                            <button type="submit" disabled={loading} className="btn btn-primary" style={{ marginTop: '1rem', padding: '1rem' }}>
                                {loading ? 'Processing...' : `Pay ₹${total.toFixed(2)}`}
                            </button>
                        </form>
                    </div>
                )}

                {step === 'success' && (
                    <div className="card flex-center" style={{ padding: '4rem 2rem', flexDirection: 'column', textAlign: 'center' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                            <CheckCircle size={48} />
                        </div>
                        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Order Placed Successfully!</h1>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                            Thank you for your purchase. Your order ID is <span style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>#{orderId}</span>.
                        </p>
                        <button onClick={() => navigate('/shop')} className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>
                            <ShoppingBag size={20} style={{ marginRight: '0.5rem' }} /> Continue Shopping
                        </button>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Checkout;
