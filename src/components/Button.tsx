// components/Button.tsx
import { useState, useEffect } from 'react';

interface ButtonProps {
  text: string;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  isLoading?: boolean;
  status?: 'success' | 'failed';
}

const Button: React.FC<ButtonProps> = ({ text, disabled, onClick, className, isLoading, status }) => {
  const [tempStatus, setTempStatus] = useState<'success' | 'failed' | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status === 'success' || status === 'failed') {
      setTempStatus(status);
      timer = setTimeout(() => {
        setTempStatus(null);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [status]);

  const displayText = tempStatus ? 
                      (tempStatus === 'success' ? 'Success!' : 'Failed!') : 
                      (isLoading ? 'Processing...' : text);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`group text-md w-60 m-2 btn ${className} ${disabled ? 'bg-gray-300 cursor-not-allowed' : ''}`}
    >
      {displayText}
    </button>
  );
};

export default Button;
