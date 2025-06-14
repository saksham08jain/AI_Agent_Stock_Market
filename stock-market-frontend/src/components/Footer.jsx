import React from 'react';
import { Link } from 'react-router-dom';
const Footer = () => {
     const deploymentTime = import.meta.env.VITE_BUILD_TIME || new Date().toISOString();
    
    const formatDeploymentTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };
  return (
    <footer className="bg-white border-t border-grey mt-auto">
       <div className="w-full px-[5vw] py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

            {/* Left - Deployment time */}
            <div className="text-dark-grey text-sm">
                Last Deployed: {formatDeploymentTime(deploymentTime)}
            </div>

            {/* Center - Copyright */}
            <div className="text-dark-grey text-sm text-center flex-1">
                © 2025 Saksham Jain. All rights reserved.
            </div>

            {/* Right - About Me */}
            <div className="text-sm">
                <a href='https://www.linkedin.com/in/sakshamjain03/' target="_blank" rel="noopener noreferrer" className="text-dark-grey hover:text-accent transition-colors duration-200">
                 
                    Linkedin
                </a>
            </div>
        </div>
    </footer>
);

};

export default Footer;