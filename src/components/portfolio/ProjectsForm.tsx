import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Plus, 
  X, 
  FolderGit2,
  ExternalLink,
  Github,
  Trash2,
  Edit2,
  Image,
  Link2
} from 'lucide-react';
import type { Project } from '@/types/portfolio';

interface ProjectsFormProps {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
}

export function ProjectsForm({ projects, setProjects }: ProjectsFormProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '',
    description: '',
    technologies: [],
    imageUrl: '',
    liveUrl: '',
    githubUrl: '',
    role: '',
    highlights: [],
    startDate: '',
  });
  const [newTech, setNewTech] = useState('');
  const [newHighlight, setNewHighlight] = useState('');

  const handleAddProject = () => {
    if (!newProject.title || !newProject.description) return;
    
    const project: Project = {
      id: Date.now().toString(),
      title: newProject.title || '',
      description: newProject.description || '',
      technologies: newProject.technologies || [],
      imageUrl: newProject.imageUrl,
      liveUrl: newProject.liveUrl,
      githubUrl: newProject.githubUrl,
      role: newProject.role || '',
      highlights: newProject.highlights || [],
      startDate: newProject.startDate || '',
      endDate: newProject.endDate,
    };

    if (editingId) {
      setProjects(projects.map(p => p.id === editingId ? { ...project, id: editingId } : p));
      setEditingId(null);
    } else {
      setProjects([project, ...projects]);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setNewProject({
      title: '',
      description: '',
      technologies: [],
      imageUrl: '',
      liveUrl: '',
      githubUrl: '',
      role: '',
      highlights: [],
      startDate: '',
    });
    setNewTech('');
    setNewHighlight('');
    setIsAdding(false);
  };

  const handleEdit = (project: Project) => {
    setNewProject(project);
    setEditingId(project.id);
    setIsAdding(true);
  };

  const handleDelete = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const addTechnology = (tech: string) => {
    if (tech && !newProject.technologies?.includes(tech)) {
      setNewProject({
        ...newProject,
        technologies: [...(newProject.technologies || []), tech]
      });
      setNewTech('');
    }
  };

  const removeTechnology = (tech: string) => {
    setNewProject({
      ...newProject,
      technologies: newProject.technologies?.filter(t => t !== tech) || []
    });
  };

  const addHighlight = () => {
    if (newHighlight) {
      setNewProject({
        ...newProject,
        highlights: [...(newProject.highlights || []), newHighlight]
      });
      setNewHighlight('');
    }
  };

  const removeHighlight = (index: number) => {
    setNewProject({
      ...newProject,
      highlights: newProject.highlights?.filter((_, i) => i !== index) || []
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display text-2xl font-bold mb-2">Projects Portfolio</h2>
        <p className="text-muted-foreground">Showcase your best work and side projects</p>
      </div>

      {/* Existing projects */}
      <div className="grid gap-4">
        <AnimatePresence>
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card className="overflow-hidden group">
                <CardContent className="p-0">
                  <div className="flex">
                    {/* Project Image */}
                    <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                      {project.imageUrl ? (
                        <img 
                          src={project.imageUrl} 
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FolderGit2 className="w-8 h-8 text-primary/60" />
                      )}
                    </div>
                    
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold">{project.title}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {project.liveUrl && (
                            <Button variant="ghost" size="icon" asChild>
                              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </Button>
                          )}
                          {project.githubUrl && (
                            <Button variant="ghost" size="icon" asChild>
                              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                <Github className="w-4 h-4" />
                              </a>
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleEdit(project)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDelete(project.id)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.technologies.slice(0, 4).map(tech => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.technologies.length - 4}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
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
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., E-commerce Platform"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Your Role</Label>
                  <Input
                    id="role"
                    placeholder="e.g., Lead Developer, Full Stack Engineer"
                    value={newProject.role}
                    onChange={(e) => setNewProject({ ...newProject, role: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what the project does and its impact..."
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    rows={3}
                  />
                </div>

                {/* Links */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="liveUrl" className="flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Live URL
                    </Label>
                    <Input
                      id="liveUrl"
                      placeholder="https://..."
                      value={newProject.liveUrl}
                      onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="githubUrl" className="flex items-center gap-2">
                      <Github className="w-4 h-4" />
                      GitHub URL
                    </Label>
                    <Input
                      id="githubUrl"
                      placeholder="https://github.com/..."
                      value={newProject.githubUrl}
                      onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imageUrl" className="flex items-center gap-2">
                    <Image className="w-4 h-4" />
                    Project Image URL (optional)
                  </Label>
                  <Input
                    id="imageUrl"
                    placeholder="https://..."
                    value={newProject.imageUrl}
                    onChange={(e) => setNewProject({ ...newProject, imageUrl: e.target.value })}
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
                  {(newProject.technologies?.length || 0) > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {newProject.technologies?.map(tech => (
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

                {/* Highlights */}
                <div className="space-y-2">
                  <Label>Key Highlights</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="e.g., Handled 10k+ daily users"
                      value={newHighlight}
                      onChange={(e) => setNewHighlight(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addHighlight();
                        }
                      }}
                    />
                    <Button type="button" variant="outline" onClick={addHighlight}>
                      Add
                    </Button>
                  </div>
                  {(newProject.highlights?.length || 0) > 0 && (
                    <ul className="space-y-1 mt-2">
                      {newProject.highlights?.map((h, i) => (
                        <li key={i} className="flex items-center justify-between p-2 bg-muted rounded-lg text-sm">
                          <span>• {h}</span>
                          <X 
                            className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-destructive" 
                            onClick={() => removeHighlight(i)}
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
                  <Button onClick={handleAddProject} className="flex-1">
                    {editingId ? 'Update' : 'Add'} Project
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
            Add Project
          </Button>
        )}
      </AnimatePresence>
    </div>
  );
}
