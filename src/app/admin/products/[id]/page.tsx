"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Package, ArrowLeft, Save, Loader2, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminEditProduct() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    weight: '',
    image: '',
    description: '',
    longDescription: '',
    ingredients: '',
    nutritionalInfo: '',
    shelfLife: ''
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/admin/products/${id}`);
        if (res.ok) {
          const data = await res.json();
          setFormData({
            name: data.name || '',
            price: data.price?.toString() || '',
            category: data.category || '',
            weight: data.weight || '',
            image: data.image || '',
            description: data.description || '',
            longDescription: data.longDescription || '',
            ingredients: data.ingredients || '',
            nutritionalInfo: data.nutritionalInfo || '',
            shelfLife: data.shelfLife || ''
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        router.push('/admin/products');
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        router.push('/admin/products');
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <div className="p-20 text-center text-neutral-400 italic">Finding the heritage...</div>;

  const inputClasses = "w-full bg-neutral-50 border border-neutral-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#1a4332]/20 focus:border-[#1a4332] outline-none transition-all font-medium text-neutral-900 placeholder:text-neutral-300";
  const labelClasses = "block text-xs font-bold text-neutral-400 uppercase tracking-[0.2em] mb-3 ml-1";

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
       <div className="flex items-center justify-between mb-8">
          <Link href="/admin/products" className="flex items-center gap-2 text-neutral-400 font-bold text-sm hover:text-[#1a4332] transition-colors group">
             <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
             Back to Inventory
          </Link>
          <button 
            onClick={handleDelete}
            disabled={deleting}
            className="text-red-400 hover:text-red-700 font-bold text-sm flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            {deleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
            Delete Product
          </button>
       </div>

       <div className="mb-12">
            <h1 className="font-serif text-4xl font-bold text-neutral-900 mb-2">Edit Product</h1>
            <p className="text-neutral-500 font-light italic">"{formData.name}" — Refining the excellence.</p>
       </div>

       <form onSubmit={handleSubmit} className="space-y-12 bg-white p-12 rounded-[3.5rem] border border-neutral-100 shadow-sm transition-all hover:shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <label className={labelClasses}>Product Title</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={inputClasses} 
                required 
              />
            </div>
            <div>
                <label className={labelClasses}>Price (₹)</label>
                <input 
                    type="number" 
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className={inputClasses} 
                    required 
                />
            </div>
            <div>
                <label className={labelClasses}>Category</label>
                <input 
                    type="text" 
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={inputClasses} 
                />
            </div>
            <div>
                <label className={labelClasses}>Main Image URL</label>
                <input 
                    type="text" 
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className={inputClasses} 
                    required 
                />
            </div>
          </div>

          <div className="space-y-10 border-t border-neutral-100 pt-10">
            <div>
              <label className={labelClasses}>Brief Description</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className={`${inputClasses} resize-none`} 
                required 
              />
            </div>
            <div>
              <label className={labelClasses}>Full Heritage Story</label>
              <textarea 
                name="longDescription"
                value={formData.longDescription}
                onChange={handleChange}
                rows={6}
                className={`${inputClasses} resize-none`} 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-neutral-100 pt-10">
            <div>
              <label className={labelClasses}>Ingredients</label>
              <input 
                type="text" 
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                className={inputClasses} 
              />
            </div>
            <div>
              <label className={labelClasses}>Shelf Life</label>
              <input 
                type="text" 
                name="shelfLife"
                value={formData.shelfLife}
                onChange={handleChange}
                className={inputClasses} 
              />
            </div>
          </div>

          <div className="pt-6 flex justify-end">
            <button 
              type="submit" 
              disabled={saving}
              className="bg-[#1a4332] text-white font-bold px-12 py-5 rounded-[2rem] shadow-xl shadow-[#1a4332]/20 flex items-center gap-4 hover:scale-[1.02] transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {saving ? <Loader2 size={24} className="animate-spin" /> : <Save size={24} />}
              Save Changes
            </button>
          </div>
       </form>
    </div>
  );
}
