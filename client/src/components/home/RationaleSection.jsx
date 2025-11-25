const RationaleSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="scroll-reveal text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Why People Centers?
          </h2>
          <p className="scroll-reveal text-xl text-gray-600 max-w-3xl mx-auto">
            Bridging the gap between elections and everyday civic participation
          </p>
        </div>

        {/* Problem-Solution Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          
          {/* THE PROBLEM - Left Side */}
          <div className="scroll-reveal-left relative group">
            <div className="relative h-full rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <img 
                  src="https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&q=80" 
                  alt="Empty voting booth"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-red-900/90 to-orange-900/90"></div>
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-2xl">⚠️</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">The Problem</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3 group/item">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-lg">🗳️</span>
                    </div>
                    <div>
                      <p className="text-white/90 leading-relaxed">
                        <span className="font-semibold text-white">Citizen participation ends at voting.</span> Between elections, there's no structured way for citizens to engage with governance.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 group/item">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-lg">🚧</span>
                    </div>
                    <div>
                      <p className="text-white/90 leading-relaxed">
                        <span className="font-semibold text-white">Bureaucratic red tape</span> makes it difficult for citizens to report issues or get responses from authorities.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 group/item">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-lg">📺</span>
                    </div>
                    <div>
                      <p className="text-white/90 leading-relaxed">
                        <span className="font-semibold text-white">Media-driven polarization</span> dominates civic discourse, creating division instead of dialogue.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* THE SOLUTION - Right Side */}
          <div className="scroll-reveal-right relative group">
            <div className="relative h-full rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <img 
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80" 
                  alt="Community gathering"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 to-purple-900/90"></div>
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-2xl">✨</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">The Solution</h3>
                </div>
                
                <p className="text-white/90 mb-6 leading-relaxed">
                  <span className="font-semibold text-white">People Centers fill this void</span> by providing a structured, transparent, and citizen-owned platform that enables:
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 group/item">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-lg">💬</span>
                    </div>
                    <div>
                      <p className="text-white/90 leading-relaxed">
                        <span className="font-semibold text-white">Ongoing dialogue</span> between people and policymakers
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 group/item">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-lg">🛠️</span>
                    </div>
                    <div>
                      <p className="text-white/90 leading-relaxed">
                        <span className="font-semibold text-white">Localized problem-solving</span> via civic service desks
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 group/item">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-lg">📚</span>
                    </div>
                    <div>
                      <p className="text-white/90 leading-relaxed">
                        <span className="font-semibold text-white">Capacity building</span> through civic education and workshops
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 group/item">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-lg">🤝</span>
                    </div>
                    <div>
                      <p className="text-white/90 leading-relaxed">
                        <span className="font-semibold text-white">Social trust-building</span> through cultural and collective programs
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 scroll-reveal-zoom">
          <p className="text-lg text-gray-600 italic">
            "Transforming civic participation from a once-in-five-years event to an everyday practice"
          </p>
        </div>
      </div>
    </section>
  )
}

export default RationaleSection
