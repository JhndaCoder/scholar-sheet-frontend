import { useLayoutEffect } from 'react';
import mermaid from 'mermaid';
import './FlowChart.scss';

const ScholarSheetFlowchart = () => {
  useLayoutEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'base',
      themeVariables: {
        background: '#f0f0f0',
        primaryColor: '#3099ea',
        primaryBorderColor: '#2673b8',
        primaryTextColor: '#ffffff',
        secondaryColor: '#ffffff',
        secondaryTextColor: '#2673b8',
        tertiaryColor: '#f9f9f9',
        tertiaryTextColor: '#3099ea',
        edgeLabelBackground: '#f0f0f0',
        fontFamily: '"Roboto", sans-serif',
        fontSize: '14px',
        padding: 15,
      },
      flowchart: {
        // curve: 'basis',
        curve: 'linear',
        useMaxWidth: true,
        htmlLabels: true,
      },
    });

    mermaid.contentLoaded();
  }, []);

  const mermaidGraph = `
  graph TD
      subgraph General Navigation
          A[Landing Page] --> B{Choose Option}
          B --> C[Login as Admin]
          B --> D[Enter Google Scholar ID/URL to View Profile]
      end
  
      subgraph Admin Options
          C --> E[View Organization Stats]
          C --> Q[Generate Report]
          C --> S[Add Faculty]
          C --> U[Organization Rankings]
          C --> V[Change Settings]
      end
  
      subgraph Organization Stats
          E --> F[Total Citations and Papers Comparison]
          E --> G[Generate Yearly Stats]
          E --> H[Analytics Graph - Yearwise Trends]
          E --> I[Top Researchers by Criteria]
          E --> J[Top Research Topics - Pie Chart]
          E --> K[Journal Diversity - Pie Chart]
          E --> L[Top Publications and Access All Publications]
          E --> M[View All Researchers]
          M --> N[Search/Update/Delete Profiles]
          M --> O[Filter by Criteria]
          E --> P[Individual Researcher Stats]
      end
  
      subgraph Reports and Settings
          Q --> R[Choose Data to Include]
          V --> W[Default Department]
          V --> X[Themes]
      end
  
      subgraph Profile Navigation
          D --> Y[View Stats of Your Profile]
      end
  
      subgraph Faculty Management
          S --> T[Add Individually or Bulk Upload CSV]
      end
  `;

  return (
    <div id="scholarFlowchart" className="mermaid-container">
      <div className="mermaid">{mermaidGraph}</div>
    </div>
  );
};

export default ScholarSheetFlowchart;
