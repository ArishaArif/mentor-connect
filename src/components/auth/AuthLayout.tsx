import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        
        <div className="relative z-10 flex flex-col justify-center px-12 text-primary-foreground">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-5xl font-bold mb-4">
              MentorMatch
            </h1>
            <p className="text-xl opacity-90 max-w-md leading-relaxed">
              Connect with mentors who've walked your path. Build relationships that accelerate your career.
            </p>
          </motion.div>

          <motion.div 
            className="mt-12 space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <FeatureItem 
              icon="🎯" 
              title="Smart Matching" 
              description="AI-powered algorithm finds your perfect mentor match"
            />
            <FeatureItem 
              icon="📅" 
              title="Easy Scheduling" 
              description="Seamless calendar integration for sessions"
            />
            <FeatureItem 
              icon="🚀" 
              title="Career Growth" 
              description="Track your progress and achieve your goals"
            />
          </motion.div>
        </div>

        {/* Decorative circles */}
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-12 bg-background">
        <div className="mx-auto w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Mobile logo */}
            <div className="lg:hidden mb-8 text-center">
              <h1 className="font-display text-3xl font-bold text-gradient">
                MentorMatch
              </h1>
            </div>

            <div className="mb-8">
              <h2 className="font-display text-3xl font-bold text-foreground">
                {title}
              </h2>
              <p className="mt-2 text-muted-foreground">
                {subtitle}
              </p>
            </div>

            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="flex items-start gap-4">
      <span className="text-2xl">{icon}</span>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm opacity-80">{description}</p>
      </div>
    </div>
  );
}
