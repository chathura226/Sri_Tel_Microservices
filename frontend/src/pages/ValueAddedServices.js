import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/system";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { useAuthContext } from "../hooks/useAuthContext";

const Vas = () => {
  const { user } = useAuthContext();
  const [config, setConfig] = useState({});
  const [ringtones, setRingtones] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [activeRingtones, setActiveRingtones] = useState([]);

  useEffect(() => {
    if (!user) return;
    const config = {
      headers: { Authorization: `Bearer ${user.accessToken}` },
    }
    setConfig(config);

    axios
      .get("http://localhost:8222/api/ringtones/all", config)
      .then((response) => {
        setRingtones(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios.get(`http://localhost:8222/api/ringtones?customerId=${user.id}`, config)
      .then((response) => {
        setActiveRingtones([response.data]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user]);

  const ActivateRingTone = (id, ringingTone) => {
    axios
      .post(
        `http://localhost:8222/api/ringtones/activate?customerId=${user.id}&ringingToneId=${id}`,
        null,
        config
      )
      .then((response) => {
        if (response.status === 200) {
          setAlertMessage("Successfully Activated!");
          setAlertSeverity("success");
          setActiveRingtones([...activeRingtones, ringingTone]);
        }
      })
      .catch((error) => {
        setAlertMessage("Failed to activate");
        setAlertSeverity("error");
      })
      .finally(() => {
        setAlertOpen(true);
      });
  };

  const DeactivateRingTone = (id) => {
    axios
      .post(
        `http://localhost:8222/api/ringtones/deactivate?customerId=${user.id}`,
        null,
        config
      )
      .then((response) => {
        if (response.status === 200) {
          setAlertMessage("Successfully Deactivated!");
          setAlertSeverity("success");
          setActiveRingtones(activeRingtones.filter(active => active.ringingToneId !== id));
        }
      })
      .catch((error) => {
        setAlertMessage("Failed to deactivate");
        setAlertSeverity("error");
      })
      .finally(() => {
        setAlertOpen(true);
      });
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  return (
    <>
      <BannerContainer>
        <Container>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h4" component="h1" gutterBottom>
                Let callers hear your favorite tune
              </Typography>
              <Typography variant="h6">For just Rs.30/month</Typography>
            </Grid>
            <Grid item>
              <MusicNoteIcon style={{ fontSize: "100px", color: "#fff" }} />
            </Grid>
          </Grid>
        </Container>
      </BannerContainer>

      <Container>
        <Grid container spacing={3} justifyContent="center">
          {ringtones.map((card) => (
            <Grid item xs={12} sm={6} md={4} key={card.ringingToneId}>
              <Card>
                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    textAlign="center"
                    gutterBottom
                  >
                    {card.name}
                  </Typography>
                  <Box display="flex" justifyContent="center" mt={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => ActivateRingTone(card.ringingToneId, card)}
                      style={{ marginRight: "10px" }}
                    >
                      Activate Ringing Tone
                    </Button>
                    {activeRingtones.some(active => active.ringingToneId === card.ringingToneId) && (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => DeactivateRingTone(card.ringingToneId)}
                        >
                          Deactivate Ringing Tone
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Alert for success or failure */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alertSeverity}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

// Styled Components
const BannerContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "hsl(233deg 36% 38%)",
  color: "#fff",
  padding: theme.spacing(6, 0),
  marginBottom: theme.spacing(4),
  textAlign: "center",
}));

export default Vas;
