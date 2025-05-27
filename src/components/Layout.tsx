const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <main className="bg-gray-200 min-h-screen">
      <div className="max-w-xs md:max-w-md mx-auto py-4">{children}</div>
    </main>
  );
};

export { Layout };
