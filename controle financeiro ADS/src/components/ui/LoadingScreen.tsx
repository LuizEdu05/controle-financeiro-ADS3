interface LoadingScreenProps {
  message: string;
}

export function LoadingScreen({ message }: LoadingScreenProps) {
  return (
    <div className="fullscreen-center">
      <div className="loader-card">
        <span className="spinner" />
        <p>{message}</p>
      </div>
    </div>
  );
}
