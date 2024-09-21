import { useState } from "react";
// import TopBar from '../components/NavBar';
import { Paper, Card, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PastBills from "../components/PastBills";
import CurrentBill from "../components/CurrentBill";

function MainBillViewer() {
  const [activeTab, setActiveTab] = useState("current"); // 'current' or 'past'

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      {/* <TopBar /> */}
      <Paper
        sx={{
          position: "relative",
          marginTop: 15,
          backgroundColor: "hsl(233deg 36% 38%)",
        }}
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
                  Current Bill
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
                  Past Bills
                </Button>
              </Grid>
            </Grid>
          </Box>
          <div className="tab-content">
            {activeTab === "current" ? (
              <div>
                <CurrentBill />
              </div>
            ) : (
              <div>
                <PastBills />
              </div>
            )}
          </div>
        </Card>
      </Paper>
    </div>
  );
}

export default MainBillViewer;
