import React, { useState, useCallback } from 'react';
import TextField from '../TextField';
import ProjectList, { ProjectSource } from '../ProjectList';

type Project = {
  id: number | string,
  title: string,
  author: string,
  icon?: string
}

const SearchSection: React.FC<{}> = () => {
  const [githubProjects, setGithubProjects] = useState<Project[]>();
  const [googlePlayProjects, setGooglePlayProjects] = useState<Project[]>();
  const [showResults, setShowResults] = useState(false);

  const onSearch = useCallback((project: string) => {
    setShowResults(true);
  }, [])
  return (
    <div>
      <Search onSearch={onSearch}/>
      {showResults && (
        <>
          <ProjectList
            source={ProjectSource.Github}
            title={'Github'}
          />
          <ProjectList
            source={ProjectSource.GooglePlay}
            title={'GooglePlay'}
          />
        </>
      )}
    </div>
  );
};

const Search: React.FC<{onSearch: (project: string) => void}> = (props) => {
  const [search, setSearch] = useState('');
  return (
    <div>
      <TextField
        value={search}
        onChange={setSearch}
      />
      <button onClick={() => props.onSearch(search)}>
        Search
      </button>
    </div>
  )
}

export default SearchSection;
