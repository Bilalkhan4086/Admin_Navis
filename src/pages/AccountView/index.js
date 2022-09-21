import React, { useState } from 'react';
import { Box, Container, Divider, Tab, Tabs, Typography } from '@mui/material';
import General from './General';
import Notifications from './Notifications';
import Security from './Security';
import Page from '../../components/Page';

const AccountView = () => {
  const [currentTab, setCurrentTab] = useState('general');

  const tabs = [
    { value: 'general', label: 'General' },
    { value: 'notifications', label: 'Notifications' },
    { value: 'security', label: 'Security' },
  ];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  return (
    <Page
      // className={classes.root}
      title="Settings"
    >
      <Container maxWidth="xl">
        {/* <Header /> */}
        <Box>
          <Typography variant="h4" gutterBottom>
            Account Settings
          </Typography>
        </Box>
        <Box mt={3}>
          <Tabs
            onChange={handleTabsChange}
            scrollButtons="auto"
            value={currentTab}
            variant="scrollable"
            textColor="secondary"
          >
            {tabs.map((tab) => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </Tabs>
        </Box>
        <Divider />
        <Box mt={3}>
          {currentTab === 'general' && <General />}
          {currentTab === 'notifications' && <Notifications />}
          {currentTab === 'security' && <Security />}
        </Box>
      </Container>
    </Page>
  );
};

export default AccountView;
