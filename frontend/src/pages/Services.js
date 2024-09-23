import React, { useEffect, useState } from "react";
import { Paper, Card, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DataServices from "../components/DataServices";
import VoiceService from "../components/VoiceServices";

function Services() {
  const [activeTab, setActiveTab] = useState("current");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
      <div>
        <Paper
            sx={{
              position: "relative",
              marginTop: 12,
              padding: 5, // Add padding around Paper
              borderRadius: 3, // Rounded corners for a modern look
            }}
            elevation={3} // Add shadow for depth
        >
          <Card
              className="bill-card"
              sx={{
                backgroundColor: "hsl(233deg 36% 38%)",
                padding: 5,
                borderRadius: 2, // Rounded corners for modern feel
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Softer shadow for depth
              }}
          >
            <Box sx={{flexGrow: 1}}>
              <Grid container spacing={3} columns={16}>
                <Grid item xs={8}>
                  <Button
                      fullWidth
                      className={`tab-button ${
                          activeTab === "current" ? "active" : ""
                      }`}
                      onClick={() => handleTabChange("current")}
                      sx={{
                        backgroundColor: "var(--primary)",
                        color: "white",
                        padding: "12px 16px", // Padding for the button
                        fontSize: "16px", // Increase font size
                        borderRadius: "8px", // Make the button rounded
                        transition: "background-color 0.3s ease", // Smooth transition effect
                        border: activeTab === "current"
                            ? "2px solid #053B50"
                            : "2px solid transparent",
                        "&:hover": {
                          backgroundColor: "#145366", // Slightly darker hover effect
                        },
                      }}
                  >
                    Data services
                  </Button>
                </Grid>
                <Grid item xs={8}>
                  <Button
                      fullWidth
                      className={`tab-button ${
                          activeTab === "past" ? "active" : ""
                      }`}
                      onClick={() => handleTabChange("past")}
                      sx={{
                        backgroundColor: "var(--primary)",
                        color: "white",
                        padding: "12px 16px",
                        fontSize: "16px",
                        borderRadius: "8px",
                        transition: "background-color 0.3s ease",
                        border: activeTab === "past"
                            ? "2px solid black"
                            : "2px solid transparent",
                        "&:hover": {
                          backgroundColor: "#145366",
                        },
                      }}
                  >
                    Voice services
                  </Button>
                </Grid>
              </Grid>
            </Box>

            <Box
                className="tab-content"
                sx={{
                  marginTop: 5, // Add margin between tabs and content
                  padding: 3,
                  borderRadius: 2, // Rounded corners for content box
                  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)", // Slight shadow for content area
                }}
            >
              {activeTab === "current" ? (
                  <div>
                    <DataServices/>
                  </div>
              ) : (
                  <div>
                    <VoiceService/>
                  </div>
              )}
            </Box>
          </Card>
        </Paper>
      </div>
  );
}

  export default Services;
