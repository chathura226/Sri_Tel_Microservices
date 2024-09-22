import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
import { styled } from "@mui/material/styles";
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

const BillViewer = () => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = () => {
    axios
      .get("http://localhost:8080/api/billing/my-bills")
      .then((response) => {
        setBills(response.data);
      })
      .catch((error) => {
        console.error("Error fetching bills:", error);
      });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "green";
      case "Unpaid":
        return "red";
      default:
        return "orange";
    }
  };

  const handlePayBill = (billId) => {
    axios
      .post(`http://localhost:8080/api/billing/pay-bill/${billId}`)
      .then((response) => {
        console.log(`Paid bill ${billId}`);
        // Refresh the bills after payment
        fetchBills();
      })
      .catch((error) => {
        console.error("Error paying bill:", error);
      });
  };

  return (
    <PCardContainer>
      {bills.map((bill) => (
        <PCardWrapper key={bill.id}>
          <PCardHeader>
            <Typography variant="h5">Bill ID: {bill.id}</Typography>
          </PCardHeader>
          <CardContent>
            <Typography variant="h6">Date: {bill.date}</Typography>
            <Typography variant="body1">Amount: {bill.amount} LKR</Typography>
          </CardContent>
          <PCardFooter>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handlePayBill(bill.id)}
              disabled={bill.status === "Paid"}
            >
              Pay Bill
            </Button>
          </PCardFooter>
          <PCardStatus statusColor={getStatusColor(bill.status)}>
            {bill.status}
          </PCardStatus>
        </PCardWrapper>
      ))}
    </PCardContainer>
  );
};

export default BillViewer;
