import React from 'react';
import { Card, CardContent, Typography, Button, CardActions, Box, Grid } from '@mui/material';
import styled from 'styled-components';

// Styled components
const PCardWrapper = styled(Card)`
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: white;
`;

const PCardHeader = styled.div`
  background-color: hsl(233deg 36% 38%);
  color: white;
  padding: 10px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  text-align: center;
`;

const PCardFooter = styled(CardActions)`
  justify-content: flex-end;
`;

const PCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
`;

const PaymentBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
`;

// Main component
const Payment = () => {
  return (
    <div>
      <PCardContainer>
        <PCardWrapper>
          {/* Card Header */}
          <PCardHeader>
            <Typography variant="h4" component="h2">
              Payment Gateway
            </Typography>
          </PCardHeader>

          {/* Card Content */}
          <CardContent>
            <PaymentBox>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Total Amount:
              </Typography>
              <Typography variant="body1" sx={{ color: 'gray' }}>
                Rs. 999.00
              </Typography>
            </PaymentBox>

            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
              <Button variant="contained" color="primary" size="large" sx={{ width: '100%' }} style={{backgroundColor: "var(--primary)"}}>
                Pay Now
              </Button>
            </Box>
          </CardContent>

          {/* Footer can be added if needed */}
          <PCardFooter>
            {/* Footer Actions */}
          </PCardFooter>
        </PCardWrapper>
      </PCardContainer>
    </div>
  );
};

export default Payment;
