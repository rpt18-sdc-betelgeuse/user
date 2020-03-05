import React from 'react';
import styled from 'styled-components';

const ReportButtonContainer = styled.div`
  margin-top: 23px;
  margin-left: 10px;
  cursor: pointer;
`;

function Report(props) {

  return (
    <ReportButtonContainer>
      <span className="report_button_span">
        <a className="report_button_a">
          <span className="report_button_exclamation_icon">
            <i className="fas fa-diamond fa-lg"></i>
            <i className="fas fa-exclamation fa-xs" ></i>
          </span>
          <span className="report_text">Report</span></a>
      </span>
    </ReportButtonContainer>
  )
};
export default Report;