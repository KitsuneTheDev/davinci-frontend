import './App.css'
import Layout from './components/layout/Layout.tsx'
import { UserProvider } from './components/context/userContext.tsx'
import { PostProvider } from './components/context/postContext.tsx'
import Homepage from './components/homepage/Homepage.tsx';

function App() {

  return (
    <UserProvider>
      <PostProvider>
        <Layout>
          <Homepage />
        </Layout>
      </PostProvider>
    </UserProvider>
  )
}

export default App;
