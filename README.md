# 🏏 IPL T20 Live Dashboard

A modern, responsive IPL dashboard built with **Next.js**, **TypeScript**, and **Tailwind CSS**, designed to display live scores, points table, upcoming matches, and match schedules. Mobile-first and optimized for real-time updates, this app simulates the IPL experience using mock data or real-time scraping logic when IPL is active.

---

## 🚀 Live Demo

> [👉 Live Demo (https://ipl-t20-live-dashboard.vercel.app/)

---

## 📌 Project Overview

This dashboard provides IPL T20 match information, including:

- 🔴 **Live Match Info** – Scores, batsmen, bowlers, commentary
- 🕐 **Upcoming Matches** – Fixtures, venue, teams, and timing
- 🏆 **Points Table** – Standings with NRR, wins, losses, etc
- 📊 **PointsTable** – Dynamic table with playoff indicators
- 📊**MatchScorecard** – Detailed breakdown with visuals
- 📊**Charts** – Wickets/Runs/Comparison graphs
---
## 🔌 Data Sources

### ✅ Current Mode: **Mock Data**

Since the IPL is currently inactive, this app displays structured mock data stored in:

- `/data/mockData.ts` – Live match, points table, and fixtures
- `/data/teams.ts` – Team metadata including logos and colors

This ensures a fully functional demo experience at any time.

---
## 🛠 Tech Stack

| Layer         | Technology                             |
|---------------|-----------------------------------------|
| Framework     | [Next.js](https://nextjs.org/)          |
| Language      | TypeScript                              |
| Styling       | Tailwind CSS                            |
| Icons         | Lucide React                            |
| Charts        | Recharts                                |

---
## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ipl-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.
