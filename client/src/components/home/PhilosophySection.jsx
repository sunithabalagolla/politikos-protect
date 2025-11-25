const PhilosophySection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{animationDelay: '1.5s'}}></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Our Guiding Principles
        </h2>
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="text-center group">
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-300">
              <span className="text-5xl">🕉️</span>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-yellow-300">Dharma</h3>
            <p className="text-lg text-blue-100">Ethics & Righteousness</p>
            <p className="text-sm text-blue-200 mt-2">Grounded in ethical governance and transparent accountability</p>
          </div>
          <div className="text-center group">
            <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-300">
              <span className="text-5xl">🙏</span>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-pink-300">Seva</h3>
            <p className="text-lg text-blue-100">Selfless Service</p>
            <p className="text-sm text-blue-200 mt-2">Dedicated to serving communities without barriers</p>
          </div>
          <div className="text-center group">
            <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-300">
              <span className="text-5xl">🤝</span>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-cyan-300">Sangha</h3>
            <p className="text-lg text-blue-100">Collective Participation</p>
            <p className="text-sm text-blue-200 mt-2">Building community through collaboration and dialogue</p>
          </div>
        </div>

        {/* Lokarpana - Civic Ownership Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-xl">
                <span className="text-4xl">🏘️</span>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-green-300">Lokarpana</h3>
                <p className="text-lg text-blue-100">Reclaiming Civic Ownership</p>
              </div>
            </div>
            
            <p className="text-lg text-white/90 leading-relaxed mb-6 text-center">
              The principle of <span className="font-semibold text-green-300">Lokarpana</span> emphasizes that <span className="font-semibold">citizens are co-owners of public institutions</span>, not just service recipients.
            </p>

            <div className="bg-white/5 rounded-xl p-6 mb-6">
              <p className="text-base text-blue-100 leading-relaxed mb-4">
                Every interaction within People Centers—from grievance redressal to policy consultation—is treated as a <span className="font-semibold text-white">civic co-creation process</span> rather than a service transaction.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
                <div className="text-2xl mb-2">🤝</div>
                <p className="text-sm text-blue-100">
                  <span className="font-semibold text-white">Communities co-manage</span> civic programs together
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
                <div className="text-2xl mb-2">🔍</div>
                <p className="text-sm text-blue-100">
                  <span className="font-semibold text-white">Transparency & participation</span> embedded in all workflows
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
                <div className="text-2xl mb-2">👁️</div>
                <p className="text-sm text-blue-100">
                  <span className="font-semibold text-white">Citizens witness outcomes</span> of their engagement directly
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PhilosophySection
