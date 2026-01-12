import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Calendar, 
  CheckCircle, 
  MessageCircle, 
  Sparkles, 
  Star,
  Users,
  Zap,
  Shield,
  Award
} from 'lucide-react';

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="font-display text-2xl font-bold text-gradient">
              MentorMatch
            </h1>
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={() => navigate('/auth')}>
                Sign In
              </Button>
              <Button variant="hero" onClick={() => navigate('/auth')}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute top-40 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="secondary" className="mb-6 px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Mentorship Matching
            </Badge>
            
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
              Find Your Perfect
              <span className="text-gradient block">Career Mentor</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connect with industry experts who've walked your path. 
              Get personalized guidance to accelerate your career growth.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                variant="hero" 
                size="xl" 
                onClick={() => navigate('/auth')}
                className="w-full sm:w-auto"
              >
                Start Matching
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/auth')}
                className="w-full sm:w-auto"
              >
                Become a Mentor
              </Button>
            </div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-6 text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-sm">10,000+ Users</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-warning fill-warning" />
                <span className="text-sm">4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-success" />
                <span className="text-sm">Verified Mentors</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Floating cards preview */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-16 relative"
          >
            <div className="max-w-4xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <ProfilePreviewCard 
                name="Sarah Chen"
                role="Senior Engineer @ Google"
                matchScore={95}
                delay={0}
              />
              <ProfilePreviewCard 
                name="Michael Rodriguez"
                role="Tech Lead @ Meta"
                matchScore={88}
                delay={0.1}
                className="hidden sm:block"
              />
              <ProfilePreviewCard 
                name="Emily Watson"
                role="Data Scientist @ Netflix"
                matchScore={82}
                delay={0.2}
                className="hidden lg:block"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Everything You Need to Grow
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From smart matching to seamless scheduling, we've got you covered
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={Sparkles}
              title="Smart Matching"
              description="AI-powered algorithm matches you with mentors based on your goals, skills, and interests"
              delay={0}
            />
            <FeatureCard
              icon={Calendar}
              title="Easy Scheduling"
              description="Book sessions with a few clicks. Auto-sync with Google Calendar and Zoom"
              delay={0.1}
            />
            <FeatureCard
              icon={MessageCircle}
              title="Real-time Chat"
              description="Stay connected with your mentor through our built-in messaging system"
              delay={0.2}
            />
            <FeatureCard
              icon={Award}
              title="Verified Profiles"
              description="All mentors are verified professionals with proven track records"
              delay={0.3}
            />
            <FeatureCard
              icon={Zap}
              title="Quick Sessions"
              description="15-minute lightning sessions for quick questions and guidance"
              delay={0.4}
            />
            <FeatureCard
              icon={Shield}
              title="Privacy First"
              description="Your data is encrypted and protected. We never sell your information"
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground">
              Get started in three simple steps
            </p>
          </motion.div>

          <div className="space-y-8">
            <StepCard
              number="1"
              title="Create Your Profile"
              description="Tell us about your background, skills, and career goals. Our AI will use this to find your perfect match."
              delay={0}
            />
            <StepCard
              number="2"
              title="Get Matched"
              description="Browse through curated mentor recommendations. View their profiles, expertise, and reviews before connecting."
              delay={0.1}
            />
            <StepCard
              number="3"
              title="Start Growing"
              description="Schedule sessions, chat with your mentor, and track your progress. Watch your career take off!"
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="container max-w-4xl mx-auto"
        >
          <div className="gradient-primary rounded-3xl p-8 sm:p-12 text-center text-primary-foreground relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
            
            <div className="relative z-10">
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
                Join thousands of professionals who've accelerated their careers with MentorMatch
              </p>
              <Button 
                variant="secondary" 
                size="xl"
                onClick={() => navigate('/auth')}
                className="bg-white text-primary hover:bg-white/90"
              >
                Get Started for Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 MentorMatch. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ProfilePreviewCard({ 
  name, 
  role, 
  matchScore, 
  delay,
  className = ''
}: { 
  name: string; 
  role: string; 
  matchScore: number; 
  delay: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 + delay, duration: 0.5 }}
      className={`bg-card border border-border rounded-2xl p-4 shadow-elevated ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
          {name.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold">{name}</h4>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
        <Badge variant="default" className="shadow-glow">
          {matchScore}%
        </Badge>
      </div>
      <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
        <Star className="w-4 h-4 text-warning fill-warning" />
        <span>4.9</span>
        <span>•</span>
        <span>47 sessions</span>
      </div>
    </motion.div>
  );
}

function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  delay 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string; 
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="bg-card border border-border rounded-2xl p-6 hover:shadow-elevated transition-shadow duration-300"
    >
      <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground mb-4">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="font-display text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </motion.div>
  );
}

function StepCard({ 
  number, 
  title, 
  description, 
  delay 
}: { 
  number: string; 
  title: string; 
  description: string; 
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="flex gap-6 items-start"
    >
      <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-xl flex-shrink-0">
        {number}
      </div>
      <div className="flex-1 pt-2">
        <h3 className="font-display text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
}