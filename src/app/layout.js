import Footer from "./components/Footer";
import Header from "./components/Header";
import "./globals.css"

export const metadata = {
  title: "Quivr",
  description: "Description goes here",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <Header />
        {children}
        <Footer />
        </body>
    </html>
  );
}