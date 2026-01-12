import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Plus, 
  X, 
  Code2,
  Layers
} from 'lucide-react';
import { TECH_CATEGORIES, POPULAR_TECHNOLOGIES, type TechStack } from '@/types/portfolio';

interface TechStackFormProps {
  techStacks: TechStack[];
  setTechStacks: (stacks: TechStack[]) => void;
}

const PROFICIENCY_COLORS = {
  beginner: 'bg-blue-500',
  intermediate: 'bg-yellow-500',
  advanced: 'bg-orange-500',
  expert: 'bg-green-500',
};

export function TechStackForm({ techStacks, setTechStacks }: TechStackFormProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(TECH_CATEGORIES[0]);
  const [customTech, setCustomTech] = useState('');
  const [customProficiency, setCustomProficiency] = useState<'beginner' | 'intermediate' | 'advanced' | 'expert'>('intermediate');
  const [customYears, setCustomYears] = useState(1);

  const getCategoryStack = (category: string) => {
    return techStacks.find(s => s.category === category);
  };

  const addTechnology = (category: string, techName: string, years = 1, proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert' = 'intermediate') => {
    const existingStack = getCategoryStack(category);
    
    if (existingStack) {
      if (existingStack.technologies.some(t => t.name === techName)) return;
      
      setTechStacks(techStacks.map(s => 
        s.category === category 
          ? { 
              ...s, 
              technologies: [...s.technologies, { name: techName, yearsOfExperience: years, proficiency }] 
            }
          : s
      ));
    } else {
      setTechStacks([
        ...techStacks,
        { 
          category, 
          technologies: [{ name: techName, yearsOfExperience: years, proficiency }] 
        }
      ]);
    }
  };

  const removeTechnology = (category: string, techName: string) => {
    setTechStacks(techStacks.map(s => 
      s.category === category 
        ? { ...s, technologies: s.technologies.filter(t => t.name !== techName) }
        : s
    ).filter(s => s.technologies.length > 0));
  };

  const updateTechnology = (
    category: string, 
    techName: string, 
    updates: { yearsOfExperience?: number; proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert' }
  ) => {
    setTechStacks(techStacks.map(s => 
      s.category === category 
        ? { 
            ...s, 
            technologies: s.technologies.map(t => 
              t.name === techName ? { ...t, ...updates } : t
            )
          }
        : s
    ));
  };

  const handleAddCustomTech = () => {
    if (customTech) {
      addTechnology(selectedCategory, customTech, customYears, customProficiency);
      setCustomTech('');
      setCustomYears(1);
      setCustomProficiency('intermediate');
    }
  };

  const currentStack = getCategoryStack(selectedCategory);
  const availableTechs = POPULAR_TECHNOLOGIES[selectedCategory]?.filter(
    t => !currentStack?.technologies.some(ct => ct.name === t)
  ) || [];

  const totalTechs = techStacks.reduce((acc, s) => acc + s.technologies.length, 0);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display text-2xl font-bold mb-2">Tech Stack</h2>
        <p className="text-muted-foreground">Build your technology portfolio</p>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 justify-center">
        {TECH_CATEGORIES.map(category => {
          const stack = getCategoryStack(category);
          const count = stack?.technologies.length || 0;
          
          return (
            <Badge
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className={`cursor-pointer transition-all ${
                selectedCategory === category ? 'shadow-glow' : ''
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
              {count > 0 && (
                <span className="ml-1 px-1.5 py-0.5 rounded-full bg-background/20 text-xs">
                  {count}
                </span>
              )}
            </Badge>
          );
        })}
      </div>

      {/* Quick add popular technologies */}
      {availableTechs.length > 0 && (
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Quick Add:</Label>
          <div className="flex flex-wrap gap-2">
            {availableTechs.slice(0, 8).map(tech => (
              <Badge
                key={tech}
                variant="outline"
                className="cursor-pointer hover:bg-primary/10 transition-colors"
                onClick={() => addTechnology(selectedCategory, tech)}
              >
                <Plus className="w-3 h-3 mr-1" />
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Custom technology input */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="space-y-2">
            <Label>Add Custom Technology</Label>
            <div className="flex gap-2">
              <Input
                placeholder={`Add to ${selectedCategory}...`}
                value={customTech}
                onChange={(e) => setCustomTech(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCustomTech();
                  }
                }}
              />
              <Button onClick={handleAddCustomTech}>Add</Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Years of Experience</Label>
                <span className="text-sm text-primary">{customYears}y</span>
              </div>
              <Slider
                value={[customYears]}
                onValueChange={([v]) => setCustomYears(v)}
                min={0.5}
                max={15}
                step={0.5}
              />
            </div>
            <div className="space-y-2">
              <Label>Proficiency</Label>
              <Select 
                value={customProficiency} 
                onValueChange={(v) => setCustomProficiency(v as typeof customProficiency)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current stack for selected category */}
      {currentStack && currentStack.technologies.length > 0 && (
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <Layers className="w-4 h-4" />
            {selectedCategory} Stack ({currentStack.technologies.length})
          </Label>
          <div className="space-y-2">
            {currentStack.technologies.map(tech => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-3 bg-card rounded-lg border border-border"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-8 rounded-full ${PROFICIENCY_COLORS[tech.proficiency]}`} />
                  <div>
                    <span className="font-medium">{tech.name}</span>
                    <span className="text-xs text-muted-foreground ml-2">
                      {tech.yearsOfExperience}y experience
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Select 
                    value={tech.proficiency}
                    onValueChange={(v) => updateTechnology(selectedCategory, tech.name, { 
                      proficiency: v as typeof tech.proficiency 
                    })}
                  >
                    <SelectTrigger className="w-32 h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                      <SelectItem value="expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => removeTechnology(selectedCategory, tech.name)}
                  >
                    <X className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Summary */}
      {totalTechs > 0 && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-primary" />
                <span className="font-medium">Total Technologies</span>
              </div>
              <Badge className="text-lg px-3">{totalTechs}</Badge>
            </div>
            <div className="flex flex-wrap gap-1 mt-3">
              {techStacks.flatMap(s => 
                s.technologies.map(t => (
                  <Badge key={`${s.category}-${t.name}`} variant="secondary" className="text-xs">
                    {t.name}
                  </Badge>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {totalTechs === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Code2 className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>Add technologies to showcase your expertise</p>
        </div>
      )}
    </div>
  );
}
