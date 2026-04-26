'use client';

import React from 'react';
import Barcode from 'react-barcode';
import { LabelEntry } from './LabelForm';

interface PrintableContainerProps {
  entries: LabelEntry[];
}

export default function PrintableContainer({ entries }: PrintableContainerProps) {
  // 1. Flatten all labels into a single list based on copies
  const allLabels = entries.flatMap(entry => 
    Array.from({ length: entry.copies }, () => ({ ...entry }))
  );

  // 2. Group into pages (2 labels per page)
  const pages = [];
  for (let i = 0; i < allLabels.length; i += 2) {
    pages.push(allLabels.slice(i, i + 2));
  }
  
  return (
    <div id="print-area">
      {pages.map((page, pageIdx) => (
        <div key={pageIdx} className="print-page">
          {page.map((label, labelIdx) => (
            <div key={`${label.id}-${labelIdx}`} className="label-container">
              <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
                <div className="brand-name">Green Hood</div>
                <div className="details-sidebar">
                  <span>ID: {label.id}</span>
                  <span>Size: {label.size}</span>
                  <span>MRP: {label.mrp}/.</span>
                </div>
                <div className="barcode-container">
                   <Barcode 
                    value={label.id} 
                    width={1.2} 
                    height={40} 
                    margin={0} 
                    displayValue={false} 
                    background="transparent"
                  />
                </div>
              </div>
            </div>
          ))}
          {/* If a page has only 1 label, add a blank one to maintain the 2nd slot and the divider line */}
          {page.length === 1 && (
            <div className="label-container">
               <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
                  {/* Empty */}
               </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
