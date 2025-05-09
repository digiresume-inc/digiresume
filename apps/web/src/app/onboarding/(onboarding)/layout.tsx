// create a onboarding layout
import React from 'react';

interface OnboardingLayoutProps {
  children: React.ReactNode;
}

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({ children }) => {
  return (
    <div className="onboarding-layout">
      <header className="onboarding-header">
        <h1>Welcome to Onboarding</h1>
      </header>
      <main className="onboarding-content">{children}</main>
      <footer className="onboarding-footer">
        <p>&copy; {new Date().getFullYear()} Linkfolio</p>
      </footer>
    </div>
  );
};

export default OnboardingLayout;