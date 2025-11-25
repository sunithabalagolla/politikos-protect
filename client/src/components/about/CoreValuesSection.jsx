const CoreValuesSection = () => {
  const coreValues = [
    {
      icon: '✨',
      title: 'Truth',
      desc: 'All communication and reporting must be factual, verifiable, and bias-free',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: '💙',
      title: 'Empathy',
      desc: 'All staff must engage citizens with compassion, understanding local sensitivities and challenges',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: '🔍',
      title: 'Transparency',
      desc: 'All financial, digital, and programmatic data must be open to audit and public scrutiny',
      color: 'from-green-500 to-teal-600'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="scroll-reveal text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Our Core Values
          </h2>
          <p className="scroll-reveal text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            The operational expression of Dharma and Seva
          </p>

          {/* Truth, Empathy, Transparency */}
          <div className="scroll-reveal mb-16">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
              <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">
                Truth, Empathy, and Transparency
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-8 text-center">
                These three virtues ensure the People Center becomes a trusted and respected institution in every community.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8">
                {coreValues.map((item, idx) => (
                  <div key={idx} className="text-center">
                    <div className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      <span className="text-4xl">{item.icon}</span>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Civic Dignity and Equality */}
          <div className="scroll-reveal mb-16">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 md:p-12">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl">🤝</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Civic Dignity and Equality</h3>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    Every individual entering a People Center—be it a villager, youth, or bureaucrat—must feel respected. 
                    <span className="font-semibold"> No service can be denied or delayed based on influence, wealth, or social standing.</span>
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Inclusivity extends to gender equality, accessibility for persons with disabilities, and fair representation in volunteer and leadership roles.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Integrity in Action */}
          <div className="scroll-reveal">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border-l-4 border-blue-600">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl">🛡️</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Integrity in Action</h3>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Integrity is measured not by policy statements but by conduct. PPC's internal HR and governance systems are built on:
                  </p>
                  <div className="space-y-3">
                    {[
                      'Strict conflict-of-interest declarations',
                      'Zero-tolerance policy for corruption or bias',
                      'Transparent recruitment and procurement practices'
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <p className="text-gray-700">{item}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-700 leading-relaxed mt-6 italic">
                    All employees and volunteers sign a Declaration of Integrity and Non-Partisanship as part of their induction.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CoreValuesSection