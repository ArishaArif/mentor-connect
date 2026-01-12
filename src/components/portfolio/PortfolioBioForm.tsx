import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Linkedin, 
  Github, 
  Twitter, 
  Globe,
  BookOpen,
  Sparkles,
  Quote
} from 'lucide-react';

interface PortfolioBioFormProps {
  headline: string;
  setHeadline: (headline: string) => void;
  bio: string;
  setBio: (bio: string) => void;
  socialLinks: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
    blog?: string;
  };
  setSocialLinks: (links: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
    blog?: string;
  }) => void;
}

const HEADLINE_SUGGESTIONS = [
  'Senior Software Engineer | Building scalable systems',
  'Full Stack Developer | React & Node.js Expert',
  'AI/ML Engineer | Turning data into insights',
  'Tech Lead | Mentoring the next generation of developers',
  'Cloud Architect | AWS & Kubernetes Specialist',
];

const BIO_PROMPTS = [
  'What drives you as a professional?',
  'What unique perspective do you bring?',
  'What are you most passionate about in tech?',
];

export function PortfolioBioForm({ 
  headline, 
  setHeadline, 
  bio, 
  setBio,
  socialLinks,
  setSocialLinks
}: PortfolioBioFormProps) {
  const [showHeadlineSuggestions, setShowHeadlineSuggestions] = useState(false);

  const updateSocialLink = (platform: keyof typeof socialLinks, value: string) => {
    setSocialLinks({ ...socialLinks, [platform]: value });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display text-2xl font-bold mb-2">Your Professional Story</h2>
        <p className="text-muted-foreground">Create a compelling introduction for your portfolio</p>
      </div>

      {/* Headline */}
      <div className="space-y-3">
        <Label htmlFor="headline" className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          Professional Headline
        </Label>
        <div className="relative">
          <Input
            id="headline"
            placeholder="e.g., Senior Engineer @ Google | Building the future of AI"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            onFocus={() => setShowHeadlineSuggestions(true)}
            className="pr-12"
            maxLength={100}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
            {headline.length}/100
          </span>
        </div>
        
        {showHeadlineSuggestions && !headline && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <p className="text-xs text-muted-foreground">Try one of these:</p>
            <div className="flex flex-wrap gap-2">
              {HEADLINE_SUGGESTIONS.map((suggestion, i) => (
                <Button
                  key={i}
                  variant="outline"
                  size="sm"
                  className="text-xs h-auto py-1.5"
                  onClick={() => {
                    setHeadline(suggestion);
                    setShowHeadlineSuggestions(false);
                  }}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Bio */}
      <div className="space-y-3">
        <Label htmlFor="bio" className="flex items-center gap-2">
          <Quote className="w-4 h-4 text-primary" />
          About You
        </Label>
        <div className="relative">
          <Textarea
            id="bio"
            placeholder="Share your story, experience, and what you're passionate about..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={5}
            maxLength={500}
            className="resize-none"
          />
          <span className="absolute right-3 bottom-3 text-xs text-muted-foreground">
            {bio.length}/500
          </span>
        </div>
        
        {!bio && (
          <Card className="bg-muted/50">
            <CardContent className="p-3">
              <p className="text-xs text-muted-foreground mb-2">Consider including:</p>
              <ul className="space-y-1">
                {BIO_PROMPTS.map((prompt, i) => (
                  <li key={i} className="text-xs flex items-start gap-2">
                    <span className="text-primary">•</span>
                    {prompt}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Social Links */}
      <div className="space-y-4">
        <Label className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-primary" />
          Social & Professional Links
        </Label>
        
        <div className="grid gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#0077B5]/10 flex items-center justify-center">
              <Linkedin className="w-5 h-5 text-[#0077B5]" />
            </div>
            <Input
              placeholder="LinkedIn profile URL"
              value={socialLinks.linkedin || ''}
              onChange={(e) => updateSocialLink('linkedin', e.target.value)}
              className="flex-1"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-foreground/10 flex items-center justify-center">
              <Github className="w-5 h-5" />
            </div>
            <Input
              placeholder="GitHub profile URL"
              value={socialLinks.github || ''}
              onChange={(e) => updateSocialLink('github', e.target.value)}
              className="flex-1"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#1DA1F2]/10 flex items-center justify-center">
              <Twitter className="w-5 h-5 text-[#1DA1F2]" />
            </div>
            <Input
              placeholder="Twitter/X profile URL"
              value={socialLinks.twitter || ''}
              onChange={(e) => updateSocialLink('twitter', e.target.value)}
              className="flex-1"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Globe className="w-5 h-5 text-primary" />
            </div>
            <Input
              placeholder="Personal website URL"
              value={socialLinks.website || ''}
              onChange={(e) => updateSocialLink('website', e.target.value)}
              className="flex-1"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-accent" />
            </div>
            <Input
              placeholder="Blog or Medium URL"
              value={socialLinks.blog || ''}
              onChange={(e) => updateSocialLink('blog', e.target.value)}
              className="flex-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
