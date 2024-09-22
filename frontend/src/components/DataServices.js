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

// Import useAuthContext
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

// Hardcoded token for testing
// const TEST_TOKEN = "eyJhbGciOiJIUzM4NCJ9.eyJjcmVhdGVkQXQiOiIyMDI0LTA5LTIwVDEwOjQ1OjM0LjYxMDA4NSIsInJvbGUiOiJjdXN0b21lciIsInJvbGVEZXRhaWxzIjp7ImZpcnN0TmFtZSI6ImNoYXRodXJhIiwibGFzdE5hbWUiOiJsYWtzaGFuIiwibW9iaWxlTnVtYmVyIjoiMDcwMTIzNDU2NyIsImN1c3RvbWVySWQiOiJlYWM1ZGRmOS04ODBjLTQwNGQtODFjZS03NWQxNWE3ZjI3MWIifSwiaWQiOiIzNzBlNGIyNy1mYWRmLTQ1Y2UtYTdmZS00NDMxZDY4NzkxOWIiLCJlbWFpbCI6ImpvaG5AbWlkZGxld2FyZS5sayIsInN1YiI6IjM3MGU0YjI3LWZhZGYtNDVjZS1hN2ZlLTQ0MzFkNjg3OTE5YiIsImlhdCI6MTcyNjgyOTE4MCwiZXhwIjoxNzI2ODMyNzgwfQ.6Pq0zzkTfPiRN9hcq_XYcuL9UJJNJvJlcocowcFKx9FOfnDdLZuOtKIR1dKcnfbl";
const TEST_TOKEN = NaN;

const DataServices = () => {
  const [packages, setPackages] = useState([]);
  const auth = useAuthContext();

  const getToken = () => {
    if (auth && auth.user && auth.user.token) {
      return auth.user.token;
    }
    console.warn("Using hardcoded token. Ensure proper authentication in production.");
    return TEST_TOKEN;
  };

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get("http://localhost:8222/api/package/all", {
          headers: {
            'Authorization': `Bearer ${getToken()}`
          }
        });
        setPackages(response.data);
      } catch (error) {
        console.error("Failed to fetch packages:", error);
      }
    };

    fetchPackages();
  }, [auth]);

  const activatePackage = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:8222/api/package/activate/${id}`,
        null,
        {
          headers: {
            'Authorization': `Bearer ${getToken()}`
          }
        }
      );
      if (response.status === 200) {
        alert("Successfully Activated");
      }
    } catch (error) {
      console.error("Failed to activate package:", error);
      alert("Failed to activate");
    }
  };

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
                  {pkg.packageType}
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

export default DataServices;