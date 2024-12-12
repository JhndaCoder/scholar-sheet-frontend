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
  const [isDownloading, setIsDownloading] = useState(false); // Loading state

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
    if (isDownloading) return;

    setIsDownloading(true);

    const content = document.querySelector('.main-content');
    if (!content) {
      setIsDownloading(false);
      return;
    }

    const contentClone = content.cloneNode(true);

    const filtersToRemove = contentClone.querySelectorAll(
      '.filters, .pagination, .controls, .dropdowns, .chart-controls'
    );
    filtersToRemove.forEach((filter) => filter.parentNode.removeChild(filter));

    const overlayInClone = contentClone.querySelector('.loading-overlay');
    if (overlayInClone) {
      overlayInClone.parentNode.removeChild(overlayInClone);
    }

    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.top = '-9999px';
    tempContainer.style.left = '-9999px';
    tempContainer.style.width = `${content.offsetWidth}px`;
    tempContainer.appendChild(contentClone);
    document.body.appendChild(tempContainer);

    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      const canvas = await html2canvas(contentClone, {
        useCORS: true,
        allowTaint: false,
        scale: 2,
      });

      document.body.removeChild(tempContainer);

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      const ratio = pdfWidth / canvasWidth;
      const scaledHeight = canvasHeight * ratio;

      let heightLeft = scaledHeight;
      let pageHeight = pdfHeight - 10;
      let sourceY = 0;
      let isFirstPage = true;

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(16);
      pdf.text('Custom Report', pdfWidth / 2, 10, { align: 'center' });

      while (heightLeft > 0) {
        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvas.width;
        pageCanvas.height = pageHeight / ratio;

        const pageContext = pageCanvas.getContext('2d');
        pageContext.drawImage(
          canvas,
          0,
          sourceY,
          canvas.width,
          pageHeight / ratio,
          0,
          0,
          canvas.width,
          pageHeight / ratio
        );

        const pageImgData = pageCanvas.toDataURL('image/png');
        pdf.addImage(
          pageImgData,
          'PNG',
          0,
          isFirstPage ? 20 : 10,
          pdfWidth,
          pdfHeight - 20
        );

        heightLeft -= pageHeight;
        sourceY += pageHeight / ratio;

        if (heightLeft > 0) {
          pdf.addPage();
          isFirstPage = false;
        }
      }

      const currentDate = new Date()
        .toISOString()
        .replace(/T/, '_')
        .replace(/:/g, '-')
        .slice(0, 19);
      const fileName = `report_${currentDate}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating the PDF:', error);
    } finally {
      setIsDownloading(false);
      if (tempContainer.parentNode) {
        document.body.removeChild(tempContainer);
      }
    }
  };

  return (
    <Fragment>
      <div className="dashboard-container">
        <SideBar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onDownload={handleDownloadReport}
          sideBarInfo={sideBarInfo}
        />
        <div className="dashboard-content">
          <Navbar />
          <div className="main-content">
            {isDownloading && (
              <div className="loading-overlay">
                <p>Downloading report... Please wait.</p>
              </div>
            )}
            <Outlet />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
