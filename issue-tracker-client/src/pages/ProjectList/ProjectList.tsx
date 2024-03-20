import React, { useContext } from 'react';

import './ProjectList.scss';
import { AppContext } from '../../contexts/AppContext';

const ProjectList = () => {
    const appCtx = useContext(AppContext);
    
    return (
        <div>ProjectList...</div>
    );
};

export default ProjectList;