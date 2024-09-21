import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
import { Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import styled from "styled-components";
import axios from "axios";

const billsData = [
  {
    id: 1,
    name: "Triple Blaster 499",
    price: 489,
    permin: 1.5,
    voice: "Anytime",
    amount: 100,
    discription: "1000 Any Network Minutes & SMS",
    discription2: "Applicable taxes to be added to the rental",
  },
  {
    id: 2,
    name: "Triple Blaster 582",
    price: 592,
    permin: 3,
    voice: "Anytime",
    amount: 120,
    discription: "1000 Any Network Minutes & SMS",
    discription2: "1000 SMS to Any Network",
  },

  {
    id: 3,
    name: "Triple Blaster 499",
    price: 654,
    permin: 6,
    voice: "Anytime",
    amount: 110,
    discription: "1000 Any Network Minutes & SMS",
    discription2: "1000 SMS to Any Network",
  },

  {
    id: 4,
    name: "Work & Learn 654",
    price: 1307,
    permin: 12,
    voice: "Anytime Work & Learn Data",
    amount: 90,
    discription: "Applicable Platforms : Zoom, Google Microsoft",
    discription2: "Education Apps & Web Browsing",
  },

  {
    id: 5,
    name: "Work & Learn 1307",
    price: 1499,
    permin: 15,
    voice: "Anytime Work & Learn Data",
    amount: 130,
    discription: "Applicable Platforms : Zoom, Google Microsoft",
    discription2: "Education Apps & Web Browsing",
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

const DataServices = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/package/all")
      .then(function (response) {
        setPackages(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);
  const userId = 1;

  const ActivatePackage = (id) => {
    axios
      .post(`http://localhost:8080/api/package/activate/${id}`)
      .then((response) => {
        if (response.status === 200) {
          alert("Successfully Activated");
        }
      })
      .catch((error) => {
        alert("Failed to activate");
      });
  };
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
      {packages.map((bill) => (
        <PCardWrapper key={bill.id}>
          <Box
            className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow "
            sx={{
              textAlign: "center",
              color: "text.primary",
              bg: "background.paper",
              border: 1,
              borderColor: "grey.100",
              boxShadow: 1,
            }}
          >
            <PCardHeader>
              <Typography
                variant="h4"
                component="h3"
                sx={{ fontWeight: "bold" }}
              >
                {bill.name}
              </Typography>
            </PCardHeader>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "baseline",
                my: 2,
              }}
            >
              <Typography
                variant="h3"
                component="span"
                sx={{ mr: 2, fontWeight: "bold", color: "#64ccc5" }}
              >
                Rs.{bill.price}.00
              </Typography>
              <Typography variant="body1" color="text.secondary">
                /month
              </Typography>
            </Box>

            {/* <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', mt:2 }}>
                                    <Typography variant="h3" component="span" sx={{ mr: 2, fontWeight: 'extrabold', color: '#053b50'}}>
                                    {bill.permin}GB
                                    </Typography>
                                </Box>

                                <Typography variant="body1" color="text.secondary" sx={{mb:2}}>
                                    {bill.voice}
                                </Typography>

                                <Typography variant="body1" color="text.primary" sx={{ textAlign: 'left',ml:6}}>
                                    {bill.discription}
                                </Typography>   
                                
                                <Typography variant="body1" color="text.primary" sx={{ textAlign: 'left',ml:6}}>
                                    {bill.discription2}
                                </Typography> */}

            <Button
              variant="contained"
              sx={{ width: 200, height: 48, mx: "auto", my: 5 }}
              onClick={() => ActivatePackage(bill.id)}
            >
              Get Package
            </Button>
          </Box>
        </PCardWrapper>
      ))}
    </PCardContainer>
  );
};

export default DataServices;
