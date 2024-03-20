import React, { useContext } from 'react';

import './IssueList.scss';
import { AppContext } from '../../contexts/AppContext';

const IssueList = () => {
    const appCtx = useContext(AppContext);
    
    return (
        <div>IssueList...</div>
    );
};

export default IssueList;