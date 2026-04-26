'use client';

import React, { useState, useEffect } from 'react';
import LabelForm, { LabelEntry } from './components/LabelForm';
import EntryList from './components/EntryList';
import PrintPreview from './components/PrintPreview';
import PrintableContainer from './components/PrintableContainer';
import RecentProducts from './components/RecentProducts';


export default function Home() {
  const [entries, setEntries] = useState<LabelEntry[]>([]);
  const [formKey, setFormKey] = useState(0);
  const [recentProducts, setRecentProducts] = useState<Partial<LabelEntry>[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Partial<LabelEntry> | null>(null);
  const [isClient, setIsClient] = useState(false);

  const fetchRecentProducts = async () => {
    try {
      const res = await fetch('/api/get-products');
      const data = await res.json();
      if (Array.isArray(data)) {
        setRecentProducts(data);
      }
    } catch (e) {
      console.error('Failed to fetch recent products', e);
    }
  };

  useEffect(() => {
    setIsClient(true);
    setEntries([]);
    fetchRecentProducts();
  }, []);

  const addEntry = (entry: LabelEntry) => {
    setEntries([...entries, entry]);
    setSelectedProduct(null); // Clear selection after adding
  };

  const removeEntry = (id: string) => {
    setEntries(entries.filter(e => e.id !== id));
  };

  const clearEntries = () => {
    if (window.confirm('Are you sure you want to clear the entire queue?')) {
      setEntries([]);
    }
  };

  const handlePrint = async () => {
    if (entries.length === 0) return;

    try {
      await fetch('/api/save-products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entries),
      });
    } catch (error) {
      console.error('Failed to save products before printing:', error);
    }
    window.print();
    setEntries([]);
    setFormKey(prev => prev + 1);
    setSelectedProduct(null);
    fetchRecentProducts(); // Refresh after printing
  };

  const handleSelectRecent = (product: Partial<LabelEntry>) => {
    setSelectedProduct(product);
  };

  if (!isClient) return null;

  return (
    <>
      <div className="dashboard-container">
        <header className="header">
          <div>
            <h1>Green Hood</h1>
            <p style={{ color: 'var(--text-muted)' }}>Clothing Tag & Label Printing System</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--primary)' }}>Production Ready</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>80.6mm × 60.4mm (2-up)</div>
          </div>
        </header>

        <main className="main-grid">
          <div className="left-column">
            <LabelForm key={formKey} onAdd={addEntry} initialData={selectedProduct} />
            <div style={{ marginTop: '2rem' }}>
              <EntryList 
                entries={entries} 
                onRemove={removeEntry} 
                onClear={clearEntries}
                onPrint={handlePrint}
              />
            </div>
          </div>

          <div className="right-column">
            <RecentProducts products={recentProducts} onSelect={handleSelectRecent} />
            <PrintPreview entries={entries} />
          </div>
        </main>

        <footer style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--border)', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          <p>&copy; {new Date().getFullYear()} Green Hood. All rights reserved.</p>
          <p style={{ marginTop: '0.5rem' }}>Designed for Thermal Label Printers.</p>
        </footer>
      </div>

      {/* Hidden during screen viewing, visible during print. Outside to prevent parent layout overhead in print. */}
      <PrintableContainer entries={entries} />
    </>
  );
}
