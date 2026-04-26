'use client';

import React from 'react';
import { LabelEntry } from './LabelForm';

interface RecentProductsProps {
  products: Partial<LabelEntry>[];
  onSelect: (product: Partial<LabelEntry>) => void;
}

export default function RecentProducts({ products, onSelect }: RecentProductsProps) {
  if (products.length === 0) return null;

  return (
    <div className="card" style={{ marginBottom: '1.5rem' }}>
      <h2 className="card-title">Recent Tags</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left' }}>
              <th style={{ padding: '0.5rem' }}>Code</th>
              <th style={{ padding: '0.5rem' }}>Size</th>
              <th style={{ padding: '0.5rem' }}>MRP</th>
              <th style={{ padding: '0.5rem' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, idx) => (
              <tr 
                key={product.id || idx} 
                style={{ borderBottom: '1px solid var(--border)', cursor: 'pointer' }}
                onClick={() => onSelect(product)}
                className="recent-row"
              >
                <td style={{ padding: '0.5rem' }}>{product.code}</td>
                <td style={{ padding: '0.5rem' }}>{product.size}</td>
                <td style={{ padding: '0.5rem' }}>₹{product.mrp}</td>
                <td style={{ padding: '0.5rem' }}>
                  <button className="btn-small" style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}>Fill</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style jsx>{`
        .recent-row:hover {
          background-color: var(--primary-light);
        }
        .btn-small {
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 0.25rem;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
