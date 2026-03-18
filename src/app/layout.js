import "./globals.css";

export const metadata = {
  title: "Snap Search — AI Shopping Assistant",
  description: "Get AI-powered product insights, review synthesis, and price comparisons in seconds.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
