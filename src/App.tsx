import { useEffect } from "react";
import { DataProvider } from "@/store/DataContext";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Programs from "@/pages/Programs";
import Opportunities from "@/pages/Opportunities";
import Join from "@/pages/Join";
import Community from "@/pages/Community";
import Events from "@/pages/Events";
import Impact from "@/pages/Impact";
import Contact from "@/pages/Contact";
import AdminApp from "@/admin/AdminApp";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <DataProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/admin/*" element={<AdminApp />} />
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/opportunities" element={<Opportunities />} />
              <Route path="/join" element={<Join />} />
              <Route path="/community" element={<Community />} />
              <Route path="/events" element={<Events />} />
              <Route path="/impact" element={<Impact />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </DataProvider>
  );
}
