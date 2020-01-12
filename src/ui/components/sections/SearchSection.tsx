import React, { useState, useCallback } from 'react';
import TextField from '../TextField';
import ProjectList from '../ProjectList';
import styled from 'styled-components';
import { Project } from '../../../App';

const ListContainer = styled.div`
  display: flex;
`

type Props = {
  onGooglePlayProjectSelect: (project?: Project) => void,
  onGithubProjectSelect: (project?: Project) => void,
}

const SearchSection: React.FC<Props> = ({onGooglePlayProjectSelect, onGithubProjectSelect}) => {
  const [githubProjects, setGithubProjects] = useState<Project[]>([]);
  const [googlePlayProjects, setGooglePlayProjects] = useState<Project[]>([]);
  const [showResults, setShowResults] = useState(false);

  const onSearch = useCallback((project: string) => {
    setShowResults(true);
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
          />
          <ProjectList
            title={'Google Play'}
            onProjectClick={onGooglePlayProjectSelect}
            projects={googlePlayProjects}
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
  }, [onReset, setSearch])
  return (
    <div>
      <TextField
        value={search}
        onChange={setSearch}
      />
      <button onClick={() => onSearch(search)}>
        Search
      </button>
      <button onClick={reset}>
        Reset
      </button>
    </div>
  )
}

export default SearchSection;
