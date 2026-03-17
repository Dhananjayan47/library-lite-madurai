import {BrowserRouter} from 'react-router-dom'
import AppRoutes from './routes/appRoutes';
import Layout from './components/Layout';
const App = () => {
  return ( <BrowserRouter>
  <Layout>

  <AppRoutes/>
  </Layout>
  </BrowserRouter> );
}
 
export default App;