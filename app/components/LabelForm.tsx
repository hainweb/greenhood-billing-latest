'use client';

import React, { useState } from 'react';

interface LabelFormProps {
  onAdd: (entry: LabelEntry) => void;
  initialData?: Partial<LabelEntry> | null;
}

export interface LabelEntry {
  id: string;
  code: string;
  size: string;
  mrp: string;
  copies: number;
}

export default function LabelForm({ onAdd, initialData }: LabelFormProps) {
  const [code, setCode] = useState('');
  const [size, setSize] = useState('');
  const [mrp, setMrp] = useState('');
  const [copies, setCopies] = useState<string | number>('');

  React.useEffect(() => {
    if (initialData) {
      setCode(initialData.code || '');
      setSize(initialData.size || '');
      setMrp(initialData.mrp || '');
      setCopies(initialData.copies || 1);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      id: Math.floor(100000 + Math.random() * 900000).toString(),
      code,
      size,
      mrp,
      copies: typeof copies === 'string' ? (parseInt(copies) || 1) : copies
    });
  };

  return (
    <div className="card">
      <h2 className="card-title">Add New Tag</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="size">Size</label>
          <input
            id="size"
            type="text"
            className="input"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            required
            placeholder="e.g. XL, 42, M"
          />
        </div>
        <div className="form-group">
          <label htmlFor="code">Code</label>
          <input
            id="code"
            type="text"
            className="input"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            placeholder="e.g. GH-101"
          />
        </div>
        <div className="form-group">
          <label htmlFor="mrp">MRP (₹)</label>
          <input
            id="mrp"
            type="text"
            className="input"
            value={mrp}
            onChange={(e) => setMrp(e.target.value)}
            required
            placeholder="e.g. 1299"
          />
        </div>
        <div className="form-group">
          <label htmlFor="copies">Number of Copies</label>
          <input
            id="copies"
            type="number"
            min="1"
            className="input no-spin"
            value={copies}
            onChange={(e) => setCopies(e.target.value)}
            onWheel={(e) => e.currentTarget.blur()}
            required
          />
        </div>
        <button type="submit" className="btn">Add to Print Queue</button>
      </form>
      <style jsx>{`
        /* Hide arrows for Chrome, Safari, Edge, Opera */
        .no-spin::-webkit-outer-spin-button,
        .no-spin::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Hide arrows for Firefox */
        .no-spin {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
}
