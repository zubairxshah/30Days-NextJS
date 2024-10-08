type RootLayoutProps = {
  children: React.ReactNode;
};
const RootLayout: React.FC<RootLayoutProps> = (arg) => {
  console.log("props");
  return (
    <html lang="eng">
      <body>{arg.children}</body>
    </html>
  );
};

export default RootLayout;
