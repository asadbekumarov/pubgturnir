import { useState } from 'react';
import { Crown, Trophy, Medal } from 'lucide-react';

const Achievements = () => {
  const [activeTab, setActiveTab] = useState<'rewards' | 'achievements'>('rewards');

  const stars = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 2 + Math.random() * 3,
  }));

  const prizes = [
    {
      rank: 1,
      title: "BIRINCHI O'RIN",
      amount: '$25,000',
      description: 'Oltin medal va eternal trophy',
      color: 'rgb(243, 170, 1)',
      icon: Crown,
      delay: '300ms',
    },
    {
      rank: 2,
      title: "IKKINCHI O'RIN",
      amount: '$15,000',
      description: 'Kumush medal va premium rewards',
      color: 'rgb(192, 192, 192)',
      icon: Trophy,
      delay: '600ms',
    },
    {
      rank: 3,
      title: "UCHINCHI O'RIN",
      amount: '$10,000',
      description: 'Bronza medal va special items',
      color: 'rgb(205, 127, 50)',
      icon: Medal,
      delay: '900ms',
    },
  ];

  return (
    <section
      id="results"
      className="py-16 sm:py-20 md:py-28 relative overflow-hidden bg-[#000102] mx-auto px-4 sm:px-6 lg:px-8"
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 transition-all duration-1000">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-white leading-tight">
            YUTUQ{' '}
            <span
              className="block bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  'linear-gradient(90deg, rgb(243, 170, 1), rgb(255, 207, 64), rgb(243, 170, 1))',
              }}
            >
              VA MUKOFOTLAR
            </span>
          </h2>
        
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12 sm:mb-16">
          <div className="bg-gray-900/60 backdrop-blur-md rounded-full p-1 sm:p-2 px-1 sm:px-3 flex space-x-1 sm:space-x-2 border border-[#f3aa01]/20">
            <button
              onClick={() => setActiveTab('rewards')}
              className={`px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full font-bold capitalize text-xs sm:text-sm md:text-base 
                transition transform duration-300 ${
                  activeTab === 'rewards'
                    ? 'bg-[#f3aa01] text-black scale-105 shadow-[0_0_20px_#f3aa01]'
                    : 'text-white hover:text-[#f3aa01] hover:bg-gray-800/50 hover:scale-105'
                }`}
            >
              MUKOFOTLAR
            </button>
            <button
              onClick={() => setActiveTab('achievements')}
              className={`px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full font-bold capitalize text-xs sm:text-sm md:text-base 
                transition transform duration-300 ${
                  activeTab === 'achievements'
                    ? 'bg-[#f3aa01] text-black scale-105 shadow-[0_0_20px_#f3aa01]'
                    : 'text-white hover:text-[#f3aa01] hover:bg-gray-800/50 hover:scale-105'
                }`}
            >
              YUTUQLAR
            </button>
          </div>
        </div>

        {/* Prize Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-6 md:gap-8 lg:gap-10">
          {prizes.map((prize) => {
            const Icon = prize.icon;
            return (
              <div
                key={prize.rank}
                className="relative bg-black/70 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 text-center border border-[#f3aa01]/20 hover:border-[#f3aa01]/40 transition-colors duration-300 flex flex-col h-full min-h-[320px] sm:min-h-[380px] md:min-h-[420px]"
                style={{ animationDelay: prize.delay }}
              >
                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-transparent via-transparent to-[#ffffff10] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Rank Badge */}
                <div
                  className="absolute -top-3 sm:-top-4 md:-top-5 left-1/2 -translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-black font-extrabold text-sm sm:text-lg md:text-xl shadow-lg font-mono"
                  style={{ backgroundColor: prize.color }}
                >
                  {prize.rank}
                </div>

                {/* Icon */}
                <div className="mb-4 sm:mb-6 flex justify-center">
                  <div
                    className="p-3 sm:p-4 md:p-5 rounded-full ring-1 ring-inset"
                    style={{
                      backgroundColor: `${prize.color}20`,
                      boxShadow: `${prize.color}20 0px 0px 20px`,
                      borderColor: 'rgb(243, 170, 1)',
                    }}
                  >
                    <Icon
                      className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12"
                      style={{ color: prize.color }}
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3">
                  {prize.title}
                </h3>

                {/* Amount */}
                <div
                  className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 sm:mb-4 tracking-wide"
                  style={{ color: prize.color }}
                >
                  {prize.amount}
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6 leading-relaxed">
                  {prize.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Achievements;