'use client';

import React from 'react';
import { LabelEntry } from './LabelForm';

interface EntryListProps {
  entries: LabelEntry[];
  onRemove: (id: string) => void;
  onClear: () => void;
  onPrint: () => void;
}

export default function EntryList({ entries, onRemove, onClear, onPrint }: EntryListProps) {
  const totalCopies = entries.reduce((acc, entry) => acc + entry.copies, 0);
  const totalPages = Math.ceil(totalCopies / 2);

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 className="card-title" style={{ margin: 0 }}>Print Queue</h2>
        {entries.length > 0 && (
          <button onClick={onClear} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>
            Clear All
          </button>
        )}
      </div>

      {entries.length === 0 ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', border: '2px dashed var(--border)', borderRadius: '0.5rem' }}>
          No items in queue. Add some labels to start.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '0.5rem' }}>
            {entries.map((entry) => (
              <div key={entry.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid var(--border)', borderRadius: '0.5rem', marginBottom: '0.5rem' }}>
                <div>
                  <div style={{ fontWeight: 600 }}>#{entry.id} | {entry.code} - {entry.size}</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>MRP: ₹{entry.mrp} | Copies: {entry.copies}</div>
                </div>
                <button 
                  onClick={() => onRemove(entry.id)}
                  style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem' }}
                  title="Remove"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '1rem', padding: '1rem', background: 'var(--primary-light)', borderRadius: '0.5rem', color: 'var(--primary-dark)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
              <span>Total Labels:</span>
              <span>{totalCopies}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
              <span>Required Paper Sheets:</span>
              <span>{totalPages} (80.6mm × 60.4mm)</span>
            </div>
          </div>

          <button onClick={onPrint} className="btn" style={{ marginTop: '0.5rem' }}>
            Print {totalCopies} Labels
          </button>
        </div>
      )}
    </div>
  );
}
