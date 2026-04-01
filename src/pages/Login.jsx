import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Calendar, User, ArrowRight } from 'lucide-react';

const Login = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const { login, signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!email || !dob || !name) {
            setError('Please fill in all fields');
            return;
        }

        const userData = { email, dob, name: isSignup ? name : 'User' };

        if (isSignup) {
            signup(userData);
        } else {
            login(userData);
        }

        navigate('/shop');
    };

    return (
        <div className="flex-center" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, var(--bg-color) 0%, var(--surface) 50%, var(--bg-color) 100%)' }}>
            <div className="glass" style={{ padding: '3rem', borderRadius: '1.5rem', width: '100%', maxWidth: '400px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', textAlign: 'center', color: '#1e293b' }}>
                    {isSignup ? 'Create Account' : 'Welcome Back'}
                </h2>
                <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#64748b' }}>
                    {isSignup ? 'Sign up to start shopping' : 'Login to access your account'}
                </p>

                {error && (
                    <div style={{ background: '#fee2e2', color: '#ef4444', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem', position: 'relative' }}>
                        <User size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="input-field"
                            style={{ paddingLeft: '3rem' }}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div style={{ marginBottom: '1rem', position: 'relative' }}>
                        <Mail size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                        <input
                            type="text"
                            placeholder="Email or Phone Number"
                            className="input-field"
                            style={{ paddingLeft: '3rem' }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div style={{ marginBottom: '2rem', position: 'relative' }}>
                        <Calendar size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                        <input
                            type="date"
                            className="input-field"
                            style={{ paddingLeft: '3rem' }}
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.875rem', fontSize: '1rem' }}>
                        <span>{isSignup ? 'Sign Up' : 'Login'}</span>
                        <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
                    </button>
                </form>

                <div style={{ marginTop: '2rem', textAlign: 'center', color: '#64748b' }}>
                    {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
                    <button
                        onClick={() => setIsSignup(!isSignup)}
                        style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: '600', textDecoration: 'underline' }}
                    >
                        {isSignup ? 'Login' : 'Sign Up'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
