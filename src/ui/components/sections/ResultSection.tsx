import React, { useState, useEffect } from 'react';
import { Project } from '../../../App';
import ProjectList from '../ProjectList';
import styled from 'styled-components';

type Props = {
  githubProject?: Project,
  googlePlayProject?: Project
}

const Container = styled.div`
  display: flex;
`

const ResultSection: React.FC<Props> = ({githubProject, googlePlayProject}) => {
  const [githubProjects, setGithubProjects] = useState<Project[]>([]);
  const [googlePlayProjects, setGooglePlayProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (!githubProject) {
      setGithubProjects([])
    }
    // TODO fetch similar github projects

  }, [githubProject]);

  useEffect(() => {
    if (!googlePlayProject) {
      setGooglePlayProjects([])
    }
    // TODO fetch similar google play projects
    
  }, [googlePlayProject]);

  return (
    <Container>
      {githubProject && (
        <ProjectList
          title={'Github'}
          projects={githubProjects}
        />
      )}
      {googlePlayProject && (
        <ProjectList
          title={'Google Play'}
          projects={googlePlayProjects}
        />
      )}
    </Container>
  );
};

export default ResultSection
