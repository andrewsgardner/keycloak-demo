import React, { useContext } from 'react';

import { Accordion, AccordionDetails, AccordionSummary, Box, CircularProgress, Typography } from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import './Dashboard.scss';
import { AppContext } from '../../contexts/AppContext';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import routes from '../../routes';

const Dashboard = () => {
  const router = createBrowserRouter(routes);
  const appCtx = useContext(AppContext);
  
  return (
    <Box>
      <Accordion sx={{
        borderRadius: '4px',
        marginBottom: '16px',
        '::before': {
          display: 'none',
        }
      }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1-header">
          <Typography sx={{
            flexGrow: 1,
            flexBasis: 0,
            dislay: 'flex',
            alignItems: 'center',
            marginRight: '16px',
            fontWeight: 500,
          }}>Access Token</Typography>
          <Typography sx={{
            flexGrow: 2,
            flexBasis: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignContent: 'center',
            marginRight: '16px',
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: '24px',
            color: 'text.secondary',
            }}>
              OpenID Connect <KeyIcon />
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="description">
            <p>A token that allows a client to access a specific resource to perform specific actions on behalf of the user.</p>
          </div>
          { appCtx.state.accessTokenParsed ? <pre>{JSON.stringify(appCtx.state.accessTokenParsed, null, 2)}</pre> : '' }
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{
        borderRadius: '4px',
        marginBottom: '16px',
        '::before': {
          display: 'none',
        }
      }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel2-header">
          <Typography sx={{
            flexGrow: 1,
            flexBasis: 0,
            dislay: 'flex',
            alignItems: 'center',
            marginRight: '16px',
            fontWeight: 500,
          }}>Identity Token</Typography>
          <Typography sx={{
            flexGrow: 2,
            flexBasis: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignContent: 'center',
            marginRight: '16px',
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: '24px',
            color: 'text.secondary',
            }}>
              OpenID Connect <KeyIcon />
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="description">
            <p>A token that provides identity information about the user.</p>
          </div>
          { appCtx.state.idTokenParsed ? <pre>{JSON.stringify(appCtx.state.idTokenParsed, null, 2)}</pre> : '' }
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{
        borderRadius: '4px',
        marginBottom: '16px',
        '::before': {
          display: 'none',
        }
      }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel3-header">
          <Typography sx={{
            flexGrow: 1,
            flexBasis: 0,
            dislay: 'flex',
            alignItems: 'center',
            marginRight: '16px',
            fontWeight: 500,
          }}>Refresh Token</Typography>
          <Typography sx={{
            flexGrow: 2,
            flexBasis: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignContent: 'center',
            marginRight: '16px',
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: '24px',
            color: 'text.secondary',
            }}>
              OpenID Connect <KeyIcon />
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="description">
            <p>A token used to request a new access token in cases where it is expired.</p>
          </div>
          { appCtx.state.refreshTokenParsed ? <pre>{JSON.stringify(appCtx.state.refreshTokenParsed, null, 2)}</pre> : '' }
        </AccordionDetails>
      </Accordion>
      <Accordion 
        sx={{
          borderRadius: '4px',
          '::before': {
            display: 'none',
          },
      }} defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel4-header">
          <Typography sx={{
            flexGrow: 1,
            flexBasis: 0,
            dislay: 'flex',
            alignItems: 'center',
            marginRight: '16px',
            fontWeight: 500,
          }}>App Data</Typography>
          <Typography sx={{
            flexGrow: 2,
            flexBasis: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignContent: 'center',
            marginRight: '16px',
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: '24px',
            color: 'text.secondary',
            }}>
              Access Control <AccountCircleIcon />
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="app-content">
            <RouterProvider router={router} fallbackElement={<CircularProgress />} />
          </div>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Dashboard;