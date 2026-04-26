'use client';

import React from 'react';
import Barcode from 'react-barcode';
import { LabelEntry } from './LabelForm';

interface PrintPreviewProps {
  entries: LabelEntry[];
}

export default function PrintPreview({ entries }: PrintPreviewProps) {
  // We need to flatten the entries based on copies
  const allLabels = entries.flatMap(entry => 
    Array.from({ length: entry.copies }, () => ({ ...entry }))
  );

  // Group into pages (2 labels per page)
  const pages = [];
  for (let i = 0; i < allLabels.length; i += 2) {
    pages.push(allLabels.slice(i, i + 2));
  }

  if (entries.length === 0) return null;

  return (
    <div className="card" style={{ overflowX: 'auto' }}>
      <h2 className="card-title">Live Print Preview</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#e2e8f0', padding: '2rem', borderRadius: '0.5rem' }}>
        {pages.map((page, pageIdx) => (
          <div key={pageIdx} className="preview-page">
            {page.map((label, labelIdx) => (
              <div key={labelIdx} className="preview-label">
                <div className="preview-brand">Green Hood</div>
                <div className="preview-details">
                  <span>ID: {label.id}</span>
                  <span>Size: {label.size}</span>
                  <span>MRP: {label.mrp}/.</span>
                </div>
                <div className="preview-barcode">
                  <Barcode 
                    value={label.id} 
                    width={1} 
                    height={35} 
                    margin={0} 
                    displayValue={false} 
                    background="transparent"
                  />
                </div>
              </div>
            ))}
            {/* If a page has only 1 label, add an empty placeholder to maintain layout if needed */}
            {page.length === 1 && (
               <div className="preview-label" style={{ background: '#f8fafc', opacity: 0.5 }}>
                 <div style={{ margin: 'auto', fontSize: '10px', color: '#999' }}>EMPTY LABEL</div>
               </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)', textAlign: 'center' }}>
        Note: This is a screen preview. Actual printing will use high-resolution vectors.
      </div>
    </div>
  );
}
