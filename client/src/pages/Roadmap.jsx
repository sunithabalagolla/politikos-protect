import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import Footer from '../components/Footer'

const Roadmap = () => {
  const phases = [
    {
      title: 'Short-Term',
      period: '1-2 Years',
      color: 'from-blue-500 to-indigo-600',
      icon: '🚀',
      goals: [
        'Establish pilot centers and finalize institutional SOPs',
        'Launch training programs for staff, volunteers, and civic fellows',
        'Integrate PPC operations with the Politikos digital ecosystem'
      ]
    },
    {
      title: 'Medium-Term',
      period: '3-5 Years',
      color: 'from-purple-500 to-pink-600',
      icon: '📈',
      goals: [
        'Scale PPC presence regionally',
        'Build community partnerships and strengthen volunteer base',
        'Launch civic data dashboards for transparency and feedback'
      ]
    },
    {
      title: 'Long-Term',
      period: '5+ Years',
      color: 'from-green-500 to-teal-600',
      icon: '🎯',
      goals: [
        'Institutionalize PPC as a permanent civic platform within regional planning',
        'Develop academic and policy collaborations',
        'Establish a national Civic Research and Leadership Academy under PPC'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Roadmap to 2030</h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Building a network of 500+ People Centers across India, making civic engagement a cultural habit
            </p>
            <Link to="/">
              <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-50">
                ← Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-5xl mb-6">🎯</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Our Mission</h2>
            <p className="text-xl text-gray-700 leading-relaxed italic border-l-4 border-blue-600 pl-6 py-4 bg-blue-50 rounded-r-lg">
              "To democratize civic participation by creating inclusive, technology-enabled, and ethically grounded public spaces where citizens, institutions, and communities collaborate for social progress and governance accountability."
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Our Journey
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg">
            A phased approach to transforming civic engagement
          </p>

          <div className="max-w-6xl mx-auto space-y-12">
            {phases.map((phase, index) => (
              <div key={index} className="relative">
                {/* Timeline connector */}
                {index < phases.length - 1 && (
                  <div className="hidden md:block absolute left-1/2 top-full h-12 w-1 bg-gradient-to-b from-gray-300 to-transparent transform -translate-x-1/2"></div>
                )}

                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 hover:shadow-2xl transition-all duration-300">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
                    <div className={`w-20 h-20 bg-gradient-to-br ${phase.color} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <span className="text-4xl">{phase.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-3xl font-bold text-gray-900 mb-2">{phase.title}</h3>
                      <p className={`text-lg font-semibold bg-gradient-to-r ${phase.color} bg-clip-text text-transparent`}>
                        {phase.period}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {phase.goals.map((goal, goalIndex) => (
                      <div key={goalIndex} className="flex items-start gap-4 group">
                        <div className={`w-8 h-8 bg-gradient-to-br ${phase.color} rounded-lg flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300`}>
                          <span className="text-white font-bold text-sm">✓</span>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-lg">{goal}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision 2030 Stats */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Vision 2030 Targets
          </h2>
          <p className="text-xl text-blue-200 text-center mb-12 max-w-3xl mx-auto">
            Our ambitious goals for transforming civic engagement across India
          </p>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: '500+', label: 'People Centers', gradient: 'from-blue-400 to-cyan-400' },
              { value: '10K+', label: 'Active Citizens', gradient: 'from-purple-400 to-pink-400' },
              { value: '5K+', label: 'Issues Resolved', gradient: 'from-green-400 to-teal-400' },
              { value: '200+', label: 'Community Events', gradient: 'from-orange-400 to-red-400' }
            ].map((stat, idx) => (
              <div key={idx} className="group">
                <div className={`text-5xl font-bold mb-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
                  {stat.value}
                </div>
                <div className="text-lg text-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">Join Us on This Journey</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Be part of the movement transforming civic engagement in India
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/register">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 text-lg">
                Get Started →
              </Button>
            </Link>
            <Link to="/">
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Roadmap
