import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ResumeTemplate } from '@/types';
import ImportResume from '@/components/ImportResume';

const templates: ResumeTemplate[] = [
  {
    id: 'modern',
    name: 'Modern',
    thumbnail: '/placeholder.svg',
    description: 'Clean layout with a sidebar for a contemporary look'
  },
  {
    id: 'classic',
    name: 'Classic',
    thumbnail: '/placeholder.svg',
    description: 'Traditional format that works for all industries'
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    thumbnail: '/placeholder.svg',
    description: 'Simple and elegant design with clean typography'
  },
  {
    id: 'creative',
    name: 'Creative',
    thumbnail: '/placeholder.svg',
    description: 'Bold design for creative professionals'
  },
  {
    id: 'professional',
    name: 'Professional',
    thumbnail: '/placeholder.svg',
    description: 'Sophisticated layout for executive positions'
  },
  {
    id: 'chronological',
    name: 'Chronological',
    thumbnail: '/placeholder.svg',
    description: 'Time-focused layout highlighting experience'
  }
];

const TemplateGallery = () => {
  const [importedResumeData, setImportedResumeData] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<string>("templates");

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Resume Template
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Select from our professionally designed templates, then import your existing resume to transform it.
            </p>
          </div>
          
          <Tabs defaultValue="templates" onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="templates">Choose Template</TabsTrigger>
              <TabsTrigger value="import">Import Resume</TabsTrigger>
            </TabsList>
            
            <TabsContent value="templates" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template) => (
                  <Card key={template.id} className="overflow-hidden transition-all hover:shadow-lg">
                    <div className="aspect-[3/4] bg-gray-100 relative group">
                      <img 
                        src={template.thumbnail} 
                        alt={template.name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <Link to={`/editor/${template.id}`} state={{ importedResumeData }}>
                          <Button>Use This Template</Button>
                        </Link>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-lg">{template.name}</h3>
                      <p className="text-gray-600 text-sm mt-1">{template.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="import">
              <div className="max-w-3xl mx-auto">
                <ImportResume onImport={setImportedResumeData} />
                
                {importedResumeData && (
                  <div className="mt-8 text-center">
                    <p className="text-green-600 font-medium mb-4">
                      Resume successfully uploaded! Now select a template to continue.
                    </p>
                    <Button onClick={() => setActiveTab("templates")}>
                      Choose a Template
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TemplateGallery;
