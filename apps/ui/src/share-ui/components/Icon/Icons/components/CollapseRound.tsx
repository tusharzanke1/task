/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface CollapseRoundProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const CollapseRound: React.FC<CollapseRoundProps> = ({size, ...props}) => (
  <svg viewBox="0 0 20 20" fill="currentColor" width={ size || "20" } height={ size || "20" } {...props}>
    <path d="M4.36386 4.36386C5.85865 2.86906 7.88603 2.0293 9.99999 2.0293C12.1139 2.0293 14.1413 2.86906 15.6361 4.36386C17.1309 5.85865 17.9707 7.88603 17.9707 9.99999C17.9707 12.1139 17.1309 14.1413 15.6361 15.6361C14.1413 17.1309 12.1139 17.9707 9.99999 17.9707C7.88603 17.9707 5.85865 17.1309 4.36386 15.6361C2.86906 14.1413 2.0293 12.1139 2.0293 9.99999C2.0293 7.88603 2.86906 5.85865 4.36386 4.36386ZM9.99999 3.5293C8.28385 3.5293 6.63801 4.21103 5.42452 5.42452C4.21103 6.63801 3.5293 8.28385 3.5293 9.99999C3.5293 11.7161 4.21103 13.362 5.42452 14.5755C6.63801 15.7889 8.28385 16.4707 9.99999 16.4707C11.7161 16.4707 13.362 15.7889 14.5755 14.5755C15.7889 13.362 16.4707 11.7161 16.4707 9.99999C16.4707 8.28385 15.7889 6.63801 14.5755 5.42452C13.362 4.21103 11.7161 3.5293 9.99999 3.5293Z"
      fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
    <path d="M12.8106 5.99431C13.0898 6.30034 13.068 6.77472 12.7619 7.05385L10.6227 9.00508C10.5466 9.07793 10.4574 9.13719 10.3588 9.1792 10.2501 9.22555 10.1328 9.24975 10.0136 9.24975 9.89451 9.24975 9.77715 9.22555 9.66846 9.1792 9.57037 9.13737 9.48158 9.07848 9.40572 9.00618L7.25422 7.05536C6.94737 6.77713 6.92417 6.30282 7.2024 5.99597 7.48063 5.68911 7.95494 5.66591 8.26179 5.94414L10.0124 7.53149 11.7511 5.94562C12.0571 5.66648 12.5315 5.68828 12.8106 5.99431zM7.20223 14.0037C6.92402 13.6969 6.94725 13.2226 7.25413 12.9444L9.40591 10.9935C9.48181 10.9212 9.57061 10.8623 9.66862 10.8205 9.7774 10.7742 9.89476 10.75 10.0138 10.75 10.1329 10.75 10.2502 10.7742 10.359 10.8205 10.4576 10.8626 10.5468 10.9218 10.6229 10.9947L12.7616 12.9459C13.0676 13.2251 13.0893 13.6995 12.8101 14.0055 12.5309 14.3115 12.0566 14.3332 11.7506 14.054L10.0125 12.4683 8.26162 14.0556C7.95475 14.3338 7.48044 14.3106 7.20223 14.0037z"
      fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
  </svg>
);
CollapseRound.displayName = 'CollapseRound';
export default CollapseRound;
/* tslint:enable */
/* eslint-enable */
