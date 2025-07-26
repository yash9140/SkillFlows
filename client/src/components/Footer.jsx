import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <div className="container text-center">
        <div className="mb-2 fw-bold">
          SkillFlow &copy; {new Date().getFullYear()}
        </div>
        <div>
          <a href="mailto:support@skillflow.com" className="text-warning text-decoration-none mx-2">Contact</a>
          <span className="text-secondary">|</span>
          <a href="/privacy" className="text-warning text-decoration-none mx-2">Privacy Policy</a>
          <span className="text-secondary">|</span>
          <a href="/terms" className="text-warning text-decoration-none mx-2">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;