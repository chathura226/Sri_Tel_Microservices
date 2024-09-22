import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Button, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";

const CBillContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  marginTop: '50px',
  backgroundColor: 'hsl(233deg 36% 38%)',
});

const CBillCard = styled(Card)({
  width: '100%',
  maxWidth: '1000px',
  textAlign: 'center',
  background: 'hsl(233deg 36% 38%)',
  color: 'white',
});

const CBillContent = styled(CardContent)({
  padding: '20px',
});

const CBillHeader = styled(Typography)({
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '20px',
});

const CPayNowButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'white',
  color: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.grey[300],
  },
}));

const Divider = styled('hr')({
  margin: '20px 0',
  border: 'none',
  borderTop: '1px solid rgba(255, 255, 255, 0.2)',
});

const CurrentBill = () => {
  const [currentBill, setCurrentBill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCurrentBill();
  }, []);

  const fetchCurrentBill = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/api/billing/current-bill");
      setCurrentBill(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching current bill:", err);
      setError("Failed to load current bill. Please try again later.");
      setLoading(false);
    }
  };

  const handlePayNow = async () => {
    try {
      await axios.post(`http://localhost:8080/api/billing/pay-bill/${currentBill.id}`);
      // Refresh the current bill data after payment
      fetchCurrentBill();
    } catch (err) {
      console.error("Error paying bill:", err);
      setError("Failed to process payment. Please try again later.");
    }
  };

  if (loading) {
    return (
      <CBillContainer>
        <CircularProgress />
      </CBillContainer>
    );
  }

  if (error) {
    return (
      <CBillContainer>
        <Typography color="error">{error}</Typography>
      </CBillContainer>
    );
  }

  return (
    <CBillContainer>
      <CBillCard>
        <CBillContent>
          <CBillHeader variant="h5">Total Payable</CBillHeader>
          <Typography variant="h4">LKR. {currentBill ? currentBill.amount : 0}</Typography>
          <Divider />
          <Typography variant="body1">
            For month ending at: {currentBill ? currentBill.date : 'N/A'}
          </Typography>
          <Divider />
          <CPayNowButton 
            variant="contained" 
            onClick={handlePayNow}
            disabled={!currentBill || currentBill.status === 'Paid'}
          >
            {currentBill && currentBill.status === 'Paid' ? 'Paid' : 'Pay Now'}
          </CPayNowButton>
        </CBillContent>
      </CBillCard>
    </CBillContainer>
  );
};

export default CurrentBill;