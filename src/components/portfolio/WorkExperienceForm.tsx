import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Plus, 
  X, 
  Building2, 
  Calendar, 
  Briefcase,
  ChevronDown,
  ChevronUp,
  Trash2,
  Edit2
} from 'lucide-react';
import type { WorkExperience } from '@/types/portfolio';

interface WorkExperienceFormProps {
  experiences: WorkExperience[];
  setExperiences: (experiences: WorkExperience[]) => void;
}

const TECH_SUGGESTIONS = [
  'React', 'Node.js', 'Python', 'TypeScript', 'AWS', 'Docker', 
  'PostgreSQL', 'MongoDB', 'GraphQL', 'Kubernetes'
];

export function WorkExperienceForm({ experiences, setExperiences }: WorkExperienceFormProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [newExperience, setNewExperience] = useState<Partial<WorkExperience>>({
    company: '',
    role: '',
    startDate: '',
    endDate: '',
    isCurrent: false,
    description: '',
    technologies: [],
    achievements: [],
  });
  const [newTech, setNewTech] = useState('');
  const [newAchievement, setNewAchievement] = useState('');

  const handleAddExperience = () => {
    if (!newExperience.company || !newExperience.role) return;
    
    const experience: WorkExperience = {
      id: Date.now().toString(),
      company: newExperience.company || '',
      role: newExperience.role || '',
      startDate: newExperience.startDate || '',
      endDate: newExperience.isCurrent ? undefined : newExperience.endDate,
      isCurrent: newExperience.isCurrent || false,
      description: newExperience.description || '',
      technologies: newExperience.technologies || [],
      achievements: newExperience.achievements || [],
    };

    if (editingId) {
      setExperiences(experiences.map(e => e.id === editingId ? { ...experience, id: editingId } : e));
      setEditingId(null);
    } else {
      setExperiences([experience, ...experiences]);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setNewExperience({
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      description: '',
      technologies: [],
      achievements: [],
    });
    setNewTech('');
    setNewAchievement('');
    setIsAdding(false);
  };

  const handleEdit = (exp: WorkExperience) => {
    setNewExperience(exp);
    setEditingId(exp.id);
    setIsAdding(true);
  };

  const handleDelete = (id: string) => {
    setExperiences(experiences.filter(e => e.id !== id));
  };

  const addTechnology = (tech: string) => {
    if (tech && !newExperience.technologies?.includes(tech)) {
      setNewExperience({
        ...newExperience,
        technologies: [...(newExperience.technologies || []), tech]
      });
      setNewTech('');
    }
  };

  const removeTechnology = (tech: string) => {
    setNewExperience({
      ...newExperience,
      technologies: newExperience.technologies?.filter(t => t !== tech) || []
    });
  };

  const addAchievement = () => {
    if (newAchievement) {
      setNewExperience({
        ...newExperience,
        achievements: [...(newExperience.achievements || []), newAchievement]
      });
      setNewAchievement('');
    }
  };

  const removeAchievement = (index: number) => {
    setNewExperience({
      ...newExperience,
      achievements: newExperience.achievements?.filter((_, i) => i !== index) || []
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display text-2xl font-bold mb-2">Work Experience</h2>
        <p className="text-muted-foreground">Showcase your professional journey</p>
      </div>

      {/* Existing experiences */}
      <div className="space-y-3">
        <AnimatePresence>
          {experiences.map((exp) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div 
                    className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{exp.role}</h4>
                          <p className="text-sm text-muted-foreground">{exp.company}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={(e) => { e.stopPropagation(); handleEdit(exp); }}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={(e) => { e.stopPropagation(); handleDelete(exp.id); }}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                        {expandedId === exp.id ? (
                          <ChevronUp className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedId === exp.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-border"
                      >
                        <div className="p-4 space-y-3">
                          {exp.description && (
                            <p className="text-sm">{exp.description}</p>
                          )}
                          {exp.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {exp.technologies.map(tech => (
                                <Badge key={tech} variant="secondary" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          )}
                          {exp.achievements.length > 0 && (
                            <ul className="text-sm space-y-1">
                              {exp.achievements.map((ach, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-primary mt-1">•</span>
                                  <span>{ach}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add/Edit form */}
      <AnimatePresence>
        {isAdding ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      placeholder="e.g., Google"
                      value={newExperience.company}
                      onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input
                      id="role"
                      placeholder="e.g., Senior Engineer"
                      value={newExperience.role}
                      onChange={(e) => setNewExperience({ ...newExperience, role: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="month"
                      value={newExperience.startDate}
                      onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="month"
                      value={newExperience.endDate}
                      onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
                      disabled={newExperience.isCurrent}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="isCurrent"
                    checked={newExperience.isCurrent}
                    onCheckedChange={(checked) => 
                      setNewExperience({ ...newExperience, isCurrent: checked as boolean })
                    }
                  />
                  <Label htmlFor="isCurrent" className="cursor-pointer">I currently work here</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your responsibilities and impact..."
                    value={newExperience.description}
                    onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                    rows={3}
                  />
                </div>

                {/* Technologies */}
                <div className="space-y-2">
                  <Label>Technologies Used</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add technology"
                      value={newTech}
                      onChange={(e) => setNewTech(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTechnology(newTech);
                        }
                      }}
                    />
                    <Button type="button" variant="outline" onClick={() => addTechnology(newTech)}>
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {TECH_SUGGESTIONS.filter(t => !newExperience.technologies?.includes(t)).slice(0, 5).map(tech => (
                      <Badge 
                        key={tech} 
                        variant="outline" 
                        className="cursor-pointer hover:bg-primary/10"
                        onClick={() => addTechnology(tech)}
                      >
                        + {tech}
                      </Badge>
                    ))}
                  </div>
                  {(newExperience.technologies?.length || 0) > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {newExperience.technologies?.map(tech => (
                        <Badge key={tech} className="gap-1">
                          {tech}
                          <X 
                            className="w-3 h-3 cursor-pointer" 
                            onClick={() => removeTechnology(tech)}
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Achievements */}
                <div className="space-y-2">
                  <Label>Key Achievements</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="e.g., Increased performance by 40%"
                      value={newAchievement}
                      onChange={(e) => setNewAchievement(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addAchievement();
                        }
                      }}
                    />
                    <Button type="button" variant="outline" onClick={addAchievement}>
                      Add
                    </Button>
                  </div>
                  {(newExperience.achievements?.length || 0) > 0 && (
                    <ul className="space-y-1 mt-2">
                      {newExperience.achievements?.map((ach, i) => (
                        <li key={i} className="flex items-center justify-between p-2 bg-muted rounded-lg text-sm">
                          <span>• {ach}</span>
                          <X 
                            className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-destructive" 
                            onClick={() => removeAchievement(i)}
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" onClick={resetForm} className="flex-1">
                    Cancel
                  </Button>
                  <Button onClick={handleAddExperience} className="flex-1">
                    {editingId ? 'Update' : 'Add'} Experience
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <Button
            variant="outline"
            className="w-full gap-2 border-dashed"
            onClick={() => setIsAdding(true)}
          >
            <Plus className="w-4 h-4" />
            Add Work Experience
          </Button>
        )}
      </AnimatePresence>
    </div>
  );
}
