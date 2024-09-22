import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Container,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

const PackageCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

const PackageCardHeader = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(2),
}));

const PackageCardContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

const PriceTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
  marginBottom: theme.spacing(2),
}));

const VoiceService = () => {
  const [packages, setPackages] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      const fetchPackages = async () => {
        try {
          const response = await axios.get("http://localhost:8222/api/v1/package/all/POSTPAIDVOICE", {
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          });
          setPackages(response.data);
        } catch (error) {
          console.error("Failed to fetch packages:", error);
        }
      };

      fetchPackages();
    }
  }, [user]);

  const activatePackage = async (id) => {
    if (!user) {
      alert("You must be logged in to activate a package");
      return;
    }

    try {
      const response = await axios.post(
          `http://localhost:8222/api/package/activate/${user.id}`,
          {
            packageId: id
          },
          {
            headers: {
              'Authorization': `Bearer ${user.accessToken}`,
              'Content-Type': 'application/json'
            }
          }
      );
      if (response.status === 200) {
        alert("Successfully Activated");
      }
    } catch (error) {
      console.error("Failed to activate package:", error);
      alert("Failed to activate package");
    }
  };

  if (!user) {
    return <Typography>Please log in to view voice packages.</Typography>;
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        {packages.map((pkg) => (
          <Grid item xs={12} sm={6} md={4} key={pkg.id}>
            <PackageCard>
              <PackageCardHeader>
                <Typography variant="h5" component="h3">
                  {pkg.name}
                </Typography>
              </PackageCardHeader>
              <PackageCardContent>
                <PriceTypography variant="h4" component="p">
                  Rs.{pkg.price.toFixed(2)}
                </PriceTypography>
                <Typography variant="body2" color="text.secondary">
                  /month
                </Typography>
                <Typography variant="h5" color="primary.main" sx={{ mt: 2, fontWeight: 'bold' }}>
                  Unlimited
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => activatePackage(pkg.id)}
                >
                  Get Package
                </Button>
              </PackageCardContent>
            </PackageCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default VoiceService;