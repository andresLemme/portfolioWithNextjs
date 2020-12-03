export default function Input({onKeyPress, onChange, placeholder, value, name }) {
  return (
    <input
      type="text"
      onChange={onChange}
      placeholder={placeholder}
      value={value}
      name={name}
      onKeyPress={onKeyPress}
    />
  );
}
