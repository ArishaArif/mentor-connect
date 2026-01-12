import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { SocialLoginButtons } from '@/components/auth/SocialLoginButtons';
import { Divider } from '@/components/auth/Divider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';
import { Eye, EyeOff, ArrowLeft, Mail, CheckCircle } from 'lucide-react';

type AuthMode = 'login' | 'signup' | 'forgot-password' | 'email-sent';

export default function Auth() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<UserRole>('student');
  const [error, setError] = useState('');
  
  const { login, signup, resetPassword, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (mode === 'login') {
        await login(email, password);
        navigate('/dashboard');
      } else if (mode === 'signup') {
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        if (password.length < 8) {
          setError('Password must be at least 8 characters');
          return;
        }
        await signup(email, password, role);
        navigate('/onboarding');
      } else if (mode === 'forgot-password') {
        await resetPassword(email);
        setMode('email-sent');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  const getContent = () => {
    switch (mode) {
      case 'login':
        return {
          title: 'Welcome back',
          subtitle: 'Sign in to continue your mentorship journey',
        };
      case 'signup':
        return {
          title: 'Create your account',
          subtitle: 'Start connecting with mentors today',
        };
      case 'forgot-password':
        return {
          title: 'Reset password',
          subtitle: 'Enter your email to receive a reset link',
        };
      case 'email-sent':
        return {
          title: 'Check your email',
          subtitle: `We've sent a password reset link to ${email}`,
        };
      default:
        return { title: '', subtitle: '' };
    }
  };

  const { title, subtitle } = getContent();

  return (
    <AuthLayout title={title} subtitle={subtitle}>
      <AnimatePresence mode="wait">
        {mode === 'email-sent' ? (
          <motion.div
            key="email-sent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-8"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-success/10 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <p className="text-muted-foreground mb-6">
              Click the link in the email to reset your password. 
              Don't forget to check your spam folder.
            </p>
            <Button
              variant="ghost"
              onClick={() => setMode('login')}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to login
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key={mode}
            initial={{ opacity: 0, x: mode === 'login' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: mode === 'login' ? 20 : -20 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {mode !== 'forgot-password' && (
              <>
                <SocialLoginButtons />
                <Divider />
              </>
            )}

            {mode === 'forgot-password' && (
              <Button
                type="button"
                variant="ghost"
                onClick={() => setMode('login')}
                className="mb-4 gap-2 -ml-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to login
              </Button>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {mode !== 'forgot-password' && (
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {mode === 'signup' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>I am a...</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <RoleButton
                        selected={role === 'student'}
                        onClick={() => setRole('student')}
                        emoji="🎓"
                        label="Student/Seeker"
                        description="Looking for guidance"
                      />
                      <RoleButton
                        selected={role === 'alumni' || role === 'mentor'}
                        onClick={() => setRole('alumni')}
                        emoji="🌟"
                        label="Alumni/Mentor"
                        description="Ready to guide others"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-destructive text-sm"
              >
                {error}
              </motion.p>
            )}

            {mode === 'login' && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setMode('forgot-password')}
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5\" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Processing...
                </span>
              ) : mode === 'login' ? (
                'Sign in'
              ) : mode === 'signup' ? (
                'Create account'
              ) : (
                'Send reset link'
              )}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              {mode === 'login' ? (
                <>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('signup')}
                    className="text-primary font-medium hover:underline"
                  >
                    Sign up
                  </button>
                </>
              ) : mode === 'signup' ? (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="text-primary font-medium hover:underline"
                  >
                    Sign in
                  </button>
                </>
              ) : null}
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </AuthLayout>
  );
}

interface RoleButtonProps {
  selected: boolean;
  onClick: () => void;
  emoji: string;
  label: string;
  description: string;
}

function RoleButton({ selected, onClick, emoji, label, description }: RoleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
        selected
          ? 'border-primary bg-primary/5 shadow-glow'
          : 'border-border hover:border-primary/50 hover:bg-secondary/50'
      }`}
    >
      <span className="text-2xl block mb-2">{emoji}</span>
      <span className="font-medium block text-sm">{label}</span>
      <span className="text-xs text-muted-foreground">{description}</span>
    </button>
  );
}
