import {BrowserRouter} from 'react-router-dom'
import AppRoutes from './routes/appRoutes';
import './config/chartConfig'
import AuthProvider from './context/AuthProvider';
const App = () => {
  return ( <BrowserRouter>
 
<AuthProvider>

  <AppRoutes/>
</AuthProvider>

  </BrowserRouter> );
}
 
export default App;