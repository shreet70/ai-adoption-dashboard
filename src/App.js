import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const industries = {
  "Information Technology": {
    "<$10M": 40,
    "$10-100M": 70,
    "$100-500M": 85,
    ">$500M": 95,
    "color": "#2563eb"
  },
  "Financial Services": {
    "<$10M": 30,
    "$10-100M": 60,
    "$100-500M": 80,
    ">$500M": 90,
    "color": "#16a34a"
  },
  "Healthcare": {
    "<$10M": 15,
    "$10-100M": 30,
    "$100-500M": 60,
    ">$500M": 80,
    "color": "#dc2626"
  },
  "Manufacturing": {
    "<$10M": 10,
    "$10-100M": 25,
    "$100-500M": 55,
    ">$500M": 75,
    "color": "#9333ea"
  },
  "Telecommunications": {
    "<$10M": 10,
    "$10-100M": 50,
    "$100-500M": 80,
    ">$500M": 95,
    "color": "#ea580c"
  },
  "Aerospace": {
    "<$10M": 7,
    "$10-100M": 17,
    "$100-500M": 35,
    ">$500M": 62,
    "color": "#0891b2"
  },
  "Construction": {
    "<$10M": 5,
    "$10-100M": 7,
    "$100-500M": 17,
    ">$500M": 32,
    "color": "#854d0e"
  },
  "Professional Services": {
    "<$10M": 7,
    "$10-100M": 30,
    "$100-500M": 60,
    ">$500M": 85,
    "color": "#6b21a8"
  }
};

function App() {
  const [selectedIndustry, setSelectedIndustry] = useState(null);

  // Prepare data for the overview chart
  const overviewData = Object.entries(industries).map(([industry, data]) => ({
    name: industry,
    'Enterprise (>$500M)': data['>$500M'],
    'Mid-Large ($100-500M)': data['$100-500M'],
    'Small-Mid ($10-100M)': data['$10-100M'],
    'Small (<$10M)': data['<$10M']
  }));

  return (
    <div style={{ padding: '20px' }}>
      <h1>AI Adoption Rates Across Industries (2023-2025)</h1>
      
      {/* Overview Chart */}
      <div style={{ height: '400px', marginBottom: '40px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={overviewData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: 'Adoption Rate (%)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="Enterprise (>$500M)" fill="#2563eb" />
            <Bar dataKey="Mid-Large ($100-500M)" fill="#16a34a" />
            <Bar dataKey="Small-Mid ($10-100M)" fill="#dc2626" />
            <Bar dataKey="Small (<$10M)" fill="#9333ea" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Industry Selector */}
      <div style={{ marginBottom: '20px' }}>
        <select 
          style={{ width: '100%', padding: '10px', fontSize: '16px' }}
          onChange={(e) => setSelectedIndustry(e.target.value)}
          value={selectedIndustry || ''}
        >
          <option value="">Select an industry for detailed view</option>
          {Object.keys(industries).map(industry => (
            <option key={industry} value={industry}>{industry}</option>
          ))}
        </select>
      </div>

      {/* Detail Chart */}
      {selectedIndustry && (
        <div style={{ height: '300px' }}>
          <h2>{selectedIndustry} - Adoption by Company Size</h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={[
              { size: 'Small (<$10M)', adoption: industries[selectedIndustry]['<$10M'] },
              { size: 'Small-Mid ($10-100M)', adoption: industries[selectedIndustry]['$10-100M'] },
              { size: 'Mid-Large ($100-500M)', adoption: industries[selectedIndustry]['$100-500M'] },
              { size: 'Enterprise (>$500M)', adoption: industries[selectedIndustry]['>$500M'] }
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="size" />
              <YAxis label={{ value: 'Adoption Rate (%)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Line type="monotone" dataKey="adoption" stroke={industries[selectedIndustry].color} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default App;