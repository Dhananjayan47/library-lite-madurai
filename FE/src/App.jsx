import {BrowserRouter} from 'react-router-dom'
import AppRoutes from './routes/appRoutes';
import './config/chartConfig'
import { ToastProvider } from './context/ToastProvider';

const App = () => {
  return ( <BrowserRouter>
 
<ToastProvider>

  <AppRoutes/>
</ToastProvider>


  </BrowserRouter> );
}
 
export default App;