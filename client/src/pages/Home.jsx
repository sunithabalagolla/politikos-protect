import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Button } from '../components/ui/button'
import Footer from '../components/Footer'
import {
  HeroSection,
  EcosystemSection,
  RationaleSection,
  FeaturesSection,
  PhilosophySection
} from '../components/home'
import { useScrollReveal } from '../hooks/useScrollReveal'

const Home = () => {
  const { user, isAdmin } = useAuth()
  useScrollReveal()

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <HeroSection user={user} isAdmin={isAdmin} />
      <EcosystemSection />
      <RationaleSection />
      <FeaturesSection />
      
      {/* Civic Lifecycle */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="scroll-reveal text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            The Civic Lifecycle
          </h2>
          <p className="scroll-reveal text-xl text-gray-600 text-center mb-6 max-w-3xl mx-auto">
            Your journey from awareness to action - transforming civic participation from information to co-creation
          </p>
          <p className="scroll-reveal text-lg text-gray-500 text-center mb-16 max-w-2xl mx-auto italic">
            "From Awareness to Action - Every citizen's path to meaningful change"
          </p>
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto relative">
            {[
              { 
                stage: '01', 
                title: 'Awareness', 
                subtitle: 'Learn & Understand',
                desc: 'Citizens are educated on rights, government schemes, and civic processes through workshops and resources', 
                icon: '🧠', 
                color: 'from-blue-500 to-indigo-600',
                features: ['Know your rights', 'Understand schemes', 'Learn processes']
              },
              { 
                stage: '02', 
                title: 'Engagement', 
                subtitle: 'Participate & Collaborate',
                desc: 'Citizens raise concerns, participate in initiatives, and collaborate with communities and institutions', 
                icon: '🤝', 
                color: 'from-purple-500 to-pink-600',
                features: ['Report issues', 'Join events', 'Take surveys']
              },
              { 
                stage: '03', 
                title: 'Accountability', 
                subtitle: 'Monitor & Report',
                desc: 'Institutions are monitored, outcomes are tracked, and results are publicly reported for transparency', 
                icon: '📊', 
                color: 'from-green-500 to-teal-600',
                features: ['Track progress', 'Monitor outcomes', 'Public reporting']
              }
            ].map((item, idx) => (
              <div key={idx} className="scroll-reveal-zoom group relative" style={{transitionDelay: `${idx * 0.15}s`}}>
                <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full">
                  <div className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-3xl">{item.icon}</span>
                  </div>
                  <div className="text-center mb-6">
                    <div className="text-sm font-bold text-gray-400 mb-2">STAGE {item.stage}</div>
                    <h3 className="text-2xl font-bold mb-2 text-gray-900">{item.title}</h3>
                    <p className={`text-sm font-semibold bg-gradient-to-r ${item.color} bg-clip-text text-transparent mb-4`}>
                      {item.subtitle}
                    </p>
                    <p className="text-gray-600 leading-relaxed mb-6">{item.desc}</p>
                  </div>
                  <div className="space-y-2">
                    {item.features.map((feature, featureIdx) => (
                      <div key={featureIdx} className="flex items-center gap-3">
                        <div className={`w-6 h-6 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Arrow connector */}
                {idx < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-10">
                    <div className="w-12 h-1 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full relative">
                      <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-gray-400 rounded-full"></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* Bottom message */}
          <div className="text-center mt-16 scroll-reveal">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Complete the Cycle
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                This continuous cycle ensures that civic participation evolves from passive information consumption to active co-creation of solutions, making every citizen a stakeholder in governance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision 2030 Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bTAtMTBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="scroll-reveal text-4xl md:text-5xl font-bold mb-6">
              Vision 2030 & Beyond
            </h2>
            <p className="scroll-reveal text-xl text-blue-200 max-w-3xl mx-auto">
              Building a network of 500+ People Centers across India, making civic engagement a cultural habit
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
            {[
              { value: '500+', label: 'People Centers by 2030', gradient: 'from-blue-400 to-cyan-400', delay: '0s' },
              { value: '10K+', label: 'Active Citizens', gradient: 'from-purple-400 to-pink-400', delay: '0.1s' },
              { value: '5K+', label: 'Issues Resolved', gradient: 'from-green-400 to-teal-400', delay: '0.2s' },
              { value: '200+', label: 'Community Events', gradient: 'from-orange-400 to-red-400', delay: '0.3s' }
            ].map((stat, idx) => (
              <div key={idx} className="scroll-reveal group" style={{transitionDelay: stat.delay}}>
                <div className={`text-5xl font-bold mb-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
                  {stat.value}
                </div>
                <div className="text-lg text-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              { icon: '🎯', title: 'Transparent Governance', desc: 'Open data and citizen reporting for accountability', delay: '0s' },
              { icon: '📚', title: 'Civic Education', desc: 'Participatory awareness and capacity building', delay: '0.1s' },
              { icon: '🚀', title: 'Data-Driven Solutions', desc: 'Decentralized, inclusive civic innovation', delay: '0.2s' }
            ].map((goal, idx) => (
              <div key={idx} className="scroll-reveal-zoom bg-white/10 backdrop-blur rounded-xl p-6 hover:bg-white/20 transition-all duration-300" style={{transitionDelay: goal.delay}}>
                <div className="text-3xl mb-3">{goal.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{goal.title}</h3>
                <p className="text-blue-200 text-sm">{goal.desc}</p>
              </div>
            ))}
          </div>
          
          {/* Roadmap Link */}
          <div className="text-center mt-12">
            <Link to="/roadmap">
              <Button variant="outline" size="lg" className="bg-white/10 backdrop-blur text-white border-white/30 hover:bg-white/20 px-8 py-3 text-base">
                View Full Roadmap →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <PhilosophySection />

      {/* Benefits Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="scroll-reveal-left">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                People-Centric Governance
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Transforming civic participation from one-way communication to a two-way ecosystem of dialogue, technology, and community action.
              </p>
              <div className="space-y-4">
                {[
                  { icon: '🗳️', title: 'Civic Participation as a Public Right', desc: 'Every citizen has an accessible channel to voice, contribute, and participate', gradient: 'from-blue-500 to-indigo-600', delay: '0s' },
                  { icon: '🔍', title: 'Transparency as Public Culture', desc: 'Openness and accountability are integral civic values, not optional', gradient: 'from-purple-500 to-pink-600', delay: '0.1s' },
                  { icon: '💻', title: 'Technology as Civic Enabler', desc: 'Digital tools democratize access without creating elitism', gradient: 'from-green-500 to-teal-600', delay: '0.2s' },
                  { icon: '🏘️', title: 'Lokarpana - Civic Ownership', desc: 'Citizens as co-owners of public institutions and civic processes', gradient: 'from-orange-500 to-red-600', delay: '0.3s' }
                ].map((benefit, idx) => (
                  <div key={idx} className="scroll-reveal flex items-start gap-4 group cursor-pointer" style={{transitionDelay: benefit.delay}}>
                    <div className={`w-12 h-12 bg-gradient-to-br ${benefit.gradient} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-2xl">{benefit.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative scroll-reveal-right">
              <div className="aspect-square bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden relative group">
                <div className="absolute inset-0">
                  <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/20 rounded-full animate-float"></div>
                  <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-white/20 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
                  <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-white/20 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
                </div>
                <div className="text-white text-center p-8 relative z-10">
                  <div className="text-7xl mb-6 group-hover:scale-110 transition-transform duration-300">🏛️</div>
                  <h3 className="text-3xl font-bold mb-3">Your Community</h3>
                  <p className="text-xl text-white/90 mb-4">Your Voice</p>
                  <div className="flex justify-center gap-4 text-4xl">
                    <span className="animate-float">👥</span>
                    <span className="animate-float" style={{animationDelay: '0.5s'}}>💬</span>
                    <span className="animate-float" style={{animationDelay: '1s'}}>🌟</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center scroll-reveal-zoom">
            <div className="text-5xl mb-6">🎯</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Our Mission</h2>
            <p className="text-xl text-gray-700 leading-relaxed italic border-l-4 border-blue-600 pl-6 py-4 bg-blue-50 rounded-r-lg">
              "To democratize civic participation by creating inclusive, technology-enabled, and ethically grounded public spaces where citizens, institutions, and communities collaborate for social progress and governance accountability."
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white animate-fade-in">
            Join the Civic Revolution
          </h2>
          <p className="text-xl md:text-2xl mb-10 text-blue-100 animate-fade-in stagger-1 max-w-2xl mx-auto">
            Be part of a movement transforming governance through Dharma, Seva, and Sangha
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/register">
              <Button size="lg" variant="secondary" className="text-lg px-12 py-6 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 animate-fade-in stagger-2 bg-white text-blue-600 hover:bg-gray-50">
                Create Your Account →
              </Button>
            </Link>
            <Link to="/issues">
              <Button size="lg" variant="outline" className="text-lg px-12 py-6 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 animate-fade-in stagger-3 bg-white/10 backdrop-blur text-white border-white/30 hover:bg-white/20">
                Browse Issues
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home
