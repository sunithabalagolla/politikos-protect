import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import Footer from '../components/Footer'
import { useScrollReveal } from '../hooks/useScrollReveal'
import api from '../services/api'

const Governance = () => {
  useScrollReveal()
  const [councilMembers, setCouncilMembers] = useState([])
  const [recentDecisions, setRecentDecisions] = useState([])
  const [metrics, setMetrics] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGovernanceData()
  }, [])

  const fetchGovernanceData = async () => {
    try {
      setLoading(true)
      const [membersRes, decisionsRes, metricsRes] = await Promise.all([
        api.get('/governance/council'),
        api.get('/governance/decisions?limit=5'),
        api.get('/governance/metrics')
      ])
      
      setCouncilMembers(membersRes.members || [])
      setRecentDecisions(decisionsRes.decisions || [])
      setMetrics(metricsRes.metrics || null)
    } catch (error) {
      console.error('Failed to fetch governance data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZjY2MDAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bTAtMTBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="scroll-reveal text-6xl mb-6">🏛️</div>
            <h1 className="scroll-reveal text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
              Sangha Neeti
            </h1>
            <p className="scroll-reveal text-xl md:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-4">
              Collective Governance and Ethical Accountability
            </p>
            <p className="scroll-reveal text-lg text-gray-600 max-w-2xl mx-auto">
              Our ethical system through which power and responsibility are distributed democratically
            </p>
          </div>
        </div>
      </section>

      {/* Collective Governance Principle */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="scroll-reveal text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Collective Governance
            </h2>
            <p className="scroll-reveal text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
              Ensuring no individual or department can dominate institutional decision-making
            </p>

            <div className="scroll-reveal bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 md:p-12 mb-12">
              <div className="text-center mb-8">
                <div className="text-5xl mb-4">⚖️</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Distributed Power & Responsibility</h3>
                <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                  All strategic decisions pass through <span className="font-bold text-orange-600">Sangha Review</span>, 
                  a structured participatory process that nurtures institutional resilience and minimizes risks of bias, corruption, or inefficiency.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { icon: '👥', title: 'Executive Team', desc: 'Leadership and strategic oversight' },
                  { icon: '🏘️', title: 'Community Representatives', desc: 'Voice of local citizens' },
                  { icon: '🎓', title: 'Subject Matter Experts', desc: 'Technical and domain expertise' },
                  { icon: '🤝', title: 'Volunteers & Civic Fellows', desc: 'Ground-level implementation' }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">{item.icon}</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">{item.title}</h4>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decision-Making Process */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="scroll-reveal text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Decision-Making Process
            </h2>
            <p className="scroll-reveal text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
              Three-Stage Approval Pathway ensuring consensus and transparency
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  stage: '01',
                  title: 'Deliberation',
                  desc: 'Proposal prepared and discussed in relevant councils',
                  icon: '💭',
                  color: 'from-blue-500 to-indigo-600'
                },
                {
                  stage: '02',
                  title: 'Consensus',
                  desc: 'At least 70% agreement among council members required',
                  icon: '🤝',
                  color: 'from-orange-500 to-red-600'
                },
                {
                  stage: '03',
                  title: 'Documentation',
                  desc: 'Decision recorded, justified, and publicly disclosed',
                  icon: '📋',
                  color: 'from-green-500 to-teal-600'
                }
              ].map((item, idx) => (
                <div key={idx} className="scroll-reveal-zoom relative" style={{transitionDelay: `${idx * 0.15}s`}}>
                  <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full">
                    <div className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl`}>
                      <span className="text-4xl">{item.icon}</span>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-gray-400 mb-2">STAGE {item.stage}</div>
                      <h3 className="text-2xl font-bold mb-4 text-gray-900">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                  {/* Arrow connector */}
                  {idx < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <div className="w-8 h-1 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full relative">
                        <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-400 rounded-full"></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="scroll-reveal text-center">
              <div className="bg-white rounded-2xl p-8 shadow-lg max-w-3xl mx-auto">
                <p className="text-lg font-semibold text-gray-900">
                  <span className="text-orange-600">Consensus ensures inclusion</span> • <span className="text-red-600">Documentation ensures traceability</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Transparency Metrics */}
      {metrics && (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-orange-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="scroll-reveal text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Live Transparency Dashboard
              </h2>
              <p className="scroll-reveal text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
                Real-time governance metrics showing our commitment to transparency
              </p>

              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="scroll-reveal bg-white rounded-2xl p-6 shadow-lg text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{metrics.totalDecisions}</div>
                  <p className="text-gray-600">Total Decisions</p>
                </div>
                <div className="scroll-reveal bg-white rounded-2xl p-6 shadow-lg text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">{metrics.approvedDecisions}</div>
                  <p className="text-gray-600">Approved</p>
                </div>
                <div className="scroll-reveal bg-white rounded-2xl p-6 shadow-lg text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">{metrics.pendingDecisions}</div>
                  <p className="text-gray-600">Pending</p>
                </div>
                <div className="scroll-reveal bg-white rounded-2xl p-6 shadow-lg text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">{metrics.avgConsensusRate}</div>
                  <p className="text-gray-600">Avg Consensus</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Current Sangha Council */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="scroll-reveal text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Current Sangha Council
            </h2>
            <p className="scroll-reveal text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
              Meet our current Local Sangha Council members
            </p>

            {loading && (
              <div className="text-center py-8">
                <p className="text-gray-600">Loading council members...</p>
              </div>
            )}

            {!loading && councilMembers.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {councilMembers.map((member, idx) => (
                  <div key={member._id} className="scroll-reveal bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300" style={{transitionDelay: `${idx * 0.1}s`}}>
                    <div className="text-center">
                      {member.photo ? (
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                        />
                      ) : (
                        <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-2xl text-white font-bold">
                            {member.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                      <p className="text-sm font-semibold text-orange-600 mb-2">{member.role}</p>
                      <p className="text-xs text-gray-500 mb-3">Term: {member.term}</p>
                      {member.bio && (
                        <p className="text-sm text-gray-600 leading-relaxed">{member.bio}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && councilMembers.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-600">Council members will be displayed here once appointed.</p>
              </div>
            )}

            {/* Council Structure Info */}
            <div className="scroll-reveal bg-gradient-to-br from-red-50 to-pink-50 rounded-3xl p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="text-5xl mb-4">🏛️</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">7-Member Representative Structure</h3>
                <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto mb-6">
                  Each People Center maintains a Local Sangha Council (LSC) that convenes monthly to review center performance, 
                  citizen issues, and outreach initiatives.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {[
                  { icon: '👩‍💼', title: '2 Women Representatives', desc: 'Ensuring gender representation', color: 'from-pink-500 to-rose-600' },
                  { icon: '👨‍🎓', title: '2 Youth Members', desc: 'Voice of younger generation', color: 'from-blue-500 to-indigo-600' },
                  { icon: '💼', title: '1 Local Business Leader', desc: 'Economic perspective', color: 'from-green-500 to-teal-600' },
                  { icon: '🎓', title: '1 NGO/Academic Rep', desc: 'Civil society expertise', color: 'from-purple-500 to-violet-600' },
                  { icon: '🤝', title: '1 Civic Volunteer Lead', desc: 'Community engagement', color: 'from-orange-500 to-red-600' },
                  { icon: '⚙️', title: '1 PPC Coordinator', desc: 'Convener and facilitator', color: 'from-gray-500 to-slate-600' }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                    <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <span className="text-3xl">{item.icon}</span>
                    </div>
                    <div className="text-center">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl p-6 border-l-4 border-red-600">
                <p className="text-lg font-semibold text-gray-900 text-center">
                  Monthly convening ensures <span className="text-red-600">continuous oversight</span> and <span className="text-orange-600">community accountability</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Governance Activity */}
      {recentDecisions.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-red-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="scroll-reveal text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Recent Governance Activity
              </h2>
              <p className="scroll-reveal text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
                Latest decisions and proposals in our democratic process
              </p>

              <div className="space-y-6">
                {recentDecisions.map((decision, idx) => (
                  <div key={decision._id} className="scroll-reveal bg-white rounded-2xl p-6 shadow-lg" style={{transitionDelay: `${idx * 0.1}s`}}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{decision.title}</h3>
                        <p className="text-sm text-gray-600">
                          Proposed by {decision.proposedBy} • {new Date(decision.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          decision.status === 'Approved' ? 'bg-green-100 text-green-800' :
                          decision.status === 'In Deliberation' ? 'bg-yellow-100 text-yellow-800' :
                          decision.status === 'Voting' ? 'bg-purple-100 text-purple-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {decision.status}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {decision.stage}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">{decision.description}</p>
                    {decision.consensusRate > 0 && (
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">
                          Consensus Rate: <span className="font-bold text-green-600">{decision.consensusRate}%</span>
                        </span>
                        {decision.totalVotes > 0 && (
                          <span className="text-sm text-gray-600">
                            Votes: {decision.votesFor} for, {decision.votesAgainst} against
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Accountability & Transparency Systems */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-red-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="scroll-reveal text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Accountability Systems
            </h2>
            <p className="scroll-reveal text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
              Creating a living transparency ecosystem — governance by the people, in the public eye
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {[
                {
                  icon: '📊',
                  title: 'Quarterly Performance Audits',
                  desc: 'Independent panels review center operations and outcomes',
                  color: 'from-blue-500 to-indigo-600'
                },
                {
                  icon: '💰',
                  title: 'Open Budget Review',
                  desc: 'Citizens participate in transparent financial oversight',
                  color: 'from-green-500 to-teal-600'
                },
                {
                  icon: '📱',
                  title: 'Digital Dashboards',
                  desc: 'Real-time publishing of center metrics and performance data',
                  color: 'from-purple-500 to-violet-600'
                },
                {
                  icon: '📋',
                  title: 'Community Scorecards',
                  desc: 'Citizens evaluate and rate PPC services and effectiveness',
                  color: 'from-orange-500 to-red-600'
                }
              ].map((item, idx) => (
                <div key={idx} className="scroll-reveal bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300" style={{transitionDelay: `${idx * 0.1}s`}}>
                  <div className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                    <span className="text-4xl">{item.icon}</span>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="scroll-reveal text-center">
              <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Living Transparency Ecosystem</h3>
                <p className="text-xl leading-relaxed max-w-3xl mx-auto">
                  Through Sangha Neeti, we create governance that is truly <span className="font-bold">by the people</span>, 
                  <span className="font-bold"> for the people</span>, and <span className="font-bold">in the public eye</span> — 
                  ensuring every decision serves the collective good.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="scroll-reveal text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Participate in Governance
            </h2>
            <p className="scroll-reveal text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join our democratic process and help shape the future of civic engagement
            </p>
            <div className="scroll-reveal flex gap-4 justify-center flex-wrap">
              <Link to="/register">
                <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                  Join Our Community →
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-orange-600 text-orange-600 hover:bg-orange-50">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Governance