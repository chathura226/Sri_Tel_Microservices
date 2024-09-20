import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
import styled from "styled-components";

const billsData = [
  {
    id: 1,
    date: "September 2023",
    amount: 100,
    status: "Paid",
  },
  {
    id: 2,
    date: "August 2023",
    amount: 120,
    status: "Pending",
  },
  {
    id: 3,
    date: "July 2023",
    amount: 90,
    status: "Unpaid",
  },
  {
    id: 4,
    date: "June 2023",
    amount: 110,
    status: "Paid",
  },
  {
    id: 5,
    date: "May 2023",
    amount: 130,
    status: "Pending",
  },
];

const PCardWrapper = styled(Card)`
  width: 600px;
  margin: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #addfff;
  position: relative;
`;

const PCardHeader = styled.div`
  background-color: #053b50;
  color: white;
  padding: 10px;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
`;

const PCardFooter = styled(CardActions)`
  justify-content: flex-end;
`;

const PCardStatus = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: ${(props) => props.statusColor};
  color: white;
  padding: 2px 6px;
  border-bottom-left-radius: 0px;
  border-top-right-radius: 8px;
`;

const PCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const BillViewer = () => {
  const [currentBillIndex, setCurrentBillIndex] = useState(0);

  const currentBill = billsData[currentBillIndex];

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

  const handlePayBill = () => {
    // Add logic to handle bill payment here
    console.log(`Paid bill for ${currentBill.date}`);
  };

  return (
    <PCardContainer>
      {billsData.map((bill) => (
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
              onClick={handlePayBill}
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
