
import { ResumeData } from '@/types';

interface ClassicTemplateProps {
  data: ResumeData;
}

const ClassicTemplate = ({ data }: ClassicTemplateProps) => {
  // In a full implementation, this would contain a different template design
  // For now, we'll use a simple placeholder that mentions this is the Classic template
  
  return (
    <div className="bg-white shadow-lg p-8 max-w-3xl mx-auto my-8">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">{data.personalInfo.name}</h1>
        <p className="text-gray-600">
          {data.personalInfo.email} • {data.personalInfo.phone} • {data.personalInfo.address}
        </p>
      </div>
      
      <div className="text-center mb-10">
        <p>This is the Classic Template (Placeholder)</p>
        <p>In a full implementation, this would be a complete traditional resume template design.</p>
      </div>
      
      {/* The rest of the template would go here */}
    </div>
  );
};

export default ClassicTemplate;
