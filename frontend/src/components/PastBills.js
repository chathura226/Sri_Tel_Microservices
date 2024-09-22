import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Grid,
  Chip
} from '@mui/material';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';

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
        Authorization: `Bearer ${user.token}`
      }
    };
    setAuthConfig(config);
    fetchBills(config);
  }, []);

  const fetchBills = async (config) => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/billing/my-bills', config);
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'PAID':
        return 'success';
      case 'PENDING':
        return 'warning';
      default:
        return 'error';
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

  return (
    <Grid container spacing={3}>
      {bills.map((bill) => (
        <Grid item xs={12} sm={6} md={4} key={bill.billId}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Bill ID: {bill.billId}</Typography>
              <Typography>Mobile: {bill.billAccount.mobileNumber}</Typography>
              <Typography>Amount: LKR {bill.amount.toFixed(2)}</Typography>
              <Typography>
                Period: {new Date(bill.billingPeriodStart).toLocaleDateString()} - {new Date(bill.billingPeriodEnd).toLocaleDateString()}
              </Typography>
              <Box mt={2}>
                <Chip label={bill.status} color={getStatusColor(bill.status)} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default BillViewer;