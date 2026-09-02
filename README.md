<div align="center">
  <img src="public/wayvo-icon.svg" alt="WAYVO Logo" width="100" height="100" />
  <h1>WAYVO — Travel Your Way. Adapt As You Go.</h1>
  <p><strong>A Personalized and Dynamic Tour Planning & Tour Operations Platform</strong></p>
</div>

---

## 🌟 About WAYVO

WAYVO is an intelligent travel platform designed to bridge the gap between travelers and tour operators. It moves beyond static itineraries and traditional tour bookings by introducing a **Live Intelligence Loop** that dynamically responds to real-world disruptions (like flight delays or weather changes) and seamlessly coordinates travelers, vendors, and operators.

Whether you're a traveler designing a personalized multi-city trip or an operator managing a fleet of active groups, WAYVO keeps everyone synchronized in real-time.

## ✨ Core Features

1. **Smart Itinerary Personalization**  
   An AI-driven trip planner that curates custom itineraries based on destination, travel rhythm, budget, and specific interests.
2. **AI Digital Twin**  
   A live, interactive simulation of the traveler's journey, making it easy to anticipate upcoming activities and spot potential bottlenecks.
3. **AI Crisis Manager**  
   Automated disruption workflows. When an external disruption occurs (e.g., a flight delay), the system instantly calculates the downstream impact on transfers, hotels, and activities.
4. **Smart Replanning**  
   When an activity is canceled or delayed, WAYVO instantly proposes AI-curated alternative options that fit seamlessly into the traveler's schedule and budget, allowing for one-click rebooking.
5. **Real-Time Updates & Notifications**  
   Context-aware, rich notifications that keep both travelers and operators perfectly synced the moment a change is approved.
6. **Unified Operator Dashboard**  
   A "Mission Control" center for tour operators with a Live Tour Fleet Overview, automated traveler-sync, and one-click AI resolution tools for tours labeled as "At Risk."

## 🚀 Tech Stack

- **Framework**: React + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Context (`WayvoEngineProvider`)
- **Routing**: React Router DOM

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd wayvo
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`.

## 📁 Project Structure

- `src/components/` - Reusable UI components (Navbar, StatusBadge, MetricCard, AIChat)
- `src/pages/traveler/` - Traveler-facing views (Digital Twin, Crisis Manager, Itinerary)
- `src/pages/operator/` - Operator-facing views (Mission Control, Fleet Management)
- `src/data/` - Mock data and the central state engine (`wayvoEngine.tsx`)
- `src/App.tsx` - Main application routing and Context Providers

---

<div align="center">
  <i>Built to redefine modern travel operations.</i>
</div>
