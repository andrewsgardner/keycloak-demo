import React, { useContext } from 'react';

import './IssueDetail.scss';
import { AppContext } from '../../contexts/AppContext';

const IssueDetail = () => {
    const appCtx = useContext(AppContext);
    
    return (
        <div>IssueDetail...</div>
    );
};

export default IssueDetail;