# Green Hood - Clothing Tag Printer

Professional Next.js application for printing clothing labels with precise 80.6mm × 60.4mm dimensions.

## Features
- **Precise Print Layout**: Matches 80.6mm × 60.4mm thermal label paper.
- **2-Up Identical Labels**: Each page contains two identical vertical labels side-by-side.
- **Dynamic Product Details**: Input Size, Fabric, and MRP for each entry.
- **Print Queue**: Manage multiple entries and print counts.
- **Premium Design**: Modern green-themed dashboard with Inter typography.

## Prerequisites
- Node.js 18+
- Thermal Label Printer (configured for 80.6mm × 60.4mm paper size)

## Setup & Run
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Printing Instructions
1. Add entries to the queue.
2. Click the **Print** button in the dashboard.
3. In the browser print dialog:
   - **Destination**: Select your label printer.
   - **Paper Size**: Ensure it is set to **80.6mm × 60.4mm** (or equivalent).
   - **Margins**: Set to **None**.
   - **Scale**: Set to **Default (100%)**.
   - **Background Graphics**: This should be enabled if you have colored backgrounds (though these labels are designed for black & white thermal output).

## Tech Stack
- Next.js 15 (App Router)
- React 19
- TypeScript
- Vanilla CSS (with @media print)
