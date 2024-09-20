import React from "react";
import styled from "styled-components";
import { Card, CardContent, Typography, Button } from "@mui/material";

const CBillContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-top: 50px;
  background-color: hsl(233deg 36% 38%);
`;

const CBillCard = styled(Card)`
  width: 100%;
  max-width: 1000px;
  text-align: center;
  background: hsl(233deg 36% 38%);
`;

const CBillContent = styled(CardContent)`
  padding: 20px;
`;

const CBillHeader = styled(Typography)`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const CPayNowButton = styled(Button)`
  background-color: white;
  color: #fff;
  &:hover {
    background-color: #0056b3;
  }
`;

const CurrentBill = () => {
  return (
    <CBillContainer>
      <CBillCard>
        <CBillContent>
          <CBillHeader>Total Payable</CBillHeader>
          <Typography variant="h4">LKR. 100</Typography>
          <br></br>
          <hr></hr>
          <Typography variant="body1">
            For month ending at: 2023, October
          </Typography>
          <hr></hr>
          <br></br>
          <CPayNowButton variant="contained">Pay Now</CPayNowButton>
        </CBillContent>
      </CBillCard>
    </CBillContainer>
  );
};

export default CurrentBill;
