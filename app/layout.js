import localFont from "next/font/local";
import "./globals.css";

const worksans = localFont({
  src: [
    {
      path: '../public/fonts/WorkSans-Regular.ttf',
      weight: '400'
    },
    {
      path: '../public/fonts/WorkSans-SemiBold.ttf',
      weight: '700'
    }
  ],
  variable: '--font-worksans'
})

export const metadata = {
  title: "PolsriJobs",
  description: "Dengan PolsriJobs, Cari dan Bagikan Lokermu!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${worksans.variable} font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
