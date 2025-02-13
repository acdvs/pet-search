function PlaceholderContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center items-center h-[200px] border-2 border-muted rounded-md">
      {children}
    </div>
  );
}

export default PlaceholderContainer;
