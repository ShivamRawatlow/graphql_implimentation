const ErrorScreen = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <span
        className={`font_size_extra_large font_weight_bold`}
        style={{ color: 'red' }}
      >
        Error!!!
      </span>
    </div>
  );
};

export default ErrorScreen;
