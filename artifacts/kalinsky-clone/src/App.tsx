import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Works from './pages/Works';
import About from './pages/About';
import Contact from './pages/Contact';
import Void from './pages/work-detail/Void';
import Onera from './pages/work-detail/Onera';
import Krbk from './pages/work-detail/Krbk';
import BP from './pages/work-detail/BP';

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/works" component={Works} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/works/void" component={Void} />
        <Route path="/works/onera" component={Onera} />
        <Route path="/works/krbk" component={Krbk} />
        <Route path="/works/b-p" component={BP} />
        <Route>
          <div className="h-screen w-full flex items-center justify-center bg-[#121212] text-[#ececec]">
            <h1 className="text-[14px] uppercase tracking-widest text-[rgba(236,236,236,0.4)]">
              404 — Nothing here
            </h1>
          </div>
        </Route>
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <Router />
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;
