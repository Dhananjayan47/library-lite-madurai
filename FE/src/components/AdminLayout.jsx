import { Outlet } from 'react-router-dom';
import NavigationBar from './NavigationBar'

const AdminLayout = () => {
  
    return (
      <div className="d-flex flex-column min-vh-100 ">
        
        <header>
          <NavigationBar />
        </header>
  
        <main className="flex-grow-1 container-fluid px-3 d-flex flex-column bg-a-image">
          <Outlet/>
        </main>
  
  
      </div>
    );
  };
  
  export default AdminLayout