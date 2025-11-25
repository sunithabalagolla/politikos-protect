import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

const EcosystemSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          The Politikos Ecosystem
        </h2>
        <p className="text-center text-gray-600 mb-16 text-lg">
          A tri-layered architecture for civic transformation
        </p>
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <Card className="hover-lift border-0 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-2xl transition-all duration-300 group">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <span className="text-4xl">📰</span>
              </div>
              <CardTitle className="text-2xl">Information Layer</CardTitle>
              <CardDescription className="text-base font-semibold text-blue-600">
                Politikos Media & Studio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                Awareness and news dissemination through media channels, amplifying civic stories and policy dialogues.
              </p>
            </CardContent>
          </Card>

          <Card className="hover-lift border-0 shadow-xl bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-2xl transition-all duration-300 group">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <span className="text-4xl">🏛️</span>
              </div>
              <CardTitle className="text-2xl">Engagement Layer</CardTitle>
              <CardDescription className="text-base font-semibold text-purple-600">
                People Center (You are here)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                Physical-digital hybrid hubs facilitating citizen participation, dialogue, and community action.
              </p>
            </CardContent>
          </Card>

          <Card className="hover-lift border-0 shadow-xl bg-gradient-to-br from-green-50 to-teal-50 hover:shadow-2xl transition-all duration-300 group">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <span className="text-4xl">🔬</span>
              </div>
              <CardTitle className="text-2xl">Innovation Layer</CardTitle>
              <CardDescription className="text-base font-semibold text-green-600">
                Politikos Media Lab
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                AI-driven civic-tech tools, analytics dashboards, and innovative solutions for governance.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default EcosystemSection
