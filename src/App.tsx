import React, { useState, useCallback } from 'react';
import './App.css';
import SearchSection from './ui/components/sections/SearchSection';
import ResultSection from './ui/components/sections/ResultSection';

export type Project = {
  id: string | number,
  title: string,
  author: string,
  icon?: string
}

const App: React.FC = () => {
  const [selectedGithubProject, setSelectedGithubProject] = useState<Project>();
  const [selectedGooglePlayProject, setSelectedGooglePlayProject] = useState<Project>();

  const onGithubProjectSelect = useCallback((project?: Project) => {
    const selectedProject = selectedGithubProject?.id === project?.id ? undefined : project;
    setSelectedGithubProject(selectedProject)
  }, [selectedGithubProject]);

  const onGooglePlayProjectSelect = useCallback((project?: Project) => {
    const selectedProject = selectedGooglePlayProject?.id === project?.id ? undefined : project;
    setSelectedGooglePlayProject(selectedProject)
  }, [selectedGooglePlayProject]);

  return (
    <div className="App">
      <SearchSection 
        onGooglePlayProjectSelect={onGooglePlayProjectSelect}
        onGithubProjectSelect={onGithubProjectSelect}
      />
      <ResultSection 
        githubProject={selectedGithubProject}
        googlePlayProject={selectedGooglePlayProject}
      />
    </div>
  );
}

export default App;
