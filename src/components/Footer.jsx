import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Youtube, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    {/* Brand */}
                    <div>
                        <div className="footer-brand">LuxeShop</div>
                        <p className="footer-desc">
                            Your premium destination for fashion, electronics, beauty, and more.
                            Discover curated collections that elevate your lifestyle.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <MapPin size={14} /> New Delhi, India
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Phone size={14} /> +91 98765 43210
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Mail size={14} /> support@luxeshop.com
                            </span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="footer-title">Quick Links</h4>
                        <ul className="footer-links">
                            <li><Link to="/shop">Shop</Link></li>
                            <li><Link to="/collections">Collections</Link></li>
                            <li><Link to="/category/men">Men's Fashion</Link></li>
                            <li><Link to="/category/women">Women's Fashion</Link></li>
                            <li><Link to="/category/electronics">Electronics</Link></li>
                        </ul>
                    </div>

                    {/* Customer Care */}
                    <div>
                        <h4 className="footer-title">Customer Care</h4>
                        <ul className="footer-links">
                            <li><a href="#">Track Order</a></li>
                            <li><a href="#">Returns & Exchange</a></li>
                            <li><a href="#">Shipping Info</a></li>
                            <li><a href="#">FAQs</a></li>
                            <li><a href="#">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="footer-title">Company</h4>
                        <ul className="footer-links">
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms of Service</a></li>
                            <li><a href="#">Blog</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="footer-bottom">
                    <p>© 2026 LuxeShop. All rights reserved.</p>
                    <div className="footer-socials">
                        <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
                        <a href="#" aria-label="Twitter"><Twitter size={18} /></a>
                        <a href="#" aria-label="Facebook"><Facebook size={18} /></a>
                        <a href="#" aria-label="YouTube"><Youtube size={18} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
