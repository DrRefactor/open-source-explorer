import React, { HTMLProps } from 'react';

type Props = {
  value: string;
} & HTMLProps<HTMLInputElement>
const TextField: React.FC<Props> = ({
  onChange,
  value
}) => {
  return (
    <input
      value={value}
      onChange={onChange}
    />
  );
};

export default TextField;
