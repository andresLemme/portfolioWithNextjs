export default function Input({ onChange, placeholder, value, name }) {
  return (
    <input
      type="text"
      onChange={onChange}
      placeholder={placeholder}
      value={value}
      name={name}
    />
  );
}
