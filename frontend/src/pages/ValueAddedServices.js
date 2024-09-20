import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Box, Container, Grid, Card, CardContent, Button, Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/system';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

const Vas = () => {
  const [ringtones, setRingtones] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/ringing-tones/all')
      .then((response) => {
        setRingtones(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const userId = 1; // Hardcoded user for demo, should be dynamic

  const ActivateRingTone = (id) => {
    axios.post(`http://localhost:8080/api/v1/ringing-tones/activate/${userId}/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setAlertMessage("Successfully Activated!");
          setAlertSeverity("success");
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
              <MusicNoteIcon style={{ fontSize: '100px', color: '#fff' }} />
            </Grid>
          </Grid>
        </Container>
      </BannerContainer>

      <Container>
        <Grid container spacing={3} justifyContent="center">
          {ringtones.map((card) => (
            <Grid item xs={12} sm={6} md={4} key={card.id}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div" textAlign="center" gutterBottom>
                    {card.name}
                  </Typography>
                  <Box display="flex" justifyContent="center" mt={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => ActivateRingTone(card.id)}
                    >
                      Activate Ringing Tone
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Alert for success or failure */}
      <Snackbar open={alertOpen} autoHideDuration={3000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alertSeverity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

// Styled Components
const BannerContainer = styled(Box)(({ theme }) => ({
  backgroundColor: 'hsl(233deg 36% 38%)',
  color: '#fff',
  padding: theme.spacing(6, 0),
  marginBottom: theme.spacing(4),
  textAlign: 'center',
}));

export default Vas;
