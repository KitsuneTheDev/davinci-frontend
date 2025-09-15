import './App.css';
import Layout from './components/layout/Layout';
import { UserProvider } from './components/context/userContext';
import { PostProvider } from './components/context/PostContext';
import { ModalAddPostProvider } from './components/context/ModalAddPostContext';
import Homepage from './components/homepage/Homepage';
import ModalAddPost from './components/modals/ModalAddPost';

function App() {

  return (
    <UserProvider>
      <PostProvider>
        <ModalAddPostProvider>
          <Layout>
            <Homepage />
            <ModalAddPost />
          </Layout>
        </ModalAddPostProvider>
      </PostProvider>
    </UserProvider>
  )
}

export default App;
