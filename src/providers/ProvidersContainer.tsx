import { ThemeProvider } from "@/components/client/Theme/ThemeProvider";
import ToastProvider from "./ToastProvider";

const ProvidersContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <ToastProvider />
    </ThemeProvider>
  );
};

export default ProvidersContainer;
