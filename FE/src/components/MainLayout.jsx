import NavigationBar from './NavigationBar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  
    return (
      <div className="d-flex flex-column min-vh-100 ">
        
        
          <NavigationBar />
  
        <main className="flex-grow-1 container-fluid px-3 d-flex flex-column bg-image">
          <Outlet/>
        </main>
  
        <footer className="p-2 bg-dark">
          <Footer />
        </footer>
  
      </div>
    );
  };
  
  export default MainLayout