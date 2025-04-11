
import React from 'react';
import ModernTemplate from './ResumeTemplates/ModernTemplate';
import ClassicTemplate from './ResumeTemplates/ClassicTemplate';
import { ResumeData, TemplateId } from '@/types';

interface ResumePreviewProps {
  templateId: TemplateId;
  data: ResumeData;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ templateId, data }) => {
  // In a full implementation, this would render different templates based on the templateId
  switch (templateId) {
    case 'modern':
      return <ModernTemplate data={data} />;
    case 'classic':
      return <ClassicTemplate data={data} />;
    default:
      // For now, we'll default to the Modern template for any other template ID
      return <ModernTemplate data={data} />;
  }
};

export default ResumePreview;
