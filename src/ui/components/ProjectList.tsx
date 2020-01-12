import React from 'react';

export enum ProjectSource {
  Github,
  GooglePlay
}

type Props = {
  source: ProjectSource,
  title: string,
}

const ProjectList: React.FC<Props> = (props) => {
  return null;
};

export default ProjectList
