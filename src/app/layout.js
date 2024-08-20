import Footer from "./components/Footer";
import Header from "./components/Header";
import "./globals.css"

export const metadata = {
  title: "Quivr",
  description: "Find scripture for spiritual warfare.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className="">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}