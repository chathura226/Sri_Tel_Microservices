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
    id: 6,
    name: "PLAN 450",
    price: 550,
    permin: 1.4,
    voice: "D2D Voice",
    amount: 105,
    discription: "900 D2D SMS & 4GB Anytime DATA with rollover & sharing",
    discription2: "Applicable taxes to be added to the rental",
  },
  {
    id: 7,
    name: "PLAN 550",
    price: 650,
    permin: 1.6,
    voice: "D2D Voice",
    amount: 115,
    discription: "1200 D2D SMS & 6GB Anytime DATA with rollover & sharing",
    discription2: "Applicable taxes to be added to the rental",
  },
  {
    id: 8,
    name: "PLAN 650",
    price: 700,
    permin: 1.7,
    voice: "D2D Voice",
    amount: 95,
    discription: "1100 D2D SMS & 7GB Anytime DATA with rollover & sharing",
    discription2: "Applicable taxes to be added to the rental",
  },
  {
    id: 9,
    name: "PLAN 750",
    price: 750,
    permin: 1.8,
    voice: "D2D Voice",
    amount: 125,
    discription: "1500 D2D SMS & 8GB Anytime DATA with rollover & sharing",
    discription2: "Applicable taxes to be added to the rental",
  },
  {
    id: 10,
    name: "PLAN 850",
    price: 800,
    permin: 1.9,
    voice: "D2D Voice",
    amount: 135,
    discription: "1600 D2D SMS & 10GB Anytime DATA with rollover & sharing",
    discription2: "Applicable taxes to be added to the rental",
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

const VoiceService = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/package/all/POSTPAIDVOICE")
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
      .post(`http://localhost:8080/api/v1/package/activate/${userId}/${id}`)
      .then((response) => {
        if (response.status === 200) {
          alert("Successfully Activated");
        }
      })
      .catch((error) => {
        alert("Failed to activate");
      });
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

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "baseline",
                mt: 2,
              }}
            >
              <Typography
                variant="h3"
                component="span"
                sx={{ mr: 2, fontWeight: "extrabold", color: "#053b50" }}
              >
                Unlimited
              </Typography>
            </Box>

            {/* <Typography variant="body1" color="text.secondary" sx={{mb:2}}>
                                    {bill.voice}
                                </Typography> */}

            {/* <Typography variant="body1" color="text.primary" sx={{ textAlign: 'left',ml:6}}>
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

export default VoiceService;
