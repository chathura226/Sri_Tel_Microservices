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

// Styled components with Material UI for enhanced design
const PackageCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default,
  boxShadow: theme.shadows[4],
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(2),
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6],
  },
}));

const PackageCardHeader = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(2),
  borderTopLeftRadius: theme.shape.borderRadius * 2,
  borderTopRightRadius: theme.shape.borderRadius * 2,
  textAlign: 'center',
}));

const PackageCardContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(3),
}));

const PriceTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontWeight: 700,
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
      try {
        const [allPackagesResponse, activePackagesResponse] = await Promise.all([
          axios.get("api/package/all", {
            headers: { 'Authorization': `Bearer ${user.accessToken}` }
          }),
          axios.get(`api/package/active/${user.id}`, {
            headers: { 'Authorization': `Bearer ${user.accessToken}` }
          })
        ]);
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
              'Content-Type': 'application/json',
            }
          }
      );
      if (response.status === 200) {
        alert(`Successfully ${isActive ? 'Deactivated' : 'Activated'}`);
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
      <Grid container spacing={4}>
        {packages.map((pkg) => {
          if (pkg.packageType === "PREPAIDDATA" || pkg.packageType === "POSTPAIDDATA") {
            return (
                <Grid item xs={12} sm={6} md={4} key={pkg.id}>
                  <PackageCard>
                    <PackageCardHeader>
                      <Typography variant="h6" component="h3" className="font-bold">
                        {pkg.name}
                      </Typography>
                    </PackageCardHeader>
                    <PackageCardContent>
                      <PriceTypography variant="h4" component="p" className="text-pink-500">
                        Rs.{pkg.price.toFixed(2)}
                      </PriceTypography>
                      <Typography variant="body2" className="text-gray-500">
                        {pkg.packageType}
                      </Typography>
                      <Button
                          variant="contained"
                          color={isActive ? "secondary" : "primary"}
                          className="mt-4 px-4 py-2 rounded-lg"
                          sx={{ fontWeight: 'bold' }}
                          onClick={() => handlePackageAction(pkg.id, isActive)}
                      >
                        {isActive ? "Deactivate Package" : "Get Package"}
                      </Button>
                    </PackageCardContent>
                  </PackageCard>
                </Grid>
            );
          }
          return null;
        })}
      </Grid>
  );

  if (isLoading) {
    return (
        <Container maxWidth="lg" className="flex justify-center items-center h-screen">
          <CircularProgress />
        </Container>
    );
  }

  if (!user) {
    return (
        <Container maxWidth="lg" className="flex justify-center items-center">
          <Typography variant="h5" className="text-center mt-4">
            Please log in to view packages.
          </Typography>
        </Container>
    );
  }

  return (
      <Container maxWidth="lg" className="py-10">
        <Tabs
            value={tabValue}
            onChange={handleTabChange}
            className="mb-10 border-b border-gray-300" // Increased margin between Tabs and the following content
            indicatorColor="primary"
            textColor="primary"
            centered
            sx={{
              mb: 8,  // Add bottom margin between Tabs and the rendered packages
            }}
        >
          <Tab
              label="Active Packages"
              sx={{
                padding: '16px 32px', // Adjust padding for extra spacing
                color: 'white',
                '&.Mui-selected': {
                  color: 'white',
                  backgroundColor: 'primary.main',
                },
              }}
          />
          <Tab
              label="All Packages"
              sx={{
                padding: '16px 32px',
                color: 'white',
                '&.Mui-selected': {
                  color: 'white',
                  backgroundColor: 'primary.main',
                },
              }}
          />
        </Tabs>

        {/* Render Packages with additional spacing */}
        <Box sx={{ mt: 10 }}> {/* Adds more space between tabs and package content */}
          {tabValue === 0 && renderPackages(activePackages, true)}
          {tabValue === 1 && renderPackages(allPackages, false)}
        </Box>
      </Container>
  );
};

export default DataServices;
