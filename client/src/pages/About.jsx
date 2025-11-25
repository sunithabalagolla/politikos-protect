import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import Footer from '../components/Footer'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { HeroSection, CoreValuesSection } from '../components/about'

const About = () => {
  useScrollReveal()

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <HeroSection />
      <CoreValuesSection />

      {/* Who We Are - PPC Identity */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="scroll-reveal text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Who We Are
            </h2>
            <p className="scroll-reveal text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
              PPC as a Civic Infrastructure Layer
            </p>

            <div className="scroll-reveal bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12 mb-12">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Just as physical infrastructure builds economies, <span className="font-bold text-blue-600">civic infrastructure builds democracies</span>. 
                PPC serves as this missing civic infrastructure layer—combining:
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                {[
                  {
                    icon: '🏢',
                    title: 'Physical Accessibility',
                    desc: 'Centers and kiosks in communities',
                    color: 'from-blue-500 to-indigo-600'
                  },
                  {
                    icon: '💻',
                    title: 'Digital Connectivity',
                    desc: 'Apps and dashboards for everyone',
                    color: 'from-purple-500 to-pink-600'
                  },
                  {
                    icon: '🤝',
                    title: 'Human Facilitation',
                    desc: 'Volunteers and civic fellows',
                    color: 'from-green-500 to-teal-600'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <span className="text-3xl">{item.icon}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">{item.title}</h3>
                    <p className="text-gray-600 text-center text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>

              <p className="text-lg text-gray-700 leading-relaxed mt-8 text-center font-semibold">
                It's a model that ensures participation becomes as easy and routine as accessing a public service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Civic Lifecycle - Reference */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="scroll-reveal text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Our Approach
            </h2>
            <p className="scroll-reveal text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              The Civic Lifecycle Framework
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  stage: '01',
                  title: 'Awareness',
                  subtitle: 'Learn & Understand',
                  desc: 'Citizens are educated on rights, government schemes, and civic processes',
                  icon: '🧠',
                  color: 'from-blue-500 to-indigo-600'
                },
                {
                  stage: '02',
                  title: 'Engagement',
                  subtitle: 'Participate & Collaborate',
                  desc: 'Citizens raise concerns, participate in initiatives, and collaborate',
                  icon: '🤝',
                  color: 'from-purple-500 to-pink-600'
                },
                {
                  stage: '03',
                  title: 'Accountability',
                  subtitle: 'Monitor & Report',
                  desc: 'Institutions are monitored, outcomes tracked, and results publicly reported',
                  icon: '📊',
                  color: 'from-green-500 to-teal-600'
                }
              ].map((item, idx) => (
                <div key={idx} className="scroll-reveal-zoom bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300" style={{transitionDelay: `${idx * 0.1}s`}}>
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <span className="text-3xl">{item.icon}</span>
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-bold text-gray-400 mb-1">STAGE {item.stage}</div>
                    <h3 className="text-xl font-bold mb-1 text-gray-900">{item.title}</h3>
                    <p className={`text-sm font-semibold bg-gradient-to-r ${item.color} bg-clip-text text-transparent mb-3`}>
                      {item.subtitle}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="scroll-reveal text-center">
              <p className="text-lg text-gray-700 italic mb-6">
                "From Awareness to Action - Every citizen's path to meaningful change"
              </p>
              <Link to="/">
                <Button variant="outline" size="lg" className="text-base">
                  Learn More on Home Page →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="scroll-reveal text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              What Makes Us Different
            </h2>
            <p className="scroll-reveal text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
              Differentiation from NGOs, CSR Units, and Media Houses
            </p>

            <div className="scroll-reveal bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 md:p-12 mb-12">
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Unlike NGOs that focus on advocacy or relief, or CSR units centered on brand-linked philanthropy, 
                <span className="font-bold text-purple-600"> PPC operates differently</span>:
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: '⚖️',
                    title: 'Non-Partisan, Community-Owned',
                    desc: 'We serve all citizens equally, without political or corporate bias',
                    color: 'from-blue-500 to-indigo-600'
                  },
                  {
                    icon: '🌐',
                    title: 'Platform, Not a Project',
                    desc: 'A sustainable infrastructure for ongoing civic participation, not a one-time initiative',
                    color: 'from-purple-500 to-pink-600'
                  },
                  {
                    icon: '🤲',
                    title: 'Public Trust Model',
                    desc: 'Sustained by multiple stakeholders - citizens, institutions, and communities together',
                    color: 'from-green-500 to-teal-600'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                    <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-white rounded-2xl border-l-4 border-purple-600">
                <p className="text-lg font-semibold text-gray-900">
                  Our goal is not charity, but <span className="text-purple-600">empowered collaboration</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Core Values */}
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
                  {[
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
                  ].map((item, idx) => (
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

      {/* Our Principles - Lokarpana & Samvaada */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="scroll-reveal text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Our Guiding Principles
            </h2>
            <p className="scroll-reveal text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
              Lokarpana and Samvaada - The foundations of our institutional practice
            </p>

            {/* Lokarpana */}
            <div className="scroll-reveal mb-16">
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 md:p-12">
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">🙏</div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-3">Lokarpana</h3>
                  <p className="text-xl text-orange-600 font-semibold mb-4">Public Ownership and Collective Duty</p>
                  <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                    Lokarpana means dedication to the public good. It redefines the citizen not as a recipient but as a 
                    <span className="font-bold"> co-owner of the institution</span>. Every People Center operates as a 
                    <span className="font-bold"> Lokarpit Kendra</span>—publicly accountable, collectively governed, and ethically grounded.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-white rounded-2xl p-6 shadow-md">
                    <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">📋</span>
                      Implementation
                    </h4>
                    <div className="space-y-3">
                      {[
                        'Open Governance: All meeting minutes, budgets, and reports are accessible',
                        'Citizen Participation: Community Councils participate in quarterly planning',
                        'Public Feedback: Projects evaluated by local citizen panels'
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-700 text-sm">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-md">
                    <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">🤲</span>
                      Civic Duty
                    </h4>
                    <div className="space-y-3">
                      {[
                        'Respect facilities as shared assets',
                        'Participate in community monitoring',
                        'Uphold decorum, non-violence, and inclusivity'
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-700 text-sm">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-white rounded-2xl border-l-4 border-orange-600">
                  <p className="text-lg font-semibold text-gray-900 text-center">
                    Governance becomes not a top-down service but a <span className="text-orange-600">bottom-up partnership</span>.
                  </p>
                </div>
              </div>
            </div>

            {/* Samvaada */}
            <div className="scroll-reveal">
              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-3xl p-8 md:p-12">
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">💬</div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-3">Samvaada</h3>
                  <p className="text-xl text-teal-600 font-semibold mb-4">Continuous Dialogue</p>
                  <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                    Samvaada means structured, respectful, and continuous dialogue. PPC institutionalizes Samvaada by creating 
                    spaces—both physical and digital—for citizens to express, deliberate, and resolve.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mt-8 mb-8">
                  {[
                    {
                      icon: '🏛️',
                      title: 'Lok Samvaad Halls',
                      desc: 'Dedicated discussion rooms for public deliberations'
                    },
                    {
                      icon: '📱',
                      title: 'Digital Consultations',
                      desc: 'Polls and consultations via Politikos App and Dashboard'
                    },
                    {
                      icon: '🔄',
                      title: 'Samvaad Circles',
                      desc: 'Monthly forums where citizens, officials, and experts co-create plans'
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white rounded-2xl p-6 shadow-md text-center">
                      <div className="text-4xl mb-3">{item.icon}</div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h4 className="text-lg font-bold text-gray-900 mb-4 text-center">Principles of Effective Civic Communication</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { label: 'Clarity', desc: 'Use simple, accessible language' },
                      { label: 'Respect', desc: 'Maintain non-judgmental tone' },
                      { label: 'Accessibility', desc: 'Multiple language options and formats' },
                      { label: 'Accountability', desc: 'Record and publish follow-up actions' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-sm font-bold">{idx + 1}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{item.label}</p>
                          <p className="text-gray-600 text-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 p-6 bg-white rounded-2xl border-l-4 border-teal-600">
                  <p className="text-lg font-semibold text-gray-900 text-center">
                    Through Samvaada, civic dialogue becomes a <span className="text-teal-600">culture, not an event</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Motto */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bTAtMTBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="scroll-reveal text-6xl mb-8">🕉️</div>
            <h2 className="scroll-reveal text-4xl md:text-5xl font-bold mb-8">
              Our Motto
            </h2>
            <div className="scroll-reveal bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20">
              <p className="text-3xl md:text-4xl font-bold mb-8 leading-relaxed">
                "By People, For People, Through Dharma"
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                {[
                  {
                    icon: '👥',
                    title: 'By People',
                    desc: 'Citizens are co-owners',
                    color: 'from-blue-400 to-cyan-400'
                  },
                  {
                    icon: '❤️',
                    title: 'For People',
                    desc: 'All programs serve public welfare',
                    color: 'from-purple-400 to-pink-400'
                  },
                  {
                    icon: '⚖️',
                    title: 'Through Dharma',
                    desc: 'Every action aligns with ethical and truthful service',
                    color: 'from-green-400 to-teal-400'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-5xl mb-4">{item.icon}</div>
                    <h3 className={`text-2xl font-bold mb-3 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                      {item.title}
                    </h3>
                    <p className="text-blue-100 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-white/20">
                <p className="text-xl text-blue-100 leading-relaxed">
                  This motto embodies our institutional ethos — defining the moral foundation on which PPC stands. 
                  A civic institution designed not just to solve problems, but to <span className="font-bold text-white">nurture trust, transparency, and transformation</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision 2030 Link */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="scroll-reveal text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Vision 2030
            </h2>
            <p className="scroll-reveal text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Building a network of 500+ People Centers across India, making civic engagement a cultural habit
            </p>
            <div className="scroll-reveal">
              <Link to="/roadmap">
                <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  View Our Roadmap →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="scroll-reveal text-4xl md:text-5xl font-bold mb-6 text-white">
            Join the Movement
          </h2>
          <p className="scroll-reveal text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Be part of building the civic infrastructure that transforms participation into co-creation
          </p>
          <div className="scroll-reveal flex gap-4 justify-center flex-wrap">
            <Link to="/register">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6 bg-white text-blue-600 hover:bg-gray-50">
                Get Started →
              </Button>
            </Link>
            <Link to="/issues">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 backdrop-blur text-white border-white/30 hover:bg-white/20">
                Explore Issues
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default About
