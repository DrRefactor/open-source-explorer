import React, { useState, useCallback } from 'react';
import './App.css';
import SearchSection from './ui/sections/SearchSection';
import ResultSection from './ui/sections/ResultSection';

export type Project = {
  id: string,
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
        githubProject={selectedGithubProject}
        googlePlayProject={selectedGooglePlayProject}
      />
      <ResultSection 
        githubProject={selectedGithubProject}
        googlePlayProject={selectedGooglePlayProject}
      />
    </div>
  );
}

export default App;
