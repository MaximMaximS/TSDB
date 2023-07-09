interface ShowProps {
  when: boolean;
  children: React.ReactNode;
}

export default function Show({ children, when }: ShowProps) {
  return <>{when && children}</>;
}
