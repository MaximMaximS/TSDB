export default function Site({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      {children}
    </div>
  );
}
