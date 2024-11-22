import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useMainHome } from '../../../../context/MainHomeContext';

const Report = () => {
  const { mainHomeContent } = useMainHome();

  const generatePDF = async () => {
    if (!mainHomeContent) {
      console.error('No content available to generate the PDF.');
      return;
    }

    const applyStyles = (element, styles) => {
      Object.entries(styles).forEach(([key, value]) => {
        element.style[key] = value;
      });
    };

    const container = document.createElement('div');
    container.classList.add('pdf-container');

    const header = document.createElement('div');
    header.innerHTML = '<h1>Institute Analytics Report</h1>';
    applyStyles(header, {
      textAlign: 'center',
      marginBottom: '20px',
      fontSize: '24px',
      fontWeight: 'bold',
      fontFamily: 'Arial, sans-serif',
    });
    container.appendChild(header);

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = mainHomeContent;

    const sections = [
      {
        selector: '.stats-cards',
        styles: {
          backgroundColor: '#f9f9f9',
          padding: '10px',
          borderRadius: '8px',
          marginBottom: '20px',
        },
      },
      {
        selector: '.analytics-dashboard',
        styles: {
          backgroundColor: '#eef2f7',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
        },
      },
      {
        selector: '.top-researchers-container',
        styles: { padding: '15px', borderRadius: '8px', marginBottom: '20px' },
      },
      {
        selector: '.research-topics-chart',
        styles: { padding: '15px', borderRadius: '8px', marginBottom: '20px' },
      },
      {
        selector: '.journal-diversity-chart',
        styles: { padding: '15px', borderRadius: '8px', marginBottom: '20px' },
      },
      {
        selector: '.top-publications',
        styles: { padding: '15px', borderRadius: '8px', marginBottom: '20px' },
      },
    ];

    for (const { selector, styles } of sections) {
      const element = tempDiv.querySelector(selector);
      if (element) {
        [
          '.pagination',
          '.filters',
          '.controls',
          '.dropdowns',
          '.chart-controls',
        ].forEach((unwanted) => {
          const toRemove = element.querySelector(unwanted);
          if (toRemove) toRemove.remove();
        });

        const charts = element.querySelectorAll('svg');
        for (const chart of charts) {
          try {
            const canvas = await html2canvas(chart, {
              useCORS: true,
              foreignObjectRendering: false,
            });
            const img = document.createElement('img');
            img.src = canvas.toDataURL('image/png');
            chart.parentNode.replaceChild(img, chart);
          } catch (error) {
            console.warn('Error rendering chart:', error);
          }
        }

        applyStyles(element, styles);
        container.appendChild(element);
      }
    }

    document.body.appendChild(container);

    try {
      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        foreignObjectRendering: false,
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.8);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const canvasHeight = (canvas.height * pdfWidth) / canvas.width;

      let position = 0;

      while (position < canvasHeight) {
        pdf.addImage(imgData, 'JPEG', 0, -position, pdfWidth, canvasHeight);
        position += pageHeight;
        if (position < canvasHeight) {
          pdf.addPage();
        }
      }

      pdf.save('institute_analytics_report.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      document.body.removeChild(container);
    }
  };

  return (
    <button onClick={generatePDF} className="download-pdf-btn">
      Download PDF
    </button>
  );
};

export default Report;
