import NavigationBar from './NavigationBar'
import Footer from './Footer'

const Layout = ({ children }) => {
    return (
      <div className="d-flex flex-column min-vh-100 ">
        
        <header>
          <NavigationBar />
        </header>
  
        <main className="flex-grow-1 container-fluid px-3 d-flex">
          {children}
        </main>
  
        <footer className="p-2 bg-dark">
          <Footer />
        </footer>
  
      </div>
    );
  };
  
  export default Layout