import { Route, Routes } from 'react-router-dom';
import { AcademicPage } from './pages/AcademicPage';
import { HomePortalPage } from './pages/HomePortalPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PublicCoursePage } from './pages/PublicCoursePage';
import { PublicWebsitePage } from './pages/PublicWebsitePage';
import { SpecialCoursePage } from './pages/SpecialCoursePage';
import { SupportPage } from './pages/SupportPage';
import { SyllabusPage } from './pages/SyllabusPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePortalPage />} />
      <Route path="/support" element={<SupportPage />} />
      <Route path="/syllabus" element={<SyllabusPage />} />
      <Route path="/syllabus/course/:id" element={<PublicCoursePage />} />
      <Route path="/syllabus/entry/:token" element={<SpecialCoursePage />} />
      <Route path="/academic" element={<AcademicPage />} />
      <Route path="/home" element={<PublicWebsitePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
