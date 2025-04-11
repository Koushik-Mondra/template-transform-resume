
import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ResumeData, TemplateId } from '@/types';
import { parseResume } from '@/utils/resumeParser';
import ModernTemplate from '@/components/ResumeTemplates/ModernTemplate';
import { toast } from 'sonner';
import { Download, Eye } from 'lucide-react';

// Placeholder for mock data to use when no resume is imported
const initialResumeData: ResumeData = {
  personalInfo: {
    name: 'Your Name',
    email: 'email@example.com',
    phone: '(123) 456-7890',
    address: 'City, State',
    summary: 'Write a brief summary about your professional background, skills, and career goals.'
  },
  education: [
    {
      id: '1',
      institution: 'University Name',
      degree: 'Degree',
      field: 'Field of Study',
      startDate: '20XX',
      endDate: '20XX',
      location: 'City, State'
    }
  ],
  experience: [
    {
      id: '1',
      company: 'Company Name',
      position: 'Job Title',
      startDate: '20XX',
      endDate: 'Present',
      location: 'City, State',
      description: 'Describe your responsibilities and achievements in this role.'
    }
  ],
  skills: [
    { id: '1', name: 'Skill 1', level: 4 },
    { id: '2', name: 'Skill 2', level: 3 },
    { id: '3', name: 'Skill 3', level: 5 }
  ]
};

const Editor = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [isLoading, setIsLoading] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const importedFile = location.state?.importedResumeData as File | undefined;

  // Process imported resume if available
  useEffect(() => {
    const processImportedResume = async () => {
      if (importedFile) {
        setIsLoading(true);
        try {
          const parsedData = await parseResume(importedFile);
          if (parsedData) {
            setResumeData(parsedData);
            toast.success('Resume data imported successfully!');
          } else {
            toast.error('Failed to parse resume. Please try again or enter details manually.');
          }
        } catch (error) {
          console.error('Error processing resume:', error);
          toast.error('An error occurred while processing your resume.');
        } finally {
          setIsLoading(false);
        }
      }
    };

    processImportedResume();
  }, [importedFile]);

  // Update personal information
  const updatePersonalInfo = (field: keyof typeof resumeData.personalInfo, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  // Update education item
  const updateEducation = (id: string, field: keyof typeof resumeData.education[0], value: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  // Update experience item
  const updateExperience = (id: string, field: keyof typeof resumeData.experience[0], value: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  // Update skill item
  const updateSkill = (id: string, field: keyof typeof resumeData.skills[0], value: string | number) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map(skill => 
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    }));
  };

  // Add new education entry
  const addEducation = () => {
    const newId = Date.now().toString();
    setResumeData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: newId,
          institution: 'University Name',
          degree: 'Degree',
          field: 'Field of Study',
          startDate: '',
          endDate: '',
          location: '',
          description: ''
        }
      ]
    }));
  };

  // Add new experience entry
  const addExperience = () => {
    const newId = Date.now().toString();
    setResumeData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: newId,
          company: 'Company Name',
          position: 'Job Title',
          startDate: '',
          endDate: '',
          location: '',
          description: 'Describe your responsibilities and achievements.'
        }
      ]
    }));
  };

  // Add new skill entry
  const addSkill = () => {
    const newId = Date.now().toString();
    setResumeData(prev => ({
      ...prev,
      skills: [
        ...prev.skills,
        {
          id: newId,
          name: 'New Skill',
          level: 3
        }
      ]
    }));
  };

  // Remove education entry
  const removeEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  // Remove experience entry
  const removeExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  // Remove skill entry
  const removeSkill = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }));
  };

  // Toggle preview mode
  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  // Download resume as PDF (mock functionality)
  const downloadResume = () => {
    toast.success('Resume download started!');
    // In a real implementation, this would use a library like html2pdf.js or jsPDF
    // to generate a PDF from the resume template
    setTimeout(() => {
      toast('For a full implementation, this would generate a PDF of your resume.', {
        description: 'In a production app, we would integrate with a PDF generation library.'
      });
    }, 1500);
  };

  // Render the selected template
  const renderSelectedTemplate = () => {
    // For now, we only have the Modern template implemented
    // In a full implementation, this would switch based on templateId
    return <ModernTemplate data={resumeData} />;
  };

  if (!templateId) {
    navigate('/templates');
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-lg text-gray-600">Processing your resume...</p>
            </div>
          ) : isPreviewMode ? (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Resume Preview</h1>
                <div className="space-x-3">
                  <Button variant="outline" onClick={togglePreviewMode}>
                    Edit Resume
                  </Button>
                  <Button onClick={downloadResume}>
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </div>
              </div>
              
              {/* The resume preview */}
              <div className="bg-white shadow-md rounded-lg p-4">
                {renderSelectedTemplate()}
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Edit Your Resume</h1>
                <Button onClick={togglePreviewMode}>
                  <Eye className="mr-2 h-4 w-4" />
                  Preview Resume
                </Button>
              </div>
              
              <Tabs defaultValue="personal">
                <TabsList className="grid w-full max-w-xl mx-auto grid-cols-4 mb-8">
                  <TabsTrigger value="personal">Personal</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                </TabsList>
                
                <TabsContent value="personal">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input 
                            id="name" 
                            value={resumeData.personalInfo.name} 
                            onChange={(e) => updatePersonalInfo('name', e.target.value)}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input 
                              id="email" 
                              type="email" 
                              value={resumeData.personalInfo.email} 
                              onChange={(e) => updatePersonalInfo('email', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone">Phone</Label>
                            <Input 
                              id="phone" 
                              value={resumeData.personalInfo.phone} 
                              onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="address">Address</Label>
                          <Input 
                            id="address" 
                            value={resumeData.personalInfo.address} 
                            onChange={(e) => updatePersonalInfo('address', e.target.value)}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="website">Website (Optional)</Label>
                            <Input 
                              id="website" 
                              value={resumeData.personalInfo.website || ''} 
                              onChange={(e) => updatePersonalInfo('website', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="linkedin">LinkedIn (Optional)</Label>
                            <Input 
                              id="linkedin" 
                              value={resumeData.personalInfo.linkedin || ''} 
                              onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="github">GitHub (Optional)</Label>
                            <Input 
                              id="github" 
                              value={resumeData.personalInfo.github || ''} 
                              onChange={(e) => updatePersonalInfo('github', e.target.value)}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="summary">Professional Summary</Label>
                          <Textarea 
                            id="summary" 
                            rows={4} 
                            value={resumeData.personalInfo.summary} 
                            onChange={(e) => updatePersonalInfo('summary', e.target.value)}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="education">
                  <Card>
                    <CardContent className="pt-6 pb-2">
                      {resumeData.education.map((edu, index) => (
                        <div key={edu.id} className="mb-8 border-b pb-6 last:border-b-0">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium">Education #{index + 1}</h3>
                            {resumeData.education.length > 1 && (
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => removeEducation(edu.id)}
                              >
                                Remove
                              </Button>
                            )}
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor={`institution-${edu.id}`}>Institution</Label>
                              <Input 
                                id={`institution-${edu.id}`} 
                                value={edu.institution} 
                                onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                              />
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                                <Input 
                                  id={`degree-${edu.id}`} 
                                  value={edu.degree} 
                                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                                />
                              </div>
                              <div>
                                <Label htmlFor={`field-${edu.id}`}>Field of Study</Label>
                                <Input 
                                  id={`field-${edu.id}`} 
                                  value={edu.field} 
                                  onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                                />
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <Label htmlFor={`location-${edu.id}`}>Location</Label>
                                <Input 
                                  id={`location-${edu.id}`} 
                                  value={edu.location || ''} 
                                  onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                                />
                              </div>
                              <div>
                                <Label htmlFor={`start-date-${edu.id}`}>Start Date</Label>
                                <Input 
                                  id={`start-date-${edu.id}`} 
                                  value={edu.startDate} 
                                  onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                                />
                              </div>
                              <div>
                                <Label htmlFor={`end-date-${edu.id}`}>End Date</Label>
                                <Input 
                                  id={`end-date-${edu.id}`} 
                                  value={edu.endDate} 
                                  onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                                />
                              </div>
                            </div>
                            
                            <div>
                              <Label htmlFor={`description-${edu.id}`}>Description (Optional)</Label>
                              <Textarea 
                                id={`description-${edu.id}`} 
                                rows={3} 
                                value={edu.description || ''} 
                                onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <div className="py-4">
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={addEducation}
                        >
                          Add Education
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="experience">
                  <Card>
                    <CardContent className="pt-6 pb-2">
                      {resumeData.experience.map((exp, index) => (
                        <div key={exp.id} className="mb-8 border-b pb-6 last:border-b-0">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium">Experience #{index + 1}</h3>
                            {resumeData.experience.length > 1 && (
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => removeExperience(exp.id)}
                              >
                                Remove
                              </Button>
                            )}
                          </div>
                          
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor={`company-${exp.id}`}>Company</Label>
                                <Input 
                                  id={`company-${exp.id}`} 
                                  value={exp.company} 
                                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                                />
                              </div>
                              <div>
                                <Label htmlFor={`position-${exp.id}`}>Position</Label>
                                <Input 
                                  id={`position-${exp.id}`} 
                                  value={exp.position} 
                                  onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                                />
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <Label htmlFor={`location-${exp.id}`}>Location</Label>
                                <Input 
                                  id={`location-${exp.id}`} 
                                  value={exp.location || ''} 
                                  onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                                />
                              </div>
                              <div>
                                <Label htmlFor={`start-date-${exp.id}`}>Start Date</Label>
                                <Input 
                                  id={`start-date-${exp.id}`} 
                                  value={exp.startDate} 
                                  onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                                />
                              </div>
                              <div>
                                <Label htmlFor={`end-date-${exp.id}`}>End Date</Label>
                                <Input 
                                  id={`end-date-${exp.id}`} 
                                  value={exp.endDate} 
                                  onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                                />
                              </div>
                            </div>
                            
                            <div>
                              <Label htmlFor={`description-${exp.id}`}>Description</Label>
                              <Textarea 
                                id={`description-${exp.id}`} 
                                rows={4} 
                                value={exp.description} 
                                onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <div className="py-4">
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={addExperience}
                        >
                          Add Experience
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="skills">
                  <Card>
                    <CardContent className="pt-6 pb-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {resumeData.skills.map((skill) => (
                          <div key={skill.id} className="flex items-center space-x-4">
                            <div className="flex-grow">
                              <Input 
                                value={skill.name} 
                                onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                              />
                            </div>
                            <div className="flex-shrink-0 w-32">
                              <select
                                className="w-full border border-gray-300 rounded-md h-10 px-3"
                                value={skill.level}
                                onChange={(e) => updateSkill(skill.id, 'level', parseInt(e.target.value))}
                              >
                                <option value="1">Beginner</option>
                                <option value="2">Elementary</option>
                                <option value="3">Intermediate</option>
                                <option value="4">Advanced</option>
                                <option value="5">Expert</option>
                              </select>
                            </div>
                            {resumeData.skills.length > 1 && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-red-500 hover:text-red-700"
                                onClick={() => removeSkill(skill.id)}
                              >
                                Remove
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                      
                      <div className="py-4 mt-4">
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={addSkill}
                        >
                          Add Skill
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Editor;
