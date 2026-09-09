import { useState, useEffect } from 'react';

export function useTypedText(roles, typingSpeed = 110, deletingSpeed = 60, pauseTime = 2000) {
  const [text, setText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!roles || roles.length === 0) return;

    const currentRole = roles[roleIndex];
    let timeout;

    if (isDeleting) {
      if (text.length > 0) {
        timeout = setTimeout(() => {
          setText(currentRole.substring(0, text.length - 1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
        timeout = setTimeout(() => {}, 400);
      }
    } else {
      if (text.length < currentRole.length) {
        timeout = setTimeout(() => {
          setText(currentRole.substring(0, text.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseTime);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex, roles, typingSpeed, deletingSpeed, pauseTime]);

  return text;
}
