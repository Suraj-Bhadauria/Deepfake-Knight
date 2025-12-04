'use client';

import { FiAlertCircle, FiDollarSign, FiUsers, FiShield } from 'react-icons/fi';
import { deepfakeStats } from '@/lib/deepfakeStats';

export default function RealWorldImpact() {
  const impacts = [
    {
      icon: FiUsers,
      title: 'Political Manipulation',
      description: 'Deepfakes used to create fake speeches, manipulate elections, and spread propaganda targeting millions of voters worldwide.',
      stats: '68% of countries affected in 2024',
      color: 'red',
    },
    {
      icon: FiDollarSign,
      title: 'Financial Fraud',
      description: 'CEO voice cloning and fake video calls used to authorize fraudulent transactions and steal corporate funds.',
      stats: '$243M stolen via deepfake fraud in 2024',
      color: 'yellow',
    },
    {
      icon: FiAlertCircle,
      title: 'Reputation Damage',
      description: 'Fabricated videos and images used to defame individuals, spread misinformation, and destroy personal reputations.',
      stats: '45K+ victims reported in 2024',
      color: 'orange',
    },
    {
      icon: FiShield,
      title: 'Identity Theft',
      description: 'Synthetic identities created for bypassing security systems, accessing accounts, and committing various forms of fraud.',
      stats: '82% increase in deepfake-based identity fraud',
      color: 'purple',
    },
  ];

  const colorMap = {
    red: 'from-red-500 to-red-600',
    yellow: 'from-yellow-500 to-yellow-600',
    orange: 'from-orange-500 to-orange-600',
    purple: 'from-purple-500 to-purple-600',
  };

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Real-World Impact of Deepfakes
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Understanding the consequences: How deepfakes are affecting society, security, and trust in 2024-2025.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {impacts.map((impact, index) => (
            <div key={index} className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300">
              <div className={`w-16 h-16 bg-gradient-to-br ${colorMap[impact.color]} rounded-full flex items-center justify-center mb-6`}>
                <impact.icon className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{impact.title}</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                {impact.description}
              </p>
              <div className="bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg inline-block">
                <span className="font-bold text-yellow-400">{impact.stats}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-red-600 to-orange-600 p-10 rounded-2xl shadow-2xl">
          <h3 className="text-3xl font-bold mb-6 text-center">Notable Deepfake Incidents (2024-2025)</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {deepfakeStats.incidents.slice(0, 3).map((incident, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <h4 className="font-bold text-lg mb-2">{incident.title}</h4>
                <p className="text-sm text-white/80">
                  {incident.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 px-6 py-4 rounded-xl inline-block">
            <p className="font-bold text-lg">
              ⚠️ The threat is accelerating. Early detection is crucial to protecting individuals and organizations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
