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
        sx={{ position: "relative", marginTop: 15, backgroundColor: "#176B87" }}
      >
        <Card
          className="bill-card"
          sx={{ backgroundColor: "hsl(233deg 36% 38%)", padding: 5 }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} columns={16}>
              <Grid item xs={8}>
                <Button
                  fullWidth
                  className={`tab-button ${
                    activeTab === "current" ? "active" : ""
                  }`}
                  onClick={() => handleTabChange("current")}
                  style={{
                    backgroundColor: "var(--primary)",
                    color: "white",
                    border:
                      activeTab === "current"
                        ? "2px solid #053B50"
                        : "2px solid transparent",
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
                  style={{
                    backgroundColor: "var(--primary)",
                    color: "white",
                    border:
                      activeTab === "past"
                        ? "2px solid black"
                        : "2px solid transparent",
                  }}
                >
                  Voice services
                </Button>
              </Grid>
            </Grid>
          </Box>

          <div className="tab-content">
            {activeTab === "current" ? (
              <div>
                <DataServices />
              </div>
            ) : (
              <div>
                <VoiceService />
              </div>
            )}
          </div>
        </Card>
      </Paper>
    </div>
  );
}

export default Services;
