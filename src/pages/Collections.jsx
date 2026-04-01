import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowRight } from 'lucide-react';

const Collections = () => {
    const navigate = useNavigate();

    const categories = [
        { title: "Men's Fashion", image: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=600&q=80", description: "Timeless styles for the modern man.", path: "men" },
        { title: "Women's Fashion", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80", description: "Elegant pieces for every occasion.", path: "women" },
        { title: "Jewellery", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80", description: "Sparkle with our exclusive collection.", path: "jewellery" },
        { title: "Beauty & Wellness", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80", description: "Glow from within with premium care.", path: "beauty" },
        { title: "Electronics", image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&w=600&q=80", description: "Tech gadgets that simplify life.", path: "electronics" },
        { title: "Home Decor", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80", description: "Transform your space into a sanctuary.", path: "home" }
    ];

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-color)' }}>
            <Navbar />

            <div className="container" style={{ padding: '4rem 1rem' }}>
                <div className="animate-fadeInUp">
                    <h1 style={{
                        fontSize: '3rem', fontWeight: '900', marginBottom: '1rem', textAlign: 'center',
                        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                    }}>
                        Curated Collections
                    </h1>
                    <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '4rem', fontSize: '1.2rem' }}>
                        Explore our diverse range of premium categories designed just for you.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem' }}>
                    {categories.map((cat, idx) => (
                        <div
                            key={idx}
                            className={`card animate-fadeInUp`}
                            style={{
                                padding: '0', overflow: 'hidden', cursor: 'pointer', height: '400px',
                                position: 'relative', animationDelay: `${idx * 0.1}s`, opacity: 0
                            }}
                            onClick={() => navigate(`/category/${cat.path}`)}
                        >
                            <div style={{ height: '100%', width: '100%' }}>
                                <img
                                    src={cat.image} alt={cat.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                                    onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                                />
                            </div>
                            <div style={{
                                position: 'absolute', bottom: 0, left: 0, width: '100%',
                                background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                                padding: '2rem', color: 'white',
                                display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '50%'
                            }}>
                                <h2 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.5rem' }}>{cat.title}</h2>
                                <p style={{ opacity: 0.9, marginBottom: '1rem' }}>{cat.description}</p>
                                <span style={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem', fontWeight: '600' }}>
                                    View Products <ArrowRight size={16} style={{ marginLeft: '0.5rem' }} />
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Collections;
