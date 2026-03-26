import React from 'react';

export default function Dashboard() {
    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Dashboard</h1>
            </header>
            
            <main className="dashboard-main">
                <section className="stats-grid">
                    <div className="stat-card">
                        <h3>Total Users</h3>
                        <p className="stat-value">1,234</p>
                    </div>
                    <div className="stat-card">
                        <h3>Revenue</h3>
                        <p className="stat-value">$45,678</p>
                    </div>
                    <div className="stat-card">
                        <h3>Orders</h3>
                        <p className="stat-value">567</p>
                    </div>
                    <div className="stat-card">
                        <h3>Conversion</h3>
                        <p className="stat-value">3.2%</p>
                    </div>
                </section>

                <section className="charts-grid">
                    <div className="chart-container">
                        <h2>Recent Activity</h2>
                        <p>Chart placeholder</p>
                    </div>
                    <div className="chart-container">
                        <h2>Performance</h2>
                        <p>Chart placeholder</p>
                    </div>
                </section>
            </main>
        </div>
    );
}