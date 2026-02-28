import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Upload, 
  X, 
  Sparkles,
  User,
  GraduationCap,
  Briefcase,
  Award,
  Heart,
  Linkedin,
  FolderGit2,
  Code2,
  Trophy,
  Quote
} from 'lucide-react';
import { WorkExperienceForm } from '@/components/portfolio/WorkExperienceForm';
import { ProjectsForm } from '@/components/portfolio/ProjectsForm';
import { TechStackForm } from '@/components/portfolio/TechStackForm';
import { AchievementsForm } from '@/components/portfolio/AchievementsForm';
import { PortfolioBioForm } from '@/components/portfolio/PortfolioBioForm';
import type { WorkExperience, Project, Achievement, TechStack } from '@/types/portfolio';

const STEPS = [
  { id: 'basic', icon: User, label: 'Basic Info' },
  { id: 'academic', icon: GraduationCap, label: 'Academic' },
  { id: 'professional', icon: Briefcase, label: 'Professional' },
  { id: 'skills', icon: Award, label: 'Skills' },
  { id: 'interests', icon: Heart, label: 'Interests' },
];

const MENTOR_STEPS = [
  { id: 'bio', icon: Quote, label: 'Bio' },
  { id: 'basic', icon: User, label: 'Basic Info' },
  { id: 'experience', icon: Briefcase, label: 'Experience' },
  { id: 'projects', icon: FolderGit2, label: 'Projects' },
  { id: 'techstack', icon: Code2, label: 'Tech Stack' },
  { id: 'achievements', icon: Trophy, label: 'Achievements' },
  { id: 'mentoring', icon: Sparkles, label: 'Guidance' },
];

const DEPARTMENTS = [
  'Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 
  'Civil Engineering', 'Business Administration', 'Data Science',
  'Information Technology', 'Software Engineering', 'Mathematics',
];

const FIELDS = [
  'AI/Machine Learning', 'Web Development', 'Mobile Development',
  'Data Science', 'Cybersecurity', 'Cloud Computing', 'DevOps',
  'Blockchain', 'Game Development', 'UI/UX Design',
];

const DEGREES = ['BS', 'MS', 'PhD', 'MBA', 'BE', 'ME'];

const SKILLS_SUGGESTIONS = [
  'JavaScript', 'Python', 'React', 'Node.js', 'TypeScript', 'Java',
  'SQL', 'AWS', 'Docker', 'Kubernetes', 'Machine Learning', 'TensorFlow',
  'Data Analysis', 'Project Management', 'Agile', 'Git', 'Linux',
];

const INTEREST_CATEGORIES = [
  { id: 'ai', label: 'AI & Machine Learning', emoji: '🤖' },
  { id: 'web', label: 'Web Development', emoji: '🌐' },
  { id: 'mobile', label: 'Mobile Apps', emoji: '📱' },
  { id: 'data', label: 'Data Science', emoji: '📊' },
  { id: 'cloud', label: 'Cloud & DevOps', emoji: '☁️' },
  { id: 'security', label: 'Cybersecurity', emoji: '🔒' },
  { id: 'design', label: 'UI/UX Design', emoji: '🎨' },
  { id: 'startup', label: 'Startups', emoji: '🚀' },
  { id: 'research', label: 'Research', emoji: '🔬' },
  { id: 'career', label: 'Career Growth', emoji: '📈' },
];

interface Skill {
  name: string;
  proficiency: 'beginner' | 'intermediate' | 'expert';
}

export default function Onboarding() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isMentor = user?.role === 'alumni' || user?.role === 'mentor';
  const steps = isMentor ? MENTOR_STEPS : STEPS;
  
  const [currentStep, setCurrentStep] = useState(0);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    semester: '1',
    cgpa: 3.0,
    department: '',
    field: '',
    degree: 'BS',
    university: '',
    professionalStatus: 'student' as 'student' | 'intern' | 'employed',
    company: '',
    linkedInProfile: '',
    yearsOfExperience: 1,
    jobTitle: '',
    availabilityHours: 5,
    ageGroupPreference: [] as string[],
    experienceLevelPreference: [] as string[],
    preferredMentoringAreas: [] as string[],
  });
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [expertiseAreas, setExpertiseAreas] = useState<string[]>([]);
  
  // Mentor portfolio states
  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [techStacks, setTechStacks] = useState<TechStack[]>([]);
  const [headline, setHeadline] = useState('');
  const [bio, setBio] = useState('');
  const [socialLinks, setSocialLinks] = useState<{
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
    blog?: string;
  }>({});

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const addSkill = (skillName: string) => {
    if (skillName && !skills.find(s => s.name === skillName)) {
      setSkills([...skills, { name: skillName, proficiency: 'beginner' }]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillName: string) => {
    setSkills(skills.filter(s => s.name !== skillName));
  };

  const updateSkillProficiency = (skillName: string, proficiency: 'beginner' | 'intermediate' | 'expert') => {
    setSkills(skills.map(s => 
      s.name === skillName ? { ...s, proficiency } : s
    ));
  };

  const toggleInterest = (interestId: string) => {
    setInterests(prev => 
      prev.includes(interestId) 
        ? prev.filter(i => i !== interestId)
        : [...prev, interestId]
    );
  };

  const toggleExpertise = (area: string) => {
    if (expertiseAreas.includes(area)) {
      setExpertiseAreas(expertiseAreas.filter(a => a !== area));
    } else if (expertiseAreas.length < 5) {
      setExpertiseAreas([...expertiseAreas, area]);
    }
  };

  const renderStepContent = () => {
    const stepId = steps[currentStep].id;

    switch (stepId) {
      case 'bio':
        return <PortfolioBioForm 
          headline={headline}
          setHeadline={setHeadline}
          bio={bio}
          setBio={setBio}
          socialLinks={socialLinks}
          setSocialLinks={setSocialLinks}
        />;
      case 'basic':
        return <BasicInfoStep 
          formData={formData} 
          setFormData={setFormData}
          profilePicture={profilePicture}
          setProfilePicture={setProfilePicture}
        />;
      case 'academic':
        return <AcademicStep formData={formData} setFormData={setFormData} />;
      case 'professional':
        return <ProfessionalStep 
          formData={formData} 
          setFormData={setFormData}
          isMentor={isMentor}
        />;
      case 'experience':
        return <WorkExperienceForm 
          experiences={workExperiences} 
          setExperiences={setWorkExperiences} 
        />;
      case 'projects':
        return <ProjectsForm 
          projects={projects} 
          setProjects={setProjects} 
        />;
      case 'techstack':
        return <TechStackForm 
          techStacks={techStacks} 
          setTechStacks={setTechStacks} 
        />;
      case 'achievements':
        return <AchievementsForm 
          achievements={achievements} 
          setAchievements={setAchievements} 
        />;
      case 'skills':
        return <SkillsStep 
          skills={skills}
          newSkill={newSkill}
          setNewSkill={setNewSkill}
          addSkill={addSkill}
          removeSkill={removeSkill}
          updateSkillProficiency={updateSkillProficiency}
          isMentor={isMentor}
          expertiseAreas={expertiseAreas}
          toggleExpertise={toggleExpertise}
        />;
      case 'interests':
        return <InterestsStep interests={interests} toggleInterest={toggleInterest} />;
      case 'mentoring':
        return <MentoringStep formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-display text-xl font-bold text-gradient">AlumniConnect</h1>
            <span className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>
          
          {/* Progress bar */}
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div 
              className="h-full gradient-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Step indicators */}
          <div className="flex justify-between mt-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              
              return (
                <div 
                  key={step.id}
                  className={`flex flex-col items-center ${
                    index <= currentStep ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                    isActive 
                      ? 'gradient-primary text-primary-foreground shadow-glow' 
                      : isCompleted 
                        ? 'bg-primary/20 text-primary' 
                        : 'bg-muted'
                  }`}>
                    {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <span className="text-xs mt-1 hidden sm:block">{step.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container max-w-2xl mx-auto px-4 pt-44 pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-border">
        <div className="container max-w-2xl mx-auto px-4 py-4">
          <div className="flex justify-between gap-4">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <Button
              variant="hero"
              onClick={handleNext}
              className="gap-2 flex-1 max-w-xs"
            >
              {currentStep === steps.length - 1 ? (
                <>
                  Complete Setup
                  <Check className="w-4 h-4" />
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Step Components
function BasicInfoStep({ 
  formData, 
  setFormData, 
  profilePicture, 
  setProfilePicture 
}: { 
  formData: any;
  setFormData: (data: any) => void;
  profilePicture: string | null;
  setProfilePicture: (url: string | null) => void;
}) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="font-display text-2xl font-bold mb-2">Let's get started</h2>
        <p className="text-muted-foreground">Tell us a bit about yourself</p>
      </div>

      {/* Profile Picture */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className={`w-28 h-28 rounded-full overflow-hidden border-4 border-primary/20 ${
            !profilePicture ? 'bg-muted flex items-center justify-center' : ''
          }`}>
            {profilePicture ? (
              <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="w-12 h-12 text-muted-foreground" />
            )}
          </div>
          <label className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center cursor-pointer shadow-lg hover:shadow-glow transition-shadow">
            <Upload className="w-5 h-5" />
            <input 
              type="file" 
              accept="image/*" 
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setProfilePicture(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </label>
        </div>
        <Button variant="ghost" size="sm" className="gap-2">
          <Sparkles className="w-4 h-4" />
          Generate AI Avatar
        </Button>
      </div>

      {/* Name Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            placeholder="John"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            placeholder="Doe"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          />
        </div>
      </div>

      {/* LinkedIn */}
      <div className="space-y-2">
        <Label htmlFor="linkedin" className="flex items-center gap-2">
          <Linkedin className="w-4 h-4" />
          LinkedIn Profile (Optional)
        </Label>
        <Input
          id="linkedin"
          placeholder="https://linkedin.com/in/yourprofile"
          value={formData.linkedInProfile}
          onChange={(e) => setFormData({ ...formData, linkedInProfile: e.target.value })}
        />
      </div>
    </div>
  );
}

function AcademicStep({ formData, setFormData }: { formData: any; setFormData: (data: any) => void }) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="font-display text-2xl font-bold mb-2">Academic Background</h2>
        <p className="text-muted-foreground">Help us understand your educational journey</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="university">University</Label>
          <Input
            id="university"
            placeholder="e.g., Stanford University"
            value={formData.university}
            onChange={(e) => setFormData({ ...formData, university: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Department</Label>
            <Select 
              value={formData.department} 
              onValueChange={(value) => setFormData({ ...formData, department: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {DEPARTMENTS.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Degree</Label>
            <Select 
              value={formData.degree} 
              onValueChange={(value) => setFormData({ ...formData, degree: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select degree" />
              </SelectTrigger>
              <SelectContent>
                {DEGREES.map(deg => (
                  <SelectItem key={deg} value={deg}>{deg}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Field of Study</Label>
          <Select 
            value={formData.field} 
            onValueChange={(value) => setFormData({ ...formData, field: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your field" />
            </SelectTrigger>
            <SelectContent>
              {FIELDS.map(field => (
                <SelectItem key={field} value={field}>{field}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Current Semester</Label>
            <Select 
              value={formData.semester} 
              onValueChange={(value) => setFormData({ ...formData, semester: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select semester" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                  <SelectItem key={sem} value={sem.toString()}>Semester {sem}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <Label>CGPA</Label>
              <span className="text-sm font-medium text-primary">{formData.cgpa.toFixed(2)}</span>
            </div>
            <Slider
              value={[formData.cgpa]}
              onValueChange={([value]) => setFormData({ ...formData, cgpa: value })}
              min={0}
              max={4}
              step={0.1}
              className="mt-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfessionalStep({ 
  formData, 
  setFormData,
  isMentor 
}: { 
  formData: any; 
  setFormData: (data: any) => void;
  isMentor: boolean;
}) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="font-display text-2xl font-bold mb-2">Professional Status</h2>
        <p className="text-muted-foreground">Tell us about your work experience</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Label>Current Status</Label>
          <div className="grid grid-cols-3 gap-3">
            {(['student', 'intern', 'employed'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFormData({ ...formData, professionalStatus: status })}
                className={`p-4 rounded-xl border-2 text-center transition-all duration-200 ${
                  formData.professionalStatus === status
                    ? 'border-primary bg-primary/5 shadow-glow'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <span className="text-2xl block mb-1">
                  {status === 'student' ? '📚' : status === 'intern' ? '🎯' : '💼'}
                </span>
                <span className="text-sm font-medium capitalize">{status}</span>
              </button>
            ))}
          </div>
        </div>

        {(formData.professionalStatus === 'intern' || formData.professionalStatus === 'employed') && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                placeholder="e.g., Google"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </div>
            
            {isMentor && (
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  placeholder="e.g., Senior Software Engineer"
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                />
              </div>
            )}
          </motion.div>
        )}

        {isMentor && (
          <div className="space-y-3">
            <div className="flex justify-between">
              <Label>Years of Experience</Label>
              <span className="text-sm font-medium text-primary">{formData.yearsOfExperience} years</span>
            </div>
            <Slider
              value={[formData.yearsOfExperience]}
              onValueChange={([value]) => setFormData({ ...formData, yearsOfExperience: value })}
              min={1}
              max={30}
              step={1}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function SkillsStep({ 
  skills, 
  newSkill, 
  setNewSkill, 
  addSkill, 
  removeSkill, 
  updateSkillProficiency,
  isMentor,
  expertiseAreas,
  toggleExpertise,
}: { 
  skills: Skill[];
  newSkill: string;
  setNewSkill: (s: string) => void;
  addSkill: (s: string) => void;
  removeSkill: (s: string) => void;
  updateSkillProficiency: (name: string, level: 'beginner' | 'intermediate' | 'expert') => void;
  isMentor: boolean;
  expertiseAreas: string[];
  toggleExpertise: (area: string) => void;
}) {
  const filteredSuggestions = SKILLS_SUGGESTIONS.filter(
    s => s.toLowerCase().includes(newSkill.toLowerCase()) && !skills.find(sk => sk.name === s)
  ).slice(0, 5);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="font-display text-2xl font-bold mb-2">
          {isMentor ? 'Skills & Expertise' : 'Your Skills'}
        </h2>
        <p className="text-muted-foreground">Add your technical and soft skills</p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Input
            placeholder="Type a skill and press Enter"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addSkill(newSkill);
              }
            }}
          />
          {newSkill && filteredSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-10 overflow-hidden">
              {filteredSuggestions.map(suggestion => (
                <button
                  key={suggestion}
                  onClick={() => addSkill(suggestion)}
                  className="w-full px-4 py-2 text-left hover:bg-muted transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        {skills.length > 0 && (
          <div className="space-y-3">
            {skills.map(skill => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center justify-between p-3 bg-card rounded-lg border border-border"
              >
                <span className="font-medium">{skill.name}</span>
                <div className="flex items-center gap-2">
                  <div className="flex rounded-lg overflow-hidden border border-border">
                    {(['beginner', 'intermediate', 'expert'] as const).map(level => (
                      <button
                        key={level}
                        onClick={() => updateSkillProficiency(skill.name, level)}
                        className={`px-3 py-1 text-xs transition-colors ${
                          skill.proficiency === level
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-background hover:bg-muted'
                        }`}
                      >
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => removeSkill(skill.name)}
                    className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {skills.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Award className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>Add skills to showcase your expertise</p>
          </div>
        )}
      </div>

      {isMentor && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label>Expertise Areas (max 5)</Label>
            <Badge variant="secondary">{expertiseAreas.length}/5</Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            {FIELDS.map(field => (
              <Badge
                key={field}
                variant={expertiseAreas.includes(field) ? 'default' : 'outline'}
                className={`cursor-pointer transition-all ${
                  expertiseAreas.includes(field) ? 'shadow-glow' : ''
                } ${
                  expertiseAreas.length >= 5 && !expertiseAreas.includes(field) 
                    ? 'opacity-50 cursor-not-allowed' 
                    : ''
                }`}
                onClick={() => toggleExpertise(field)}
              >
                {field}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function InterestsStep({ 
  interests, 
  toggleInterest 
}: { 
  interests: string[];
  toggleInterest: (id: string) => void;
}) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="font-display text-2xl font-bold mb-2">Your Interests</h2>
        <p className="text-muted-foreground">What topics excite you the most?</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {INTEREST_CATEGORIES.map(category => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => toggleInterest(category.id)}
            className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
              interests.includes(category.id)
                ? 'border-primary bg-primary/5 shadow-glow'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <span className="text-2xl block mb-2">{category.emoji}</span>
            <span className="font-medium text-sm">{category.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function MentoringStep({ formData, setFormData }: { formData: any; setFormData: (data: any) => void }) {
  const toggleArrayItem = (key: string, item: string) => {
    const current = formData[key] as string[];
    if (current.includes(item)) {
      setFormData({ ...formData, [key]: current.filter(i => i !== item) });
    } else {
      setFormData({ ...formData, [key]: [...current, item] });
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="font-display text-2xl font-bold mb-2">Guidance Preferences</h2>
        <p className="text-muted-foreground">Help us connect you with the right students</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex justify-between">
            <Label>Weekly Availability</Label>
            <span className="text-sm font-medium text-primary">{formData.availabilityHours} hours/week</span>
          </div>
          <Slider
            value={[formData.availabilityHours]}
            onValueChange={([value]) => setFormData({ ...formData, availabilityHours: value })}
            min={1}
            max={20}
            step={1}
          />
        </div>

        <div className="space-y-3">
          <Label>Preferred Student Age Group</Label>
          <div className="flex flex-wrap gap-2">
            {['18-22', '23-27', '28-32', '33+'].map(age => (
              <Badge
                key={age}
                variant={formData.ageGroupPreference.includes(age) ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => toggleArrayItem('ageGroupPreference', age)}
              >
                {age}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label>Preferred Experience Level</Label>
          <div className="flex flex-wrap gap-2">
            {['Beginner', 'Intermediate', 'Advanced'].map(level => (
              <Badge
                key={level}
                variant={formData.experienceLevelPreference.includes(level) ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => toggleArrayItem('experienceLevelPreference', level)}
              >
                {level}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label>What would you like to guide in?</Label>
          <div className="flex flex-wrap gap-2">
            {['Career Guidance', 'Technical Skills', 'Interview Prep', 'Resume Review', 'Project Guidance', 'Industry Insights'].map(area => (
              <Badge
                key={area}
                variant={formData.preferredMentoringAreas.includes(area) ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => toggleArrayItem('preferredMentoringAreas', area)}
              >
                {area}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}