import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";

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
  const [paymentError, setPaymentError] = useState(null);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  useEffect(() => {
    if (!user) {
      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    };
    fetchBills(config);
    setAuthConfig(config);
  }, [user]);

  const fetchBills = (config) => {
    setLoading(true);
    axios
        .get("api/billing/my-bills", config)
        .then((response) => {
          if (response.data.code === "00" && response.data.content) {
            setBills(response.data.content);
          } else {
            setError("Failed to retrieve bills. Please try again later.");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching bills:", error);
          setError("An error occurred while fetching bills. Please try again later.");
          setLoading(false);
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

  const handleOpenPaymentModal = (bill) => {
    setSelectedBill(bill);
    setOpenPaymentModal(true);
  };

  const handleClosePaymentModal = () => {
    setOpenPaymentModal(false);
    setSelectedBill(null);
    setCardNumber("");
    setExpiryDate("");
    setCvv("");
  };

  const handlePayBill = () => {
    if (!selectedBill) return;

    // Here you would typically validate the payment information
    if (!cardNumber || !expiryDate || !cvv) {
      setPaymentError("Please fill in all payment details.");

    }else {

      // Call your payment API here
      axios
          .post(`api/billing/pay-bill/${selectedBill.billId}`,
              {
                paymentMethod:"CARD",
                "amount":selectedBill.amount,
              },
              authConfig
          )
          .then((response) => {
            console.log(`Paid bill ${selectedBill.billId}`);
            handleClosePaymentModal();
            fetchBills(authConfig);
          })
          .catch((error) => {
            console.error("Error paying bill:", error);
            setPaymentError("Failed to process payment. Please try again later.");
          });
    }
  };

  if (loading) {
    return (
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
      <>
        <PCardContainer>
          {bills.map((bill) => {
            if(bill.status=="PENDING") return(
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
                        onClick={() => handleOpenPaymentModal(bill)}
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
          })}
        </PCardContainer>

        <Dialog open={openPaymentModal} onClose={handleClosePaymentModal}>
          <DialogTitle>Payment Gateway</DialogTitle>
          <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="card-number"
                label="Card Number"
                type="text"
                fullWidth
                variant="standard"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
            />
            <TextField
                margin="dense"
                id="expiry-date"
                label="Expiry Date (MM/YY)"
                type="text"
                fullWidth
                variant="standard"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
            />
            <TextField
                margin="dense"
                id="cvv"
                label="CVV"
                type="text"
                fullWidth
                variant="standard"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
            />
            {selectedBill && (
                <Typography variant="body1" style={{ marginTop: 20 }}>
                  Amount to pay: {selectedBill.amount} LKR
                </Typography>
            )}
            {paymentError && <Typography variant="body1" color="error" style={{ marginTop: 20 }}>
              {paymentError}
            </Typography>}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClosePaymentModal}>Cancel</Button>
            <Button onClick={handlePayBill}>Pay</Button>
          </DialogActions>
        </Dialog>
      </>
  );
};

export default BillViewer;