import "./globals.css";

export const metadata = {
  title: "프론트엔드_곽세령_과제",
  description: "Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />
      </head>
      <body style={{ fontFamily: 'Pretendard'}}>
        {children}
      </body>
    </html>
  );
}
