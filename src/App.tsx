import './App.css';
import Layout from './components/layout/Layout.tsx';
import { UserProvider } from './components/context/UserContext.tsx';
import { PostProvider } from './components/context/PostContext.tsx';
import { ModalAddPostProvider } from './components/context/ModalAddPostContext.tsx';
import Homepage from './components/homepage/Homepage.tsx';
import ModalAddPost from './components/modals/ModalAddPost.tsx';

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
