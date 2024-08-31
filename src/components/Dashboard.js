import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

const Dashboard = () => {
  const [view, setView] = useState('payment');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line no-use-before-define
  }, [fetchData, view]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchData = async () => {
    setLoading(true);
    let url;
    if (view === 'payment') {
      url = 'http://localhost:9000/api/v1/stations/payments/findbyPhone/2525615733366'; // Replace with your actual endpoint
    } else if (view === 'power_bank_states') {
      url = 'http://localhost:9000/power_bank_states'; // Replace with your actual endpoint
    }
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        console.log("No matching documents.");
        setLoading(false);
        return;
      }

      const fetchedData = await res.json();
      setData(fetchedData.paymentInfo || fetchedData.powerBankInfo); // Adjust according to your response structure
      console.log("Fetched Data:", fetchedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching collection:", error);
      setLoading(false);
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const renderPayment = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Phone Number</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Powerbank ID</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Start Time</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>End Time</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Currency</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Payment Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            data.map((payment, index) => (
              <TableRow key={index}>
                <TableCell>{payment.phoneNumber}</TableCell>
                <TableCell>{payment.powerbankId}</TableCell>
                <TableCell>{formatTimestamp(payment.startTime)}</TableCell>
                <TableCell>{formatTimestamp(payment.endTime)}</TableCell>
                <TableCell>{payment.status}</TableCell>
                <TableCell>${payment.paymentId.amount}</TableCell>
                <TableCell>{payment.paymentId.currency}</TableCell>
                <TableCell>{payment.paymentId.isPaid ? "Paid" : "Unpaid"}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} align="center">
                No user payments found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderPowerBankStates = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Power Bank ID</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Last Updated</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Battery Level (%)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            data.map((powerBank, index) => (
              <TableRow key={index}>
                <TableCell>{powerBank.powerBankId}</TableCell>
                <TableCell>{powerBank.status}</TableCell>
                <TableCell>{formatTimestamp(powerBank.lastUpdated)}</TableCell>
                <TableCell>{powerBank.batteryLevel}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No power bank states found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Dashboard
      </Typography>
      <FormControl fullWidth style={{ marginBottom: '20px' }}>
        <InputLabel id="view-select-label">Select View</InputLabel>
        <Select
          labelId="view-select-label"
          value={view}
          label="Select View"
          onChange={(e) => setView(e.target.value)}
        >
          <MenuItem value="payment">User Payments</MenuItem>
          <MenuItem value="power_bank_states">Power Bank States</MenuItem>
        </Select>
      </FormControl>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <CircularProgress />
        </div>
      ) : (
        <>
          {view === 'payment' && renderPayment()}
          {view === 'power_bank_states' && renderPowerBankStates()}
        </>
      )}
    </Container>
  );
};

export default Dashboard;
