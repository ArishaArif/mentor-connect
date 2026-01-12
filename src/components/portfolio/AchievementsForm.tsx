import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
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
  Trophy,
  Award,
  FileText,
  Mic,
  Star,
  Trash2,
  Edit2,
  ExternalLink
} from 'lucide-react';
import type { Achievement } from '@/types/portfolio';

interface AchievementsFormProps {
  achievements: Achievement[];
  setAchievements: (achievements: Achievement[]) => void;
}

const ACHIEVEMENT_TYPES = [
  { value: 'award', label: 'Award', icon: Trophy },
  { value: 'certification', label: 'Certification', icon: Award },
  { value: 'publication', label: 'Publication', icon: FileText },
  { value: 'speaking', label: 'Speaking', icon: Mic },
  { value: 'other', label: 'Other', icon: Star },
] as const;

const getTypeIcon = (type: Achievement['type']) => {
  const found = ACHIEVEMENT_TYPES.find(t => t.value === type);
  return found?.icon || Star;
};

const getTypeColor = (type: Achievement['type']) => {
  const colors = {
    award: 'text-yellow-500 bg-yellow-500/10',
    certification: 'text-blue-500 bg-blue-500/10',
    publication: 'text-purple-500 bg-purple-500/10',
    speaking: 'text-green-500 bg-green-500/10',
    other: 'text-gray-500 bg-gray-500/10',
  };
  return colors[type] || colors.other;
};

export function AchievementsForm({ achievements, setAchievements }: AchievementsFormProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newAchievement, setNewAchievement] = useState<Partial<Achievement>>({
    title: '',
    issuer: '',
    date: '',
    description: '',
    type: 'award',
    url: '',
  });

  const handleAddAchievement = () => {
    if (!newAchievement.title || !newAchievement.issuer) return;
    
    const achievement: Achievement = {
      id: Date.now().toString(),
      title: newAchievement.title || '',
      issuer: newAchievement.issuer || '',
      date: newAchievement.date || '',
      description: newAchievement.description,
      type: newAchievement.type || 'other',
      url: newAchievement.url,
    };

    if (editingId) {
      setAchievements(achievements.map(a => a.id === editingId ? { ...achievement, id: editingId } : a));
      setEditingId(null);
    } else {
      setAchievements([achievement, ...achievements]);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setNewAchievement({
      title: '',
      issuer: '',
      date: '',
      description: '',
      type: 'award',
      url: '',
    });
    setIsAdding(false);
  };

  const handleEdit = (achievement: Achievement) => {
    setNewAchievement(achievement);
    setEditingId(achievement.id);
    setIsAdding(true);
  };

  const handleDelete = (id: string) => {
    setAchievements(achievements.filter(a => a.id !== id));
  };

  // Group achievements by type
  const groupedAchievements = achievements.reduce((acc, achievement) => {
    if (!acc[achievement.type]) {
      acc[achievement.type] = [];
    }
    acc[achievement.type].push(achievement);
    return acc;
  }, {} as Record<Achievement['type'], Achievement[]>);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display text-2xl font-bold mb-2">Achievements & Recognition</h2>
        <p className="text-muted-foreground">Showcase your awards, certifications, and accomplishments</p>
      </div>

      {/* Existing achievements grouped by type */}
      <div className="space-y-4">
        <AnimatePresence>
          {Object.entries(groupedAchievements).map(([type, items]) => {
            const typeInfo = ACHIEVEMENT_TYPES.find(t => t.value === type);
            const Icon = typeInfo?.icon || Star;
            
            return (
              <motion.div
                key={type}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
              >
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${getTypeColor(type as Achievement['type']).split(' ')[0]}`} />
                  <span className="text-sm font-medium capitalize">{typeInfo?.label || type}</span>
                  <Badge variant="secondary" className="text-xs">{items.length}</Badge>
                </div>
                
                <div className="space-y-2 pl-6">
                  {items.map((achievement) => {
                    const AchIcon = getTypeIcon(achievement.type);
                    
                    return (
                      <Card key={achievement.id} className="group">
                        <CardContent className="p-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getTypeColor(achievement.type)}`}>
                                <AchIcon className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="font-medium text-sm">{achievement.title}</h4>
                                  {achievement.url && (
                                    <a 
                                      href={achievement.url} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-muted-foreground hover:text-primary"
                                    >
                                      <ExternalLink className="w-3 h-3" />
                                    </a>
                                  )}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  {achievement.issuer} • {achievement.date}
                                </p>
                                {achievement.description && (
                                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                    {achievement.description}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => handleEdit(achievement)}
                              >
                                <Edit2 className="w-3 h-3" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => handleDelete(achievement.id)}
                              >
                                <Trash2 className="w-3 h-3 text-destructive" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
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
                <div className="space-y-2">
                  <Label>Achievement Type</Label>
                  <Select 
                    value={newAchievement.type} 
                    onValueChange={(v) => setNewAchievement({ ...newAchievement, type: v as Achievement['type'] })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {ACHIEVEMENT_TYPES.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <type.icon className="w-4 h-4" />
                            {type.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="e.g., AWS Solutions Architect"
                      value={newAchievement.title}
                      onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="issuer">Issuer / Organization</Label>
                    <Input
                      id="issuer"
                      placeholder="e.g., Amazon Web Services"
                      value={newAchievement.issuer}
                      onChange={(e) => setNewAchievement({ ...newAchievement, issuer: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="month"
                      value={newAchievement.date}
                      onChange={(e) => setNewAchievement({ ...newAchievement, date: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="url">Credential URL (optional)</Label>
                    <Input
                      id="url"
                      placeholder="https://..."
                      value={newAchievement.url}
                      onChange={(e) => setNewAchievement({ ...newAchievement, url: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of this achievement..."
                    value={newAchievement.description}
                    onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
                    rows={2}
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" onClick={resetForm} className="flex-1">
                    Cancel
                  </Button>
                  <Button onClick={handleAddAchievement} className="flex-1">
                    {editingId ? 'Update' : 'Add'} Achievement
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
            Add Achievement
          </Button>
        )}
      </AnimatePresence>

      {achievements.length === 0 && !isAdding && (
        <div className="text-center py-8 text-muted-foreground">
          <Trophy className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>Add your achievements, certifications, and recognitions</p>
        </div>
      )}
    </div>
  );
}
