import React from 'react';
import styled from 'styled-components';
import { Project } from '../../App';

type Props = {
  title: string,
  projects: Project[],
  onProjectClick?: (project: Project) => void
}

const List = styled.div`
  height: 300px;
  border-width: 2px;
  border-style: solid;
  border-color: #ddd;
`;

const Container = styled.div`
  flex-grow: 1;
`

const ProjectList: React.FC<Props> = (props) => {
  return (
    <Container>
      <h2>
        {props.title}
      </h2>
      <List>
        {props.projects.map(p => (
          <Element 
            key={p.id}
            project={p} 
            onClick={props.onProjectClick}
          />
        ))}
      </List>
    </Container>
  );
};

type ElementProps = {
  onClick?: (project: Project) => void,
  project: Project
}

const ElementContainer = styled.div`
  height: 40px;
  display: flex;
`

const Icon = styled.img`
  flex-shrink: 0;
`

const Details = styled.div`
  flex-grow: 1;
`

const Element: React.FC<ElementProps> = ({onClick, project}) => {
  const {icon, title, author} = project;
  return (
    <ElementContainer onClick={onClick ? () => onClick(project) : undefined}>
      {icon && (
        <Icon src={icon}/>
      )}
      <Details>
        <p>
          {title}
        </p>
        <p>
          {author}
        </p>
      </Details>
    </ElementContainer>
  )
}

export default ProjectList;
