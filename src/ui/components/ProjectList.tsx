import React from 'react';
import styled from 'styled-components';
import { Project } from '../../App';

type Props = {
  title: string,
  projects: Project[],
  onProjectClick?: (project: Project) => void,
  selectedProject?: Project,
  hide?: boolean
}

const List = styled.div`
  height: 300px;
  overflow-y: auto;
  margin: 18px;
  box-shadow: 2px 3px 16px -5px rgba(0,0,0,0.28);
`;

const Container = styled.div<{hide?: boolean}>`
  flex-grow: 1;
  max-width: 50%;
  visibility: ${({hide}) => hide ? 'hidden' : 'visible'};
`

const ProjectList: React.FC<Props> = (props) => {
  return (
    <Container hide={props.hide}>
      <h2>
        {props.title}
      </h2>
      <List>
        {props.projects.map(p => (
          <Element 
            key={p.id}
            project={p} 
            onClick={props.onProjectClick}
            selected={p.id === props.selectedProject?.id}
          />
        ))}
      </List>
    </Container>
  );
};

type ElementProps = {
  onClick?: (project: Project) => void,
  project: Project,
  selected?: boolean
}

const ElementContainer = styled.div<{selected?: boolean}>`
  height: 40px;
  display: flex;
  padding: 3px 0;
  cursor: pointer;
  background-color: ${({selected}) => selected ? '#eee' : 'none'};
  &:hover {
    background-color: #eee;
  }
`

const Icon = styled.img`
  flex-shrink: 0;
  width: 40px;
  height: 40px;
`

const Details = styled.div`
  flex-grow: 1;
  text-align: left;
  margin-left: 6px;
`

const Title = styled.div`
  font-weight: bold;
`

const Text = styled.div`
  font-size: 14px;
`

const Element: React.FC<ElementProps> = ({onClick, project, selected}) => {
  const {icon, title, author} = project;
  return (
    <ElementContainer onClick={onClick ? () => onClick(project) : undefined} selected={selected}>
      {icon && (
        <Icon src={icon}/>
      )}
      <Details>
        <Title>
          {title}
        </Title>
        <Text>
          {author}
        </Text>
      </Details>
    </ElementContainer>
  )
}

export default ProjectList;
