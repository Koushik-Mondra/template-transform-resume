
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4">ResuMorphAI</h2>
            <p className="text-gray-400 mb-4">
              Transform your existing resume into any of our professional templates with just a few clicks.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/templates" className="text-gray-400 hover:text-white transition-colors">
                  Templates
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Contact</h3>
            <p className="text-gray-400">
              Have questions or suggestions? <br />
              <a href="mailto:contact@resumorphai.com" className="text-blue-400 hover:text-blue-300">
                contact@resumorphai.com
              </a>
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} ResuMorphAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
