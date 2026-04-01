import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Shield, RotateCcw, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [trendingProducts, setTrendingProducts] = useState([]);

    const heroSlides = [
        {
            image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1920&q=80',
            title: 'Spring Collection 2026',
            subtitle: 'Discover the latest trends that define your style',
            cta: 'Shop Now',
            link: '/collections'
        },
        {
            image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1920&q=80',
            title: 'Premium Electronics',
            subtitle: 'Tech gadgets that simplify your life',
            cta: 'Explore',
            link: '/category/electronics'
        },
        {
            image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1920&q=80',
            title: 'Luxury Fashion',
            subtitle: 'Curated pieces for the modern individual',
            cta: 'View Collection',
            link: '/category/women'
        }
    ];

    const categories = [
        { name: "Men's", path: 'men', image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=600&q=80', color: '#6366f1' },
        { name: "Women's", path: 'women', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80', color: '#ec4899' },
        { name: 'Electronics', path: 'electronics', image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&w=600&q=80', color: '#8b5cf6' },
        { name: 'Beauty', path: 'beauty', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80', color: '#f59e0b' },
        { name: 'Jewellery', path: 'jewellery', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80', color: '#10b981' },
        { name: 'Home', path: 'home', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80', color: '#ef4444' }
    ];

    const testimonials = [
        { name: 'Priya S.', text: 'Absolutely love the quality! Fast delivery and gorgeous packaging. Will definitely shop again.', rating: 5 },
        { name: 'Rahul M.', text: 'The electronics section has amazing deals. Got my headphones at unbeatable prices!', rating: 5 },
        { name: 'Anjali K.', text: 'The clothing fits perfectly. LuxeShop is now my go-to for online fashion shopping.', rating: 4 },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then(res => res.json())
            .then(data => {
                // Pick 4 top-rated products as "trending"
                const sorted = [...data].sort((a, b) => b.rating - a.rating).slice(0, 4);
                setTrendingProducts(sorted);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-color)' }}>
            <Navbar />

            {/* Hero Section */}
            <section style={{
                height: '80vh',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                color: 'white'
            }}>
                {heroSlides.map((slide, idx) => (
                    <div key={idx} style={{
                        position: 'absolute',
                        top: 0, left: 0, width: '100%', height: '100%',
                        background: `linear-gradient(135deg, rgba(15,23,42,0.7), rgba(99,102,241,0.3)), url(${slide.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: idx === currentSlide ? 1 : 0,
                        transition: 'opacity 1s ease-in-out',
                        transform: idx === currentSlide ? 'scale(1.05)' : 'scale(1)',
                    }} />
                ))}

                <div style={{
                    position: 'relative', zIndex: 1, maxWidth: '700px', padding: '2rem'
                }} className="animate-fadeInUp">
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: 'rgba(255,255,255,0.15)',
                        backdropFilter: 'blur(10px)',
                        padding: '0.5rem 1.25rem',
                        borderRadius: '999px',
                        marginBottom: '1.5rem',
                        fontSize: '0.875rem',
                        fontWeight: '500'
                    }}>
                        <Sparkles size={16} /> New Arrivals
                    </div>
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                        fontWeight: '900',
                        marginBottom: '1.25rem',
                        lineHeight: 1.1,
                        letterSpacing: '-0.03em',
                        textShadow: '0 4px 20px rgba(0,0,0,0.3)'
                    }}>
                        {heroSlides[currentSlide].title}
                    </h1>
                    <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', opacity: 0.9, fontWeight: '300' }}>
                        {heroSlides[currentSlide].subtitle}
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to={heroSlides[currentSlide].link}>
                            <button className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}>
                                {heroSlides[currentSlide].cta} <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
                            </button>
                        </Link>
                        <Link to="/collections">
                            <button className="btn btn-outline" style={{
                                fontSize: '1.1rem', padding: '1rem 2.5rem',
                                borderColor: 'white', color: 'white'
                            }}>
                                View Collections
                            </button>
                        </Link>
                    </div>

                    {/* Slide indicators */}
                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '3rem' }}>
                        {heroSlides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentSlide(idx)}
                                style={{
                                    width: idx === currentSlide ? '2rem' : '0.5rem',
                                    height: '0.5rem',
                                    borderRadius: '999px',
                                    background: idx === currentSlide ? 'white' : 'rgba(255,255,255,0.4)',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Strip */}
            <section style={{
                background: 'var(--surface)',
                borderBottom: '1px solid var(--border)',
                padding: '2rem 0'
            }}>
                <div className="container" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '2rem',
                    textAlign: 'center'
                }}>
                    {[
                        { icon: <Truck size={28} />, title: 'Free Shipping', desc: 'On orders above ₹999' },
                        { icon: <Shield size={28} />, title: 'Secure Payment', desc: '100% protected checkout' },
                        { icon: <RotateCcw size={28} />, title: 'Easy Returns', desc: '30-day return policy' },
                        { icon: <Star size={28} />, title: 'Premium Quality', desc: 'Handpicked products' },
                    ].map((f, i) => (
                        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ color: 'var(--primary)' }}>{f.icon}</div>
                            <h4 style={{ fontWeight: '700', fontSize: '0.9375rem' }}>{f.title}</h4>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Shop by Category */}
            <section className="container" style={{ padding: '5rem 1rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 style={{
                        fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.75rem',
                        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                    }}>Shop by Category</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Find exactly what you're looking for</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '1.5rem' }}>
                    {categories.map((cat, i) => (
                        <Link key={cat.name} to={`/category/${cat.path}`} className={`animate-fadeInUp delay-${i + 1}`} style={{ textDecoration: 'none' }}>
                            <div style={{
                                position: 'relative',
                                borderRadius: 'var(--radius-xl)',
                                overflow: 'hidden',
                                height: '220px',
                                cursor: 'pointer',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            }}
                                onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = 'var(--shadow-xl)'; }}
                                onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                            >
                                <img src={cat.image} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{
                                    position: 'absolute', bottom: 0, left: 0, right: 0,
                                    background: `linear-gradient(to top, ${cat.color}dd, transparent)`,
                                    padding: '1.5rem 1rem 1rem',
                                    color: 'white'
                                }}>
                                    <h3 style={{ fontWeight: '700', fontSize: '1.1rem' }}>{cat.name}</h3>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Trending Products */}
            {trendingProducts.length > 0 && (
                <section style={{ background: 'var(--surface)', padding: '5rem 0' }}>
                    <div className="container">
                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.75rem' }}>Trending Now 🔥</h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Our most popular picks right now</p>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '2rem' }}>
                            {trendingProducts.map((product, i) => (
                                <Link key={product.id || product._id} to={`/product/${product.id || product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}
                                    className={`animate-fadeInUp delay-${i + 1}`}>
                                    <div className="card" style={{ padding: '1rem', overflow: 'hidden' }}>
                                        <div style={{ position: 'relative', height: '280px', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '1rem' }}>
                                            <span className="badge badge-trending">Trending</span>
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                                                onMouseOver={e => e.target.style.transform = 'scale(1.08)'}
                                                onMouseOut={e => e.target.style.transform = 'scale(1)'}
                                            />
                                        </div>
                                        <h3 style={{ fontWeight: '600', fontSize: '1rem', marginBottom: '0.5rem', height: '2.5rem', overflow: 'hidden' }}>{product.title}</h3>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '1.25rem' }}>₹{product.price.toLocaleString()}</span>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#fbbf24' }}>
                                                <Star size={14} fill="currentColor" />
                                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{product.rating}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                            <Link to="/shop">
                                <button className="btn btn-primary" style={{ padding: '0.875rem 2.5rem', fontSize: '1rem' }}>
                                    View All Products <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Testimonials */}
            <section className="container" style={{ padding: '5rem 1rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.75rem' }}>What Our Customers Say</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Real reviews from real shoppers</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {testimonials.map((t, i) => (
                        <div key={i} className={`card animate-fadeInUp delay-${i + 1}`} style={{ padding: '2rem' }}>
                            <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem', color: '#fbbf24' }}>
                                {[...Array(5)].map((_, j) => (
                                    <Star key={j} size={16} fill={j < t.rating ? 'currentColor' : 'none'} />
                                ))}
                            </div>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem', fontStyle: 'italic' }}>"{t.text}"</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{
                                    width: '40px', height: '40px', borderRadius: '50%',
                                    background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: 'white', fontWeight: '700'
                                }}>
                                    {t.name.charAt(0)}
                                </div>
                                <span style={{ fontWeight: '600' }}>{t.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Newsletter CTA */}
            <section style={{
                background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                padding: '5rem 1rem',
                textAlign: 'center',
                color: 'white'
            }}>
                <div className="container" style={{ maxWidth: '600px' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>Stay in the Loop</h2>
                    <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '2rem' }}>
                        Subscribe to get special offers, free giveaways, and exclusive deals.
                    </p>
                    <div style={{ display: 'flex', gap: '0.75rem', maxWidth: '450px', margin: '0 auto' }}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="input-field"
                            style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', flex: 1 }}
                        />
                        <button className="btn" style={{
                            background: 'white', color: 'var(--primary)', fontWeight: '700', padding: '0.75rem 1.5rem',
                            whiteSpace: 'nowrap'
                        }}>
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Home;
