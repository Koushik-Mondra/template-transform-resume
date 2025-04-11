
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight, Upload, Layers, Download, FileCheck, CheckCircle } from 'lucide-react';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="pt-24 pb-16 md:pt-32 md:pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
              Transform Your Resume <span className="text-blue-600">Instantly</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Import your existing resume and convert it to any of our professional templates. 
              Stand out from the crowd with a perfectly formatted, ATS-friendly resume.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="text-lg px-6 py-6">
                <Link to="/templates">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Feature Section */}
      <div className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Creating a stunning resume has never been easier. Our simple three-step process will help you stand out from the competition.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white shadow-lg">
              <div className="bg-blue-100 p-3 rounded-full mb-6">
                <Upload className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Import Your Resume</h3>
              <p className="text-gray-600">
                Upload your existing resume in PDF or DOCX format. Our AI will extract all the important information.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white shadow-lg">
              <div className="bg-blue-100 p-3 rounded-full mb-6">
                <Layers className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Select a Template</h3>
              <p className="text-gray-600">
                Choose from our collection of professionally designed resume templates that are ATS-friendly.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white shadow-lg">
              <div className="bg-blue-100 p-3 rounded-full mb-6">
                <Download className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Download & Apply</h3>
              <p className="text-gray-600">
                Preview your new resume, make any necessary adjustments, and download it as a PDF ready to send.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Templates Preview */}
      <div className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Professional Resume Templates
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose from a variety of modern, professional templates designed to impress employers and pass ATS systems.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105">
                <div className="h-64 bg-gray-200"></div>
                <div className="p-4">
                  <h3 className="font-medium text-lg mb-1">Template {i}</h3>
                  <p className="text-gray-600 text-sm mb-3">Professional & Modern</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link to="/templates">
                View All Templates <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Benefits Section */}
      <div className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose ResuMorphAI
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're not just another resume builder. Our unique approach saves you time while ensuring you get the best results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <CheckCircle className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-medium text-gray-900 mb-2">ATS-Friendly Templates</h3>
                <p className="text-gray-600">
                  All our templates are designed to pass through Applicant Tracking Systems, ensuring your resume gets seen by human recruiters.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <FileCheck className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-medium text-gray-900 mb-2">Intelligent Import</h3>
                <p className="text-gray-600">
                  Our smart AI accurately extracts information from your existing resume, saving you from manual data entry.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <CheckCircle className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-medium text-gray-900 mb-2">Easy Customization</h3>
                <p className="text-gray-600">
                  Fine-tune your resume with our user-friendly editor. Adjust formats, colors, and content with ease.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <CheckCircle className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-medium text-gray-900 mb-2">Multiple Format Downloads</h3>
                <p className="text-gray-600">
                  Download your finished resume in PDF format, ready to be sent to potential employers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Resume?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Get started for free and create a professional resume in minutes.
            </p>
            <Button asChild size="lg" variant="secondary" className="text-blue-600 bg-white hover:bg-gray-100">
              <Link to="/templates">
                Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
