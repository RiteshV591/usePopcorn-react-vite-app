export const ErrorMessage = ({ message }) => {
  return (
    <p className="error">
      <span>&times;</span> {message}
    </p>
  );
};
