import React from 'react';
import { Route, Switch } from 'react-router-dom';
//  COMPONENTS
import Home from './components/Home/Home'
import Layout from './components/Layout/Layout';

import NewsArticles from "./components/Articles/News/Posts/index";
import VideoArticle from "./components/Articles/Videos/Video/index";
import NewsMain from './components/Articles/News/Main/index';
import VideosMain from "./components/Articles/Videos/Main/index";
import Signin from './components/Signin/Signin';
import Dashboard from "./components/Dashboard/Dashboard";

const Routes = ({user}) => {

    return ( 
        <>
            <Layout user={user}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/news" exact component={NewsMain} />
                    <Route path="/articles/:id" exact component={NewsArticles} />
                    <Route path="/videos/:id" exact component={VideoArticle} />
                    <Route path="/videos" exact component={VideosMain} />
                    <Route path="/sign-in" component={Signin} />
                    <Route path="/dashboard" component={Dashboard} />
                 </Switch>
            </Layout>
        </>
     );
}
 
export default Routes;