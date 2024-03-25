
import './App.css';
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import RootLayout from './RootLayout';
import Home from './components/home/Home'
import Signup from './components/signup/Signup'
import Signin from './components/signin/Signin'
import AuthorProfile from './components/author-profile/AuthorProfile';
import UserProfile from './components/user-profile/UserProfile';
import AddArticle from './components/add-article/AddArticle';
import ArticlesOfAuthor from './components/articles-of-author/ArticlesOfAuthor'


function App() {
const browserRouter = createBrowserRouter([
    {
      path:'',
      element:<RootLayout />,
      children:[
        {
          path:'',
          element:<Home />
        },
        {
          path:'signup',
          element:<Signup />
        },
        {
          path:'signin',
          element:<Signin />
        },
        {
          path:'user-profile',
          element:<UserProfile />
        },
        {
          path:'author-profile',
          element:<AuthorProfile />,
          children:[
            {
              path:'add-article',
              element:<AddArticle />
            },
          {
            path:'articles-of-author',
            element:<ArticlesOfAuthor />
          }

          ]
        }
      ]
    }
  ],[])
  return (
    <div>
      <RouterProvider router = {browserRouter} />
    </div>
  );
}

export default App;
