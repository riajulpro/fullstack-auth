import ProvidersContainer from "@/providers/ProvidersContainer";
import Header from "@/components/shared/Header";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ProvidersContainer>
        <Header />
        {children}
      </ProvidersContainer>
    </>
  );
}
