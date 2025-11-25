import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Users, 
  CheckCircle2, 
  Calendar,
  Sparkles,
  Shield,
  Heart,
  Globe
} from 'lucide-react';
import { Button } from '../ui/button';

const HeroSection = ({ user = null, isAdmin = false }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20,
        y: (e.clientY / window.innerHeight) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const stats = [
    { icon: Users, value: '1000+', label: 'Active Citizens', color: 'from-blue-500 to-cyan-500' },
    { icon: CheckCircle2, value: '500+', label: 'Issues Resolved', color: 'from-green-500 to-emerald-500' },
    { icon: Calendar, value: '50+', label: 'Events Hosted', color: 'from-purple-500 to-pink-500' }
  ];

  const features = [
    { icon: Shield, text: 'Dharma (Ethics)' },
    { icon: Heart, text: 'Seva (Service)' },
    { icon: Globe, text: 'Sangha (Community)' }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: 'transform 0.5s ease-out'
          }}
        />
        <div 
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(-${mousePosition.x}px, -${mousePosition.y}px)`,
            transition: 'transform 0.5s ease-out',
            animationDelay: '1s'
          }}
        />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" 
          style={{ animationDelay: '2s' }}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20 pb-32">
        <div className="max-w-6xl mx-auto">
          {/* Header Badge */}
          <div 
            className={`flex justify-center mb-8 transition-all duration-1000 transform ${
              isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
              <span className="text-sm text-blue-300 font-medium">Empowering Civic Participation</span>
            </div>
          </div>

          {/* Main Title */}
          <div 
            className={`text-center mb-8 transition-all duration-1000 delay-200 transform ${
              isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
            }`}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent animate-gradient">
                Welcome to
              </span>
              <br />
              <span className="text-white relative inline-block">
                Politikos
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-20 animate-pulse" />
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 font-light mb-4">
              People Center
            </p>
          </div>

          {/* Feature Pills */}
          <div 
            className={`flex flex-wrap justify-center gap-4 mb-8 transition-all duration-1000 delay-300 transform ${
              isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
            }`}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-blue-400/50 transition-all duration-300 cursor-default"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <feature.icon className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm text-gray-300 font-medium">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Description */}
          <p 
            className={`text-center text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12 transition-all duration-1000 delay-400 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            A civic-tech ecosystem bridging citizens, governance, and community action
          </p>

          {/* CTA Buttons */}
          <div 
            className={`flex flex-wrap justify-center gap-4 mb-20 transition-all duration-1000 delay-500 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button 
                    className="group relative px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-full shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60 transition-all duration-300 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Go to Dashboard
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                </Link>
                {isAdmin && (
                  <Link to="/admin">
                    <Button 
                      className="group px-8 py-4 text-lg font-semibold bg-white/5 border-2 border-purple-500/50 text-purple-300 hover:bg-purple-500/10 hover:border-purple-400 rounded-full backdrop-blur-sm transition-all duration-300"
                    >
                      <span className="flex items-center gap-2">
                        Admin Dashboard
                        <Shield className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                      </span>
                    </Button>
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link to="/register">
                  <Button 
                    className="group relative px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-full shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60 transition-all duration-300 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Get Started
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button 
                    className="group px-8 py-4 text-lg font-semibold bg-white/5 border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/40 rounded-full backdrop-blur-sm transition-all duration-300"
                  >
                    Login
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Stats Cards */}
          <div 
            className={`grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto transition-all duration-1000 delay-700 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-default overflow-hidden"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <stat.icon className={`w-10 h-10 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`} />
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${stat.color} animate-pulse`} />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2 group-hover:scale-105 transition-transform">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Indicator */}
          <div 
            className={`flex justify-center mt-20 transition-all duration-1000 delay-1000 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="flex flex-col items-center gap-2 animate-bounce">
              <span className="text-sm text-gray-400">Scroll to explore</span>
              <div className="w-6 h-10 rounded-full border-2 border-gray-400/50 flex justify-center p-1">
                <div className="w-1.5 h-3 bg-gradient-to-b from-blue-400 to-transparent rounded-full animate-scroll" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(50px);
            opacity: 0;
          }
        }

        .animate-float {
          animation: float linear infinite;
        }

        @keyframes scroll {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(20px);
            opacity: 0;
          }
        }

        .animate-scroll {
          animation: scroll 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;