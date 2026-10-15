import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Services from '@/pages/Services';
import Portfolio from '@/pages/Portfolio';
import Contact from '@/pages/Contact';
import ProjectDetail from '@/pages/ProjectDetail';
import { useRouter } from '@/hooks/useRouter';
import { useSEO } from '@/hooks/useSEO';

function App() {
  const { page, projectId, navigate, navigateToProject } = useRouter();

  useSEO(page, projectId);

  useEffect(() => {
    window.dispatchEvent(new PopStateEvent('popstate'));
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header currentPage={page} onNavigate={navigate} />
      <main className="flex-1">
        {page === 'home' && <Home onNavigate={navigate} onNavigateToProject={navigateToProject} />}
        {page === 'about' && <About onNavigate={navigate} />}
        {page === 'services' && <Services onNavigate={navigate} />}
        {page === 'portfolio' && <Portfolio onNavigate={navigate} onNavigateToProject={navigateToProject} />}
        {page === 'contact' && <Contact />}
        {page === 'project' && (
          <ProjectDetail
            projectId={projectId}
            onNavigate={navigate}
            onNavigateToProject={navigateToProject}
          />
        )}
      </main>
      <Footer onNavigate={navigate} />
    </div>
  );
}

export default App;
