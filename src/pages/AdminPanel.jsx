import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Save, Package, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useToast } from '../context/ToastContext';

const API = 'http://localhost:5000/api';

const AdminPanel = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const { addToast } = useToast();

    const emptyForm = { title: '', category: 'Men', price: '', rating: '4.5', image: '', description: '' };
    const [form, setForm] = useState(emptyForm);

    const categories = ['Men', 'Women', 'Electronics', 'Beauty', 'Jewelery', 'Home'];

    const fetchProducts = () => {
        setLoading(true);
        fetch(`${API}/products`)
            .then(res => res.json())
            .then(data => { setProducts(data); setLoading(false); })
            .catch(() => setLoading(false));
    };

    useEffect(() => { fetchProducts(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingProduct) {
                // Update
                const res = await fetch(`${API}/admin/products/${editingProduct.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(form)
                });
                if (res.ok) {
                    addToast('Product updated successfully!', 'success');
                } else {
                    addToast('Failed to update product', 'error');
                }
            } else {
                // Create
                const res = await fetch(`${API}/admin/products`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(form)
                });
                if (res.ok) {
                    addToast('Product added successfully!', 'success');
                } else {
                    addToast('Failed to add product', 'error');
                }
            }
            setShowForm(false);
            setEditingProduct(null);
            setForm(emptyForm);
            fetchProducts();
        } catch (err) {
            addToast('Something went wrong', 'error');
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setForm({
            title: product.title,
            category: product.category,
            price: product.price,
            rating: product.rating,
            image: product.image,
            description: product.description
        });
        setShowForm(true);
    };

    const handleDelete = async (product) => {
        if (!window.confirm(`Delete "${product.title}"?`)) return;
        try {
            const res = await fetch(`${API}/admin/products/${product.id}`, { method: 'DELETE' });
            if (res.ok) {
                addToast('Product deleted', 'info');
                fetchProducts();
            } else {
                addToast('Failed to delete', 'error');
            }
        } catch (err) {
            addToast('Something went wrong', 'error');
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingProduct(null);
        setForm(emptyForm);
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-color)' }}>
            <Navbar />

            <div className="container" style={{ padding: '2rem 1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <Link to="/shop" className="btn" style={{ color: 'var(--text-secondary)', paddingLeft: 0, marginBottom: '0.5rem', display: 'inline-flex' }}>
                            <ArrowLeft size={18} style={{ marginRight: '0.5rem' }} /> Back to Shop
                        </Link>
                        <h1 style={{ fontSize: '2rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Package size={28} /> Admin Panel
                        </h1>
                        <p style={{ color: 'var(--text-secondary)' }}>{products.length} products in database</p>
                    </div>
                    <button onClick={() => { setShowForm(true); setEditingProduct(null); setForm(emptyForm); }}
                        className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
                        <Plus size={20} style={{ marginRight: '0.5rem' }} /> Add Product
                    </button>
                </div>

                {/* Add/Edit Form Modal */}
                {showForm && (
                    <div style={{
                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                        background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        zIndex: 100, padding: '1rem'
                    }} onClick={handleCancel}>
                        <div className="card animate-scaleIn" style={{
                            padding: '2rem', maxWidth: '550px', width: '100%', maxHeight: '90vh', overflowY: 'auto'
                        }} onClick={e => e.stopPropagation()}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <h2 style={{ fontWeight: '700', fontSize: '1.25rem' }}>
                                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                                </h2>
                                <button onClick={handleCancel} className="btn" style={{ padding: '0.25rem', color: 'var(--text-secondary)' }}>
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
                                <div>
                                    <label style={{ fontWeight: '600', fontSize: '0.875rem', display: 'block', marginBottom: '0.375rem' }}>Product Title</label>
                                    <input required className="input-field" placeholder="e.g. Classic Denim Jacket"
                                        value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label style={{ fontWeight: '600', fontSize: '0.875rem', display: 'block', marginBottom: '0.375rem' }}>Category</label>
                                        <select className="input-field" value={form.category}
                                            onChange={e => setForm({ ...form, category: e.target.value })}>
                                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ fontWeight: '600', fontSize: '0.875rem', display: 'block', marginBottom: '0.375rem' }}>Price (₹)</label>
                                        <input required type="number" className="input-field" placeholder="2999"
                                            value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
                                    </div>
                                </div>

                                <div>
                                    <label style={{ fontWeight: '600', fontSize: '0.875rem', display: 'block', marginBottom: '0.375rem' }}>Rating</label>
                                    <input type="number" step="0.1" min="0" max="5" className="input-field" placeholder="4.5"
                                        value={form.rating} onChange={e => setForm({ ...form, rating: e.target.value })} />
                                </div>

                                <div>
                                    <label style={{ fontWeight: '600', fontSize: '0.875rem', display: 'block', marginBottom: '0.375rem' }}>Image URL</label>
                                    <input required className="input-field" placeholder="https://images.unsplash.com/..."
                                        value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
                                    {form.image && (
                                        <div style={{ marginTop: '0.5rem', width: '80px', height: '80px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border)' }}>
                                            <img src={form.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label style={{ fontWeight: '600', fontSize: '0.875rem', display: 'block', marginBottom: '0.375rem' }}>Description</label>
                                    <textarea required className="input-field" rows="3" placeholder="Product description..."
                                        style={{ resize: 'vertical' }}
                                        value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                                </div>

                                <button type="submit" className="btn btn-primary" style={{ padding: '0.875rem', fontSize: '1rem' }}>
                                    <Save size={18} style={{ marginRight: '0.5rem' }} />
                                    {editingProduct ? 'Update Product' : 'Add Product'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Products Table */}
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '3rem' }}>
                        <div className="skeleton" style={{ width: '200px', height: '2rem', margin: '0 auto' }}></div>
                    </div>
                ) : (
                    <div className="card" style={{ overflow: 'hidden' }}>
                        <div style={{ overflowX: 'auto' }}>
                            <table className="admin-table">
                                <thead>
                                    <tr style={{ background: 'var(--bg-color)' }}>
                                        <th>Image</th>
                                        <th>Title</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Rating</th>
                                        <th style={{ textAlign: 'right' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product, i) => (
                                        <tr key={product.id || product._id} className="animate-fadeIn"
                                            style={{ animationDelay: `${i * 0.02}s`, opacity: 0 }}>
                                            <td>
                                                <img src={product.image} alt={product.title} />
                                            </td>
                                            <td style={{ fontWeight: '500', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                {product.title}
                                            </td>
                                            <td>
                                                <span style={{
                                                    background: 'var(--bg-color)', padding: '0.25rem 0.75rem',
                                                    borderRadius: '999px', fontSize: '0.8125rem', fontWeight: '500'
                                                }}>
                                                    {product.category}
                                                </span>
                                            </td>
                                            <td style={{ fontWeight: '600', color: 'var(--primary)' }}>₹{product.price.toLocaleString()}</td>
                                            <td>⭐ {product.rating}</td>
                                            <td style={{ textAlign: 'right' }}>
                                                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                                    <button onClick={() => handleEdit(product)} className="btn"
                                                        style={{ padding: '0.375rem', color: 'var(--primary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
                                                        <Pencil size={16} />
                                                    </button>
                                                    <button onClick={() => handleDelete(product)} className="btn"
                                                        style={{ padding: '0.375rem', color: '#ef4444', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPanel;
