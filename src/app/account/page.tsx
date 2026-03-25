"use client";
import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { useSession, signOut } from 'next-auth/react';
import { Package, User, MapPin, Heart, LogOut, ChevronRight, Loader2, Plus as PlusIcon, X } from 'lucide-react';
import Link from 'next/link';

export default function AccountPage() {
  const { data: session, update } = useSession();
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // Profile State
  const [newName, setNewName] = useState("");
  
  // Address State
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({ street: '', city: '', state: '', zip: '' });

  useEffect(() => {
    if (session?.user?.name && !newName) {
        setNewName(session.user.name);
    }
  }, [session]);

  useEffect(() => {
    if (session?.user) {
      setIsLoading(true);
      const fetchData = async () => {
        try {
          if (activeTab === 'orders') {
            const res = await fetch('/api/orders');
            const data = await res.json();
            if (Array.isArray(data)) setOrders(data);
          } else if (activeTab === 'favorites') {
            const res = await fetch('/api/favorites');
            const data = await res.json();
            if (Array.isArray(data)) setFavorites(data);
          } else if (activeTab === 'addresses') {
            const res = await fetch('/api/addresses');
            const data = await res.json();
            if (Array.isArray(data)) setAddresses(data);
          }
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    } else if (session === null) {
      setIsLoading(false);
    }
  }, [session, activeTab]);

  const handleUpdateProfile = async () => {
    setIsSaving(true);
    try {
        const res = await fetch('/api/user', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newName })
        });
        if (res.ok) {
            await update({ name: newName });
            alert("Profile updated successfully!");
        }
    } catch (err) {
        console.error(err);
    } finally {
        setIsSaving(false);
    }
  };

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
        const res = await fetch('/api/addresses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newAddress)
        });
        if (res.ok) {
            setShowAddressForm(false);
            setNewAddress({ street: '', city: '', state: '', zip: '' });
            // Refresh addresses
            const addrRes = await fetch('/api/addresses');
            const addrData = await addrRes.json();
            if (Array.isArray(addrData)) setAddresses(addrData);
        }
    } catch (err) {
        console.error(err);
    } finally {
        setIsSaving(false);
    }
  };

  const user = { 
    name: session?.user?.name || "Member", 
    email: session?.user?.email || "" 
  };

  const renderTabContent = () => {
    if (isLoading && !showAddressForm) {
      return (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-[#1a4332]" size={32} />
        </div>
      );
    }

    switch (activeTab) {
      case 'orders':
        return (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <EmptyState icon={<Package size={48} />} message="You haven't placed any orders yet." />
            ) : (
              orders.map((order) => (
                <div key={order.id} className="bg-white rounded-3xl p-6 border border-neutral-100 flex flex-wrap items-center justify-between gap-6 hover:shadow-xl transition-all group">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center">
                      <Package className="text-neutral-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral-900">Order #KH-{order.id.toString().padStart(4, '0')}</h4>
                      <p className="text-sm text-neutral-500">
                        Placed on {new Date(order.createdAt).toLocaleDateString()} • {order.orderItems.length} {order.orderItems.length === 1 ? 'Item' : 'Items'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <p className="text-base font-bold text-neutral-900 tracking-tight">₹{order.totalAmount}</p>
                      <span className={`text-[9px] font-bold uppercase px-2 py-1 rounded-full border ${
                        order.status === 'DELIVERED' 
                          ? 'bg-[#1a4332]/10 text-[#1a4332] border-[#1a4332]/20' 
                          : 'bg-orange-50 text-orange-600 border-orange-100'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <ChevronRight className="text-neutral-300 group-hover:text-[#1a4332] transition-colors" />
                  </div>
                </div>
              ))
            )}
          </div>
        );
      case 'favorites':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {favorites.length === 0 ? (
              <div className="md:col-span-2">
                <EmptyState icon={<Heart size={48} />} message="No favorites yet. Save heritage items you love." />
              </div>
            ) : (
              favorites.map((fav) => (
                <Link href={`/shop/${fav.product.id}`} key={fav.id} className="bg-white rounded-3xl p-4 border border-neutral-100 flex items-center gap-4 hover:shadow-lg transition-all">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-neutral-50">
                    <img src={fav.product.image} alt={fav.product.name} className="object-cover w-full h-full text-xs" />
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-900">{fav.product.name}</h4>
                    <p className="text-sm text-[#1a4332] font-bold">₹{fav.product.price}</p>
                  </div>
                </Link>
              ))
            )}
          </div>
        );
      case 'addresses':
        return (
          <div className="space-y-4">
            {showAddressForm ? (
                <div className="bg-white rounded-3xl p-8 border border-[#1a4332]/20 shadow-xl animate-in slide-in-from-top-4 duration-300">
                    <div className="flex justify-between items-center mb-6">
                        <h4 className="font-bold text-xl">Add New Address</h4>
                        <button onClick={() => setShowAddressForm(false)} className="text-neutral-400 hover:text-neutral-600"><X size={20}/></button>
                    </div>
                    <form onSubmit={handleAddAddress} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input 
                                placeholder="Street Address" 
                                required
                                value={newAddress.street}
                                onChange={e => setNewAddress({...newAddress, street: e.target.value})}
                                className="w-full px-5 py-3.5 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:border-[#1a4332]" 
                            />
                            <input 
                                placeholder="City" 
                                required
                                value={newAddress.city}
                                onChange={e => setNewAddress({...newAddress, city: e.target.value})}
                                className="w-full px-5 py-3.5 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:border-[#1a4332]" 
                            />
                            <input 
                                placeholder="State" 
                                required
                                value={newAddress.state}
                                onChange={e => setNewAddress({...newAddress, state: e.target.value})}
                                className="w-full px-5 py-3.5 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:border-[#1a4332]" 
                            />
                            <input 
                                placeholder="Zip Code" 
                                required
                                value={newAddress.zip}
                                onChange={e => setNewAddress({...newAddress, zip: e.target.value})}
                                className="w-full px-5 py-3.5 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:border-[#1a4332]" 
                            />
                        </div>
                        <button 
                            type="submit" 
                            disabled={isSaving}
                            className="bg-[#1a4332] text-white font-bold px-8 py-3.5 rounded-2xl shadow-xl shadow-[#1a4332]/20 w-full md:w-auto disabled:opacity-50"
                        >
                            {isSaving ? <Loader2 className="animate-spin mx-auto" size={20}/> : "Save Address"}
                        </button>
                    </form>
                </div>
            ) : null}

             {addresses.length === 0 && !showAddressForm ? (
              <EmptyState icon={<MapPin size={48} />} message="No addresses saved yet." />
            ) : !showAddressForm ? (
              addresses.map((addr) => (
                <div key={addr.id} className="bg-white rounded-3xl p-6 border border-neutral-100 flex justify-between items-start">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-neutral-50 rounded-xl flex items-center justify-center text-neutral-400">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral-900">{addr.isDefault ? "Default Address" : "Shipping Address"}</h4>
                      <p className="text-sm text-neutral-500 mt-1">{addr.street}, {addr.city}, {addr.state} - {addr.zip}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : null}
            
            {!showAddressForm && (
                <button 
                    onClick={() => setShowAddressForm(true)}
                    className="w-full py-4 border-2 border-dashed border-neutral-200 rounded-3xl text-neutral-400 font-bold hover:border-[#1a4332] hover:text-[#1a4332] transition-all"
                >
                    + Add New Address
                </button>
            )}
          </div>
        );
      case 'profile':
        return (
          <div className="bg-white rounded-3xl p-8 border border-neutral-100 max-w-2xl">
            <h4 className="font-serif text-2xl font-bold mb-8">Personal Information</h4>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest ml-1">Full Name</label>
                    <input 
                        value={newName} 
                        onChange={e => setNewName(e.target.value)}
                        className="w-full px-5 py-3.5 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:border-[#1a4332]" 
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest ml-1">Email Address</label>
                    <input defaultValue={user.email} disabled className="w-full px-5 py-3.5 bg-neutral-50 border border-neutral-100 rounded-2xl opacity-50" />
                 </div>
              </div>
              <button 
                onClick={handleUpdateProfile}
                disabled={isSaving || newName === user.name}
                className="bg-[#1a4332] text-white font-bold px-8 py-3.5 rounded-2xl shadow-xl shadow-[#1a4332]/20 disabled:opacity-50 disabled:shadow-none"
              >
                {isSaving ? <Loader2 className="animate-spin" size={20}/> : "Save Changes"}
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF9F6] pt-32 pb-20">
      <Navbar />
      
      <div className="container mx-auto px-4 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-neutral-900 mb-2">Namaste, {user.name.split(' ')[0]}</h1>
            <p className="text-neutral-500 font-light italic">Welcome to your Malnad kitchen pantry.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1 space-y-2">
              <nav className="bg-white/50 backdrop-blur-md rounded-3xl p-4 border border-white/20 sticky top-32">
                <AccountNavItem icon={<Package size={20}/>} label="Orders" active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} />
                <AccountNavItem icon={<Heart size={20}/>} label="Favorites" active={activeTab === 'favorites'} onClick={() => setActiveTab('favorites')} />
                <AccountNavItem icon={<MapPin size={20}/>} label="Addresses" active={activeTab === 'addresses'} onClick={() => setActiveTab('addresses')} />
                <AccountNavItem icon={<User size={20}/>} label="Profile" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
                <div className="my-4 border-t border-neutral-100"></div>
                <button onClick={() => signOut({ callbackUrl: '/' })} className="w-full flex items-center gap-3 px-4 py-3 text-red-600 font-medium hover:bg-red-50 rounded-xl transition-all"><LogOut size={20} /> Sign Out</button>
              </nav>
            </aside>

            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-8 px-2">
                <h3 className="font-serif text-3xl font-bold text-neutral-900 capitalize">{activeTab}</h3>
              </div>
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function EmptyState({ icon, message }: { icon: any, message: string }) {
  return (
    <div className="bg-white rounded-3xl p-16 border border-neutral-100 text-center animate-in fade-in zoom-in duration-500">
      <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-6 text-neutral-200">
        {icon}
      </div>
      <p className="text-neutral-500 font-light max-w-xs mx-auto mb-8">{message}</p>
      <Link href="/shop" className="px-8 py-3.5 bg-[#1a4332] text-white rounded-2xl font-bold shadow-xl shadow-[#1a4332]/20">Start Exploring</Link>
    </div>
  );
}

function AccountNavItem({ icon, label, active = false, onClick }: { icon: any, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-medium transition-all ${
      active ? 'bg-[#1a4332] text-white shadow-lg shadow-[#1a4332]/20' : 'text-neutral-500 hover:bg-white hover:text-[#1a4332]'
    }`}>
      {icon}
      {label}
    </button>
  );
}