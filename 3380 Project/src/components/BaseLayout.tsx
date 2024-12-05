import Header from '../components/Header'
import Sidebar from "../components/Sidebar";
import SubjectTabs from "../components/SubjectTabs";

interface BaseLayoutProps {
  children: React.ReactNode; // Explicitly typing children
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }: BaseLayoutProps) => {
  return (
    <div className="grid-container">
      <Header />
      <Sidebar />
      <SubjectTabs />
      <main className="main-container">{children}</main>
    </div>
  );
};

export default BaseLayout;