/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Accommodation from "./pages/Accommodation";
import Restaurant from "./pages/Restaurant";
import Conference from "./pages/Conference";
import Casino from "./pages/Casino";
import Offers from "./pages/Offers";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/accommodation" element={<Accommodation />} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/conference" element={<Conference />} />
          <Route path="/casino" element={<Casino />} />
          <Route path="/offers" element={<Offers />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}