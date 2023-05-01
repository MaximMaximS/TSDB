export default function Box({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg p-20 text-center outline outline-1 outline-primary">
      {children}
    </div>
  );
}
