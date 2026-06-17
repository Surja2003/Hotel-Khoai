import { createBrowserRouter } from 'react-router';
import Layout from './components/Layout';
import Home from './pages/Home';
import OurStory from './pages/OurStory';
import Menu from './pages/Menu';
import Gallery from './pages/Gallery';
import FindUs from './pages/FindUs';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'our-story', Component: OurStory },
      { path: 'menu', Component: Menu },
      { path: 'gallery', Component: Gallery },
      { path: 'find-us', Component: FindUs },
    ],
  },
]);
