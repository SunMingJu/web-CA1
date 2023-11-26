import React from "react";
import { createRoot } from "react-dom/client";
// eslint-disable-next-line no-unused-vars
import { BrowserRouter, Route, Navigate, Routes, Link } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader';
import UpcomingMoviesPage from './pages/upComingMoviesPage';
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import PersonPage from './pages/personPage';
import PersonDetailsPage from './pages/personDetailsPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
     <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
          <Routes>
          <Route path="/reviews/form" element={<AddMovieReviewPage />} />
          <Route exact path="/movies/favorites/page:pagination" element={<FavoriteMoviesPage />} />
          <Route exact path="/movies/upcoming/page:pagination" element={<UpcomingMoviesPage />} />
          <Route path="/movies/:id" element={<MoviePage />} />
          <Route path="/reviews/:id" element={<MovieReviewPage />} />
          <Route path="/page:pagination" element={<HomePage />} />
          <Route path="*" element={ <Navigate to="/page1" /> } />
          <Route path="/person/" element={ <PersonPage/> } />
          <Route path="/person/:id" element={ <PersonDetailsPage/> } />
          </Routes>
          </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);