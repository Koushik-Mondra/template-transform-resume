
import { ResumeData } from '@/types';
import { Phone, Mail, Globe, Linkedin, GitHub, MapPin, Calendar } from 'lucide-react';

interface ModernTemplateProps {
  data: ResumeData;
}

const ModernTemplate = ({ data }: ModernTemplateProps) => {
  const { personalInfo, education, experience, skills, projects, certifications } = data;

  return (
    <div className="bg-white shadow-lg max-w-3xl mx-auto my-8 print:shadow-none">
      <div className="grid grid-cols-3 min-h-[1100px]">
        {/* Sidebar */}
        <div className="bg-gray-800 text-white p-8">
          <div className="mb-10 text-center">
            <h1 className="text-2xl font-bold mb-1">{personalInfo.name}</h1>
            <p className="text-gray-300">{experience[0]?.position || 'Professional'}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3 border-b border-gray-700 pb-1">Contact</h2>
            <ul className="space-y-2">
              <li className="flex items-center text-sm">
                <Phone className="h-4 w-4 mr-2" />
                <span>{personalInfo.phone}</span>
              </li>
              <li className="flex items-center text-sm">
                <Mail className="h-4 w-4 mr-2" />
                <span>{personalInfo.email}</span>
              </li>
              {personalInfo.website && (
                <li className="flex items-center text-sm">
                  <Globe className="h-4 w-4 mr-2" />
                  <span>{personalInfo.website}</span>
                </li>
              )}
              {personalInfo.linkedin && (
                <li className="flex items-center text-sm">
                  <Linkedin className="h-4 w-4 mr-2" />
                  <span>{personalInfo.linkedin}</span>
                </li>
              )}
              {personalInfo.github && (
                <li className="flex items-center text-sm">
                  <GitHub className="h-4 w-4 mr-2" />
                  <span>{personalInfo.github}</span>
                </li>
              )}
              <li className="flex items-center text-sm">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{personalInfo.address}</span>
              </li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3 border-b border-gray-700 pb-1">Skills</h2>
            <div className="space-y-3">
              {skills.map(skill => (
                <div key={skill.id}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">{skill.name}</span>
                    {skill.level && (
                      <span className="text-xs">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span 
                            key={i} 
                            className={`inline-block w-1.5 h-1.5 rounded-full mx-0.5 ${
                              i < skill.level! ? 'bg-blue-400' : 'bg-gray-600'
                            }`}
                          />
                        ))}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {certifications && certifications.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-3 border-b border-gray-700 pb-1">Certifications</h2>
              <ul className="space-y-3">
                {certifications.map(cert => (
                  <li key={cert.id}>
                    <h3 className="text-sm font-medium">{cert.name}</h3>
                    <p className="text-xs text-gray-300">{cert.issuer} • {cert.date}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        {/* Main Content */}
        <div className="col-span-2 p-8">
          {/* Professional Summary */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3 text-gray-700 border-b border-gray-200 pb-1">Professional Summary</h2>
            <p className="text-gray-600">{personalInfo.summary}</p>
          </div>

          {/* Work Experience */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-700 border-b border-gray-200 pb-1">Work Experience</h2>
            <div className="space-y-6">
              {experience.map(job => (
                <div key={job.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold">{job.position}</h3>
                      <p className="text-gray-700">{job.company}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-500 text-sm flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {job.startDate} - {job.endDate}
                      </p>
                      {job.location && (
                        <p className="text-gray-500 text-sm flex items-center justify-end">
                          <MapPin className="h-3 w-3 mr-1" />
                          {job.location}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{job.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-700 border-b border-gray-200 pb-1">Education</h2>
            <div className="space-y-6">
              {education.map(edu => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold">{edu.degree} in {edu.field}</h3>
                      <p className="text-gray-700">{edu.institution}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-500 text-sm flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {edu.startDate} - {edu.endDate}
                      </p>
                      {edu.location && (
                        <p className="text-gray-500 text-sm flex items-center justify-end">
                          <MapPin className="h-3 w-3 mr-1" />
                          {edu.location}
                        </p>
                      )}
                    </div>
                  </div>
                  {edu.description && (
                    <p className="text-gray-600 text-sm">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          {projects && projects.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-700 border-b border-gray-200 pb-1">Projects</h2>
              <div className="space-y-6">
                {projects.map(project => (
                  <div key={project.id}>
                    <h3 className="text-lg font-semibold">{project.name}</h3>
                    {project.technologies && (
                      <p className="text-blue-600 text-xs mb-1">{project.technologies}</p>
                    )}
                    <p className="text-gray-600 text-sm">{project.description}</p>
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noreferrer" className="text-blue-600 text-xs hover:underline">
                        {project.link}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
