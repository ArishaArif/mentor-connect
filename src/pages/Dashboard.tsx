import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Bell,
  Calendar,
  ChevronRight,
  Heart,
  LogOut,
  MessageCircle,
  Search,
  Settings,
  Sparkles,
  Star,
  User,
  Users,
  X,
  Check,
} from 'lucide-react';

const SAMPLE_MATCHES = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Senior Engineer @ Google',
    matchScore: 95,
    skills: ['Machine Learning', 'Python', 'TensorFlow'],
    avatar: 'SC',
    rating: 4.9,
    sessions: 47,
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    role: 'Tech Lead @ Meta',
    matchScore: 88,
    skills: ['System Design', 'React', 'Node.js'],
    avatar: 'MR',
    rating: 4.8,
    sessions: 32,
  },
  {
    id: '3',
    name: 'Emily Watson',
    role: 'Data Scientist @ Netflix',
    matchScore: 82,
    skills: ['Data Science', 'SQL', 'Visualization'],
    avatar: 'EW',
    rating: 4.7,
    sessions: 28,
  },
];

const UPCOMING_SESSIONS = [
  {
    id: '1',
    mentorName: 'Sarah Chen',
    date: 'Tomorrow',
    time: '2:00 PM',
    topic: 'ML Career Path Discussion',
  },
  {
    id: '2',
    mentorName: 'Michael Rodriguez',
    date: 'Wed, Jan 15',
    time: '4:30 PM',
    topic: 'System Design Interview Prep',
  },
];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const profileCompletion = 75;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="font-display text-xl font-bold text-gradient">MentorMatch</h1>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </Button>
              <Button variant="ghost" size="icon">
                <MessageCircle className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => navigate('/settings')}>
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={logout}>
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold">
              Welcome back! 👋
            </h2>
            <p className="text-muted-foreground mt-1">
              Ready to connect with mentors and grow your career?
            </p>
          </div>
          <Button variant="hero" className="gap-2 self-start">
            <Sparkles className="w-4 h-4" />
            Find Mentors
          </Button>
        </motion.div>

        {/* Profile Completion Alert */}
        {profileCompletion < 100 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-warning/30 bg-warning/5">
              <CardContent className="py-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-warning/20 flex items-center justify-center">
                    <User className="w-6 h-6 text-warning" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Complete your profile</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      A complete profile increases your match quality by 3x
                    </p>
                    <div className="flex items-center gap-3">
                      <Progress value={profileCompletion} className="flex-1 h-2" />
                      <span className="text-sm font-medium">{profileCompletion}%</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => navigate('/onboarding')}>
                    Continue
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Match Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-3 gap-4"
            >
              <StatCard icon={Users} label="Matches" value="12" color="primary" />
              <StatCard icon={Calendar} label="Sessions" value="5" color="success" />
              <StatCard icon={Star} label="Rating" value="4.8" color="warning" />
            </motion.div>

            {/* Top Matches */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg font-semibold">Top Matches</h3>
                <Button variant="ghost" size="sm" className="gap-1">
                  <Search className="w-4 h-4" />
                  Browse All
                </Button>
              </div>
              <div className="space-y-4">
                {SAMPLE_MATCHES.map((match, index) => (
                  <MatchCard key={match.id} match={match} delay={0.4 + index * 0.1} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Sessions & Quick Actions */}
          <div className="space-y-6">
            {/* Upcoming Sessions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Upcoming Sessions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {UPCOMING_SESSIONS.map((session) => (
                    <div
                      key={session.id}
                      className="p-3 rounded-lg bg-muted/50 border border-border"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-sm">{session.mentorName}</span>
                        <Badge variant="secondary" className="text-xs">
                          {session.date}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{session.topic}</p>
                      <p className="text-xs text-primary font-medium">{session.time}</p>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full" size="sm">
                    View All Sessions
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start gap-3">
                    <Search className="w-4 h-4" />
                    Find a Mentor
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-3">
                    <Calendar className="w-4 h-4" />
                    Schedule Session
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-3">
                    <User className="w-4 h-4" />
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ 
  icon: Icon, 
  label, 
  value, 
  color 
}: { 
  icon: React.ElementType; 
  label: string; 
  value: string; 
  color: 'primary' | 'success' | 'warning';
}) {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function MatchCard({ match, delay }: { match: typeof SAMPLE_MATCHES[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card className="overflow-hidden hover:shadow-elevated transition-shadow duration-300">
        <CardContent className="p-0">
          <div className="flex">
            {/* Match Score Indicator */}
            <div 
              className="w-2 gradient-primary"
              style={{ 
                opacity: match.matchScore / 100 
              }} 
            />
            
            <div className="flex-1 p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                    {match.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold">{match.name}</h4>
                    <p className="text-sm text-muted-foreground">{match.role}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-warning fill-warning" />
                        <span className="text-xs font-medium">{match.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        • {match.sessions} sessions
                      </span>
                    </div>
                  </div>
                </div>
                <Badge 
                  variant={match.matchScore >= 90 ? 'default' : 'secondary'}
                  className={match.matchScore >= 90 ? 'shadow-glow' : ''}
                >
                  {match.matchScore}% match
                </Badge>
              </div>

              <div className="flex flex-wrap gap-1 mt-3">
                {match.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1 gap-1">
                  <X className="w-4 h-4" />
                  Skip
                </Button>
                <Button variant="hero" size="sm" className="flex-1 gap-1">
                  <Heart className="w-4 h-4" />
                  Connect
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}