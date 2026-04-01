import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Heart, Sun, Moon, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const { count } = useCart();
    const { user, logout } = useAuth();
    const { wishlist } = useWishlist();
    const { theme, toggleTheme } = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="glass" style={{
            position: 'sticky',
            top: 0,
            zIndex: 50,
            padding: '0.875rem 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            animation: 'slideDown 0.5s ease-out'
        }}>
            <div className="flex-center">
                <Link to="/shop" style={{
                    fontSize: '1.5rem',
                    fontWeight: '800',
                    background: 'linear-gradient(to right, var(--primary), var(--secondary))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.02em'
                }}>
                    LuxeShop
                </Link>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} style={{ flex: 1, margin: '0 2rem', maxWidth: '500px', position: 'relative' }}>
                <input
                    type="text"
                    placeholder="Search products..."
                    className="input-field"
                    style={{ paddingRight: '2.5rem' }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                    type="submit"
                    style={{
                        position: 'absolute',
                        right: '0.5rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: '#94a3b8',
                        cursor: 'pointer',
                        padding: '0.25rem',
                        display: 'flex'
                    }}
                >
                    <Search size={18} />
                </button>
            </form>

            <div className="flex-center" style={{ gap: '1rem' }}>
                {/* Dark Mode Toggle */}
                <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                    <div className="theme-toggle-knob">
                        {theme === 'light' ? <Sun size={14} color="#f59e0b" /> : <Moon size={14} color="#6366f1" />}
                    </div>
                </button>

                {/* Wishlist */}
                <Link to="/wishlist" style={{ position: 'relative', color: 'var(--text-main)', display: 'flex' }}>
                    <Heart size={22} />
                    {wishlist.length > 0 && (
                        <span style={{
                            position: 'absolute',
                            top: '-8px',
                            right: '-8px',
                            background: '#ef4444',
                            color: 'white',
                            fontSize: '0.7rem',
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: '700'
                        }}>
                            {wishlist.length}
                        </span>
                    )}
                </Link>

                {/* Cart */}
                <Link to="/cart" style={{ position: 'relative', color: 'var(--text-main)', display: 'flex' }}>
                    <ShoppingCart size={22} />
                    {count > 0 && (
                        <span style={{
                            position: 'absolute',
                            top: '-8px',
                            right: '-8px',
                            background: 'var(--secondary)',
                            color: 'white',
                            fontSize: '0.7rem',
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: '700',
                            animation: count > 0 ? 'bounceIn 0.3s ease' : 'none'
                        }}>
                            {count}
                        </span>
                    )}
                </Link>

                {/* User */}
                {user ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: '700',
                            fontSize: '0.875rem'
                        }}>
                            {user.name?.charAt(0).toUpperCase()}
                        </div>
                        <button
                            onClick={handleLogout}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--text-secondary)',
                                cursor: 'pointer',
                                display: 'flex',
                                padding: '4px'
                            }}
                            title="Logout"
                        >
                            <LogOut size={18} />
                        </button>
                    </div>
                ) : (
                    <Link to="/" style={{ color: 'var(--text-main)', display: 'flex' }}>
                        <User size={22} />
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
