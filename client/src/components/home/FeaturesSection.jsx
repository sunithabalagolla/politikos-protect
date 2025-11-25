import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

const FeaturesSection = () => {
  const features = [
    {
      icon: '📝',
      title: 'Report Civic Issues',
      description: 'Document and track community problems',
      details: 'Report infrastructure issues, safety concerns, and other civic matters. Track their progress from submission to resolution.',
      benefits: ['Photo documentation', 'Real-time tracking', 'Community voting'],
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      icon: '📅',
      title: 'Community Events',
      description: 'Stay informed and get involved',
      details: 'Discover town halls, workshops, and community meetings. Register for events and participate in civic activities.',
      benefits: ['Event calendar', 'Easy registration', 'Reminders & updates'],
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: '📊',
      title: 'Share Your Voice',
      description: 'Participate in community surveys',
      details: 'Provide feedback on community initiatives and help shape local policies through surveys and polls.',
      benefits: ['Anonymous responses', 'View results', 'Impact tracking'],
      gradient: 'from-green-500 to-teal-600'
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 animate-fade-in bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          People Center Features
        </h2>
        <p className="text-center text-gray-600 mb-16 text-lg animate-fade-in stagger-1">
          Your gateway to empowered citizenship
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className={`hover-lift animate-fade-in stagger-${index + 1} border-0 shadow-xl bg-white hover:shadow-2xl transition-all duration-300 group`}>
              <CardHeader>
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-3xl">{feature.icon}</span>
                </div>
                <CardTitle className="text-2xl">{feature.title}</CardTitle>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {feature.details}
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-green-500">✓</span> {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
