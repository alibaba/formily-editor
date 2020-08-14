import { useState } from 'react';

const useToggle = (initialValue: boolean = false): [boolean, () => void] => {
  const [state, setState] = useState(initialValue);
  return [state, () => setState(currentValue => !currentValue)];
};

export default useToggle;