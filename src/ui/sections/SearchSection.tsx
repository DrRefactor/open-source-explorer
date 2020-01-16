import React, { useState, useCallback, FormEvent } from 'react';
import TextField from '../components/TextField';
import ProjectList from '../components/ProjectList';
import styled from 'styled-components';
import { Project } from '../../App';
import GooglePlay from '../../googlePlay/GooglePlay';

const ListContainer = styled.div`
  display: flex;
`

type Props = {
  onGooglePlayProjectSelect: (project?: Project) => void,
  onGithubProjectSelect: (project?: Project) => void,
  githubProject?: Project,
  googlePlayProject?: Project
}

const SearchSection: React.FC<Props> = ({onGooglePlayProjectSelect, onGithubProjectSelect, googlePlayProject, githubProject}) => {
  const [githubProjects, setGithubProjects] = useState<Project[]>([]);
  const [googlePlayProjects, setGooglePlayProjects] = useState<Project[]>([]);
  const [showResults, setShowResults] = useState(false);

  const onSearch = useCallback((project: string) => {
    setShowResults(true);
    GooglePlay.get(project).then(setGooglePlayProjects);
    // TODO fetch projects by project value
  }, []);

  const onReset = useCallback(() => {
    setShowResults(false);
    setGithubProjects([]);
    setGooglePlayProjects([]);
    onGooglePlayProjectSelect();
    onGithubProjectSelect();
  }, [onGooglePlayProjectSelect, onGithubProjectSelect]);
  return (
    <div>
      <h4>
        Wpisz nazwę aplikacji
      </h4>
      <Search 
        onSearch={onSearch}
        onReset={onReset} 
      />
      {showResults && (
        <ListContainer>
          <ProjectList
            title={'Github'}
            onProjectClick={onGithubProjectSelect}
            projects={githubProjects}
            selectedProject={githubProject}
          />
          <ProjectList
            title={'Google Play'}
            onProjectClick={onGooglePlayProjectSelect}
            projects={googlePlayProjects}
            selectedProject={googlePlayProject}
          />
        </ListContainer>
      )}
    </div>
  );
};

const Search: React.FC<{onSearch: (project: string) => void, onReset: () => void}> = ({onReset, onSearch}) => {
  const [search, setSearch] = useState('');

  const reset = useCallback(() => {
    setSearch('');
    onReset()
  }, [onReset, setSearch]);
  const submit = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    onSearch(search)
  }, [search, onSearch]);
  return (
    <form>
      <TextField
        value={search}
        onChange={(event: FormEvent<HTMLInputElement>) => setSearch(event.currentTarget.value)}
        name='app'
      />
      <button 
        disabled={!search}
        type='submit'
        onClick={submit}
      >
        Szukaj
      </button>
      <button onClick={reset} type='button'>
        Resetuj
      </button>
    </form>
  )
}

export default SearchSection;
