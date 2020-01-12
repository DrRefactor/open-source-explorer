import React from 'react';

type Props = {
  value: string;
  onChange: (text: string) => void;
}
const TextField: React.FC<Props> = ({
  onChange,
  value
}) => {
  return (
    <input
      value={value}
      onChange={({target: {value}}) => onChange(value)}
    />
  );
};

export default TextField;
