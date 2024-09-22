import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Container,
  Grid,
  Tabs,
  Tab,
  CircularProgress,
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

const DataServices = () => {
  const [allPackages, setAllPackages] = useState([]);
  const [activePackages, setActivePackages] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchPackages = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      console.log(user)
      try {
        const [allPackagesResponse, activePackagesResponse] = await Promise.all([
          axios.get("api/package/all", {
            headers: { 'Authorization': `Bearer ${user.accessToken}` }
          }),
          axios.get(`api/package/active/${user.id}`, {
            headers: { 'Authorization': `Bearer ${user.accessToken}` }
          })
        ]);
        console.log(allPackagesResponse.data, activePackagesResponse)
        setAllPackages(allPackagesResponse.data);
        setActivePackages(activePackagesResponse.data);
      } catch (error) {
        console.error("Failed to fetch packages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPackages();
  }, [user]);

  const handlePackageAction = async (id, isActive) => {
    try {
      const endpoint = isActive ? 'deactivate' : 'activate';
      const response = await axios.post(
          `http://localhost:8222/api/package/${endpoint}/${user.id}`,
          { packageId: id },
          {
            headers: {
              'Authorization': `Bearer ${user.accessToken}`,
              'Content-Type': 'application/json'
            }
          }
      );
      if (response.status === 200) {
        alert(`Successfully ${isActive ? 'Deactivated' : 'Activated'}`);
        // Refetch packages to update the UI
        const activeResponse = await axios.get(`api/package/active/${user.id}`, {
          headers: { 'Authorization': `Bearer ${user.accessToken}` }
        });
        setActivePackages(activeResponse.data);
      }
    } catch (error) {
      console.error(`Failed to ${isActive ? 'deactivate' : 'activate'} package:`, error);
      alert(`Failed to ${isActive ? 'deactivate' : 'activate'}`);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const renderPackages = (packages, isActive) => (
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
                      color={isActive ? "secondary" : "primary"}
                      sx={{ mt: 2 }}
                      onClick={() => handlePackageAction(pkg.id, isActive)}
                  >
                    {isActive ? "Deactivate Package" : "Get Package"}
                  </Button>
                </PackageCardContent>
              </PackageCard>
            </Grid>
        ))}
      </Grid>
  );

  if (isLoading) {
    return (
        <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Container>
    );
  }

  if (!user) {
    return (
        <Container maxWidth="lg">
          <Typography variant="h5" sx={{ textAlign: 'center', mt: 4 }}>
            Please log in to view packages.
          </Typography>
        </Container>
    );
  }

  return (
      <Container maxWidth="lg">
        <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="Active Packages" />
          <Tab label="All Packages" />
        </Tabs>
        {tabValue === 0 && renderPackages(activePackages, true)}
        {tabValue === 1 && renderPackages(allPackages, false)}
      </Container>
  );
};

export default DataServices;