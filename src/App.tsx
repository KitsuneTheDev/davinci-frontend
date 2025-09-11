import './App.css'
import Layout from './components/layout/Layout.tsx'
import { UserProvider } from './components/context/userContext.tsx'
import Homepage from './components/homepage/Homepage.tsx';

function App() {

  return (
    <UserProvider>
        <Layout>
          <Homepage />
        </Layout>
    </UserProvider>
  )
}

export default App;
