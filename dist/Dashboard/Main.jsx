import React from "react";
import {
  Typography,
  Grid,
  Box,
  Paper,
  useMediaQuery,
  useTheme
} from "@mui/material";
import images from "../../assets/pay.jpeg";


const Main = ({ userName }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detect mobile view

  return (
    <Box
      sx={{
        padding: isMobile ? "0px" : "24px", // Add padding on mobile
        backgroundColor: "#1e1e1e",
        minHeight: "100vh",
        margin: isMobile ? "0" : "0 0 -250px 0", // Adjust margins for mobile
        marginBottom: "20px",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // Center content horizontally
        justifyContent: "center", // Center content vertically
      }}
    >
      {/* Welcome Message Section */}
      <Paper
        sx={{
          padding: "16px",
          marginBottom: "24px",
          backgroundColor: "#2c2c2c",
          textAlign: "center",
          width: isMobile ? "100%" : "auto" // Shrink content on mobile
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome back, {userName}
        </Typography>
        <Typography variant="h5">Welcome to your dashboard!</Typography>
      </Paper>

      {/* Summary Section */}
      <Grid
        container
        spacing={4}
        marginBottom={4}
        justifyContent="center" // Center grid items on mobile
      >
        {[
          {
            title: "Total Donations",
            value: "$1,000,000",
            change: "↑ 60.0%",
            color: "lightgreen"
          },
          {
            title: "Active Donors",
            value: "15",
            change: "↓ 6.0%",
            color: "red"
          },
          {
            title: "Total Registrations",
            value: "100",
            change: "↑ 5.0%",
            color: "lightgreen"
          },
          {
            title: "Total Withdrawal",
            value: "$800,000",
            change: "↓ 25.0%",
            color: "lightgreen"
          },
          {
            title: "Active Members",
            value: "180",
            change: "↑ 65.0%",
            color: "lightgreen"
          },
          {
            title: "Total Revenue",
            value: "$500,000",
            change: "↑ 5.0%",
            color: "lightgreen"
          }
        ].map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              sx={{
                padding: 2,
                backgroundColor: "#2c2c2c",
                textAlign: "center",
                width: "100%"
              }}
            >
              <Typography variant="h6">{stat.title}</Typography>
              <Typography variant="h4" color={stat.color}>
                {stat.value}
              </Typography>
              <Typography variant="body2" color={stat.color}>
                {stat.change}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Event Registrations Chart Section */}
      <Box sx={{ marginBottom: 4, width: "100%", textAlign: "center" }}>
        <Typography variant="h6" gutterBottom>
          Event Registrations per month
        </Typography>
        <img
          src={images}
          alt="Event Registrations Chart"
          style={{ width: "100%", maxWidth: "300px", borderRadius: "8px" }} // Responsive image
        />
      </Box>

      {/* Event Table Section */}
      <Box sx={{ width: "90%" }}>
        <Typography variant="h6" gutterBottom>
          Upcoming Events
        </Typography>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left"
          }}
        >
          <thead>
            <tr>
              {["Event Name", "Date", "Speakers", "Status"].map((header, index) => (
                <th key={index} style={{ padding: "8px", textAlign: "left" }}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              {
                name: "Annual Charity Gala",
                date: "2024-10-15",
                organizer: "Hope Foundation",
                status: "Completed"
              },
              {
                name: "Food Drive for the Homeless",
                date: "2024-11-05",
                organizer: "Community Aid",
                status: "In-progress"
              },
              {
                name: "Medical Fundraiser for Children",
                date: "2024-12-01",
                organizer: "Health4All",
                status: "Completed"
              },
              {
                name: "Disaster Relief Campaign",
                date: "2024-12-10",
                organizer: "Red Cross",
                status: "In-progress"
              },
              {
                name: "Christmas Gift Donation Drive",
                date: "2025-01-20",
                organizer: "Holiday Helpers",
                status: "Upcoming"
              },
              {
                name: "Clean Water Initiative",
                date: "2025-02-05",
                organizer: "WaterWorks",
                status: "Upcoming"
              },
              {
                name: "Scholarship Fundraiser",
                date: "2025-03-15",
                organizer: "Education First",
                status: "Upcoming"
              },
              {
                name: "Animal Shelter Support Campaign",
                date: "2025-04-01",
                organizer: "Animal Rescue",
                status: "Completed"
              },
              {
                name: "Community Library Fund Drive",
                date: "2025-05-10",
                organizer: "Books4All",
                status: "Upcoming"
              },
              {
                name: "Cancer Research Donation Campaign",
                date: "2025-06-01",
                organizer: "Cancer Society",
                status: "Upcoming"
              }
            ].map((campaign, index) => (
              <tr key={index}>
                <td style={{ padding: "8px" }}>{campaign.name}</td>
                <td style={{ padding: "8px" }}>{campaign.date}</td>
                <td style={{ padding: "8px" }}>{campaign.organizer}</td>
                <td style={{ padding: "8px" }}>
                  <span
                    style={{
                      padding: "4px 8px",
                      borderRadius: "8px",
                      backgroundColor: campaign.status === "Completed" ? "green" : "blue",
                      color: "#fff"
                    }}
                  >
                    {campaign.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  );
};

export default Main;
