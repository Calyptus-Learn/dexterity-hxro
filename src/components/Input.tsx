interface InputProps {
    placeholder: string;
    type: string;
    onChange: (value: any) => void;
    className?: string;
    ariaLabel: string;
}

const Input: React.FC<InputProps> = ({ placeholder, type, onChange, className, ariaLabel }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            className={`m-2 p-2 text-xl text-black ${className}`}
            aria-label={ariaLabel}
        />
    );
};

export default Input;
