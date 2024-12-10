import { Fragment, useState, useEffect } from 'react';
import { SideBar } from '../../organisms/SideBar/SideBar';
import Navbar from '../../organisms/Navbar/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

import './Dashboard.scss';

const sideBarInfo = [
  {
    title: 'Dashboard',
    icon: 'dashboard',
    path: '/home',
  },
  {
    title: 'Researchers',
    icon: 'person',
    path: '/home/researchers',
  },
  {
    title: 'Add Faculty',
    icon: 'group_add',
    path: '/home/addFaculty',
  },
  {
    title: 'Settings',
    icon: 'settings',
    path: '/home/settings',
  },
  {
    title: 'Rank Data',
    icon: 'data_usage',
    path: '/home/rankings',
  },
  {
    title: 'Download Report',
    icon: 'download',
    action: 'download', // Special action for downloading
  },
];

const Dashboard = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const currentTabIndex = sideBarInfo.findIndex(
      (item) => item.path === location.pathname
    );
    setActiveTab(currentTabIndex !== -1 ? currentTabIndex : 0);
  }, [location]);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  const handleDownloadReport = async () => {
    const content = document.querySelector('.main-content');
    if (!content) return;

    // Force rendering of the full content
    const originalStyle = content.style.cssText;
    content.style.height = 'auto';
    content.style.overflow = 'visible';

    // Wait for lazy-loaded elements to render
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Generate canvas from the content
    const canvas = await html2canvas(content, {
      useCORS: true, // Allow cross-origin resources
      scale: 2, // High-resolution
      allowTaint: true, // Allow images from other domains
    });

    // Restore the original styles
    content.style.cssText = originalStyle;

    // Get canvas dimensions
    // const imgData = canvas.toDataURL ('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Calculate the height of the canvas scaled to the PDF's width
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const ratio = pdfWidth / canvasWidth;
    const scaledHeight = canvasHeight * ratio;

    let position = 0;
    let heightLeft = scaledHeight;

    // Loop through the content, splitting it across multiple pages
    while (heightLeft > 0) {
      const sourceY = (position / scaledHeight) * canvasHeight; // Corresponding canvas position
      const pageCanvas = document.createElement('canvas');
      pageCanvas.width = canvas.width;
      pageCanvas.height = (pdfHeight / pdfWidth) * canvas.width; // Page's height in canvas units

      const pageContext = pageCanvas.getContext('2d');
      pageContext.drawImage(
        canvas,
        0,
        sourceY,
        canvas.width,
        pageCanvas.height,
        0,
        0,
        pageCanvas.width,
        pageCanvas.height
      );

      const pageImgData = pageCanvas.toDataURL('image/png');
      pdf.addImage(pageImgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      heightLeft -= pdfHeight;
      position += pdfHeight;

      if (heightLeft > 0) {
        pdf.addPage();
      }
    }

    // Save the PDF
    pdf.save('report.pdf');
  };

  return (
    <Fragment>
      <div className="dashboard-container">
        <SideBar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onDownload={handleDownloadReport} // Pass download handler
          sideBarInfo={sideBarInfo}
        />
        <div className="dashboard-content">
          <Navbar />
          <div className="main-content">
            <Outlet />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
