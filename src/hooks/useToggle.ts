import { useCallback, useState } from 'react';

export default function useToggle(defaultState = false): [boolean, () => void, (newState: boolean) => void] {
  const [isOpen, setIsOpen] = useState(defaultState);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return [isOpen, toggle, setIsOpen];
}
