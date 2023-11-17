import React, { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';

import './TokenViz.scss';
import { Card, CardContent, Typography } from '@mui/material';

const TokenViz = () => {
    const appCtx = useContext(AppContext);
    
    return (
        <div className="token-vis">
            <Card>
                <CardContent>
                    <Typography variant="h5" component="div">Auth Token</Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">Base64 Encoded</Typography>
                    <Typography variant="body2">
                        {appCtx.state.accessToken ? appCtx.state.accessToken : ''}
                    </Typography>
                </CardContent>
            </Card>

            <Card>
                <CardContent>
                    <Typography variant="h5" component="div">Parsed Auth Token</Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">JavaScript Object</Typography>
                    <Typography variant="body2" component="div">
                        {appCtx.state.accessTokenParsed ? <pre>{JSON.stringify(appCtx.state.accessTokenParsed, null, 2)}</pre> : ''}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default TokenViz;