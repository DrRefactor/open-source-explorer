import React, { useState, useEffect } from 'react';
import { Project } from '../../App';
import ProjectList from '../components/ProjectList';
import styled from 'styled-components';
import GooglePlay from '../../googlePlay/GooglePlay';
import { useCountdown } from '../hooks/useCountdown';
import Github, { AccumulatedProject } from '../../github/Github';

type Props = {
  githubProject?: Project,
  googlePlayProject?: Project
}

const Container = styled.div`
  display: flex;
`

const ResultSection: React.FC<Props> = ({githubProject, googlePlayProject}) => {
  const [githubProjects, setGithubProjects] = useState<AccumulatedProject[]>([]);
  const [googlePlayProjects, setGooglePlayProjects] = useState<Project[]>([]);
  const [githubTimer, startGithubTimer] = useCountdown(60);

  useEffect(() => {
    setGithubProjects([]);
    if (githubProject) {
      Github.getInstance()
        .getSimilarRepositories(githubProject.id)
        .then(setGithubProjects)
        .catch(startGithubTimer);
    }
  }, [githubProject, startGithubTimer]);

  useEffect(() => {
    setGooglePlayProjects([])
    if (googlePlayProject) {
      GooglePlay.findSimilar(googlePlayProject.id).then(setGooglePlayProjects);
    }
  }, [googlePlayProject]);

  return (
    <Container>
        <ProjectList
          title={`Aplikacje podobne${githubTimer ? ' (spróbuj ponownie za: ' + githubTimer + ' sekund)' : ''}`}
          projects={githubProjects}
          hide={!githubProject}
        />
        <ProjectList
          title={'Aplikacje podobne'}
          projects={googlePlayProjects}
          hide={!googlePlayProject}
        />
    </Container>
  );
};

export default ResultSection
