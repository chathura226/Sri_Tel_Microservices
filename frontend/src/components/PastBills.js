import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Grid,
  Chip, Button, CardActions
} from '@mui/material';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import {styled} from "@mui/material/styles";


const PCardWrapper = styled(Card)(({ theme }) => ({
  width: 600,
  margin: 20,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 8,
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#addfff",
  position: "relative",
}));

const PCardHeader = styled("div")(({ theme }) => ({
  backgroundColor: "#053b50",
  color: theme.palette.common.white,
  padding: 10,
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
}));

const PCardFooter = styled(CardActions)({
  justifyContent: "flex-end",
});

const PCardStatus = styled("div")(({ theme, statusColor }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  backgroundColor: statusColor,
  color: theme.palette.common.white,
  padding: "2px 6px",
  borderBottomLeftRadius: 8,
  borderTopRightRadius: 8,
}));

const PCardContainer = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
});

const LoadingContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "200px",
});


const BillViewer = () => {
  const { user } = useAuthContext();
  const [authConfig, setAuthConfig] = useState(null);
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;
    const config = {
      headers: {
        Authorization: `Bearer ${user.accessToken}`
      }
    };
    setAuthConfig(config);
    fetchBills(config);
  }, []);

  const fetchBills = async (config) => {
    try {
      setLoading(true);
      const response = await axios.get('api/billing/my-bills', config);
      if (response.data.code === '00' && response.data.content) {
        setBills(response.data.content);
      } else {
        setError('Failed to retrieve bills. Please try again later.');
      }
    } catch (err) {
      console.error('Error fetching bills:', err);
      setError('An error occurred while fetching bills. Please try again later.');
    } finally {
      setLoading(false);
    }
  };



  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }
  const handlePayBill = (billId) => {
    axios
        .post(`api/billing/pay-bill/${billId}`, null, authConfig)
        .then((response) => {
          console.log(`Paid bill ${billId}`);
          // Refresh the bills after payment
          fetchBills();
        })
        .catch((error) => {
          console.error("Error paying bill:", error);
          setError("Failed to process payment. Please try again later.");
        });
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "PAID":
        return "green";
      case "PENDING":
        return "orange";
      default:
        return "red";
    }
  };
  return (
      <PCardContainer>
        {bills.map((bill) => (
              <PCardWrapper key={bill.billId}>
                <PCardHeader>
                  <Typography variant="h5">Bill ID: {bill.billId}</Typography>
                </PCardHeader>
                <CardContent>
                  <Typography variant="body1">Mobile Number: {bill.billAccount.mobileNumber}</Typography>
                  <Typography variant="body1">Amount: {bill.amount} LKR</Typography>
                  <Typography variant="body1">
                    Period: {new Date(bill.billingPeriodStart).toLocaleDateString()} - {new Date(bill.billingPeriodEnd).toLocaleDateString()}
                  </Typography>
                </CardContent>
                <PCardFooter>
                  <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handlePayBill(bill.billId)}
                      disabled={bill.status === "PAID"}
                  >
                    Pay Bill
                  </Button>
                </PCardFooter>
                <PCardStatus statusColor={getStatusColor(bill.status)}>
                  {bill.status}
                </PCardStatus>
              </PCardWrapper>
          )
        )}
      </PCardContainer>
  );
};

export default BillViewer;