import React from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../config/firebase";
import {
  Container,
  Typography,
  // Table,
  // TableBody,
  // TableCell,
  // TableContainer,
  // TableHead,
  // TableRow,
  // Paper,
  // Typography,
  // CircularProgress,
  // MenuItem,
  // Select,
  // FormControl,
  // InputLabel,
} from "@mui/material";
// import { Timestamp } from "firebase/firestore";

const Dashboard = () => {
  // const [view, setView] = useState('userPayments');
  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetchData();
  // }, [view]);

  // const fetchData = async () => {
  //   setLoading(true);
  //   let collectionName;
  //   if (view === 'userPayments') {
  //     collectionName = 'payment_info';
  //   } else if (view === 'powerBankStates') {
  //     collectionName = 'power_bank_states'; // Replace with your actual collection name
  //   }

  //   try {
  //     const collectionRef = collection(db, collectionName);
  //     const querySnapshot = await getDocs(collectionRef);

  //     if (querySnapshot.empty) {
  //       console.log("No matching documents.");
  //       setLoading(false);
  //       return;
  //     }

  //     const fetchedData = [];
  //     querySnapshot.forEach((doc) => {
  //       fetchedData.push(doc.data());
  //     });

  //     setData(fetchedData);
  //     console.log("Fetched Data:", fetchedData);
  //     setLoading(false);
  //     console.log("Fetched Data:", fetchedData);
  //   } catch (error) {
  //     console.error("Error fetching collection:", error);
  //     setLoading(false);
  //   }
  // };

  // const formatTimestamp = (timestamp) => {
  //   if (timestamp instanceof Timestamp) {
  //     return new Date(timestamp.seconds * 1000);
  //   }
  //   return timestamp;
  // };

  // const renderUserPayments = () => (
  //   <TableContainer component={Paper}>
  //     <Table>
  //       <TableHead>
  //         <TableRow>
  //           <TableCell>User ID</TableCell>
  //           <TableCell>Start Time</TableCell>
  //           <TableCell>Duration (minutes)</TableCell>
  //           <TableCell>Status</TableCell>
  //           <TableCell>Payment Details</TableCell>
  //         </TableRow>
  //       </TableHead>
  //       <TableBody>
  //         {data.length > 0 ? (
  //           data.map((payment, index) => (
  //             <TableRow key={index}>
  //               <TableCell>{payment.userId}</TableCell>
  //               <TableCell>
  //                 {payment.startTime ? formatTimestamp(payment.startTime).toLocaleString() : "N/A"}
  //               </TableCell>
  //               <TableCell>{payment.duration}</TableCell>
  //               <TableCell>{payment.status}</TableCell>
  //               <TableCell>
  //                 {payment.pyaments && payment.pyaments.length > 0 ? (
  //                   <ul style={{ paddingLeft: 0, listStyle: "none" }}>
  //                     {payment.pyaments.map((p, i) => (
  //                       <li key={i}>
  //                         <Typography variant="body2"><strong>Payment ID:</strong> {p.paymentId}</Typography>
  //                         <Typography variant="body2"><strong>Timestamp:</strong> {p.timestamp ? formatTimestamp(p.timestamp).toLocaleString() : "N/A"}</Typography>
  //                         <Typography variant="body2"><strong>Amount:</strong> ${p.amount}</Typography>
  //                         <Typography variant="body2"><strong>Duration:</strong> {p.duration} minutes</Typography>
  //                       </li>
  //                     ))}
  //                   </ul>
  //                 ) : (
  //                   <Typography variant="body2">No payments available</Typography>
  //                 )}
  //               </TableCell>
  //             </TableRow>
  //           ))
  //         ) : (
  //           <TableRow>
  //             <TableCell colSpan={5} align="center">
  //               No user payments found.
  //             </TableCell>
  //           </TableRow>
  //         )}
  //       </TableBody>
  //     </Table>
  //   </TableContainer>
  // );

  // const renderPowerBankStates = () => (
  //   <TableContainer component={Paper}>
  //     <Table>
  //       <TableHead>
  //         <TableRow>
  //           <TableCell>Power Bank ID</TableCell>
  //           <TableCell>Status</TableCell>
  //           <TableCell>Last Updated</TableCell>
  //           <TableCell>Battery Level (%)</TableCell>
  //         </TableRow>
  //       </TableHead>
  //       <TableBody>
  //         {data.length > 0 ? (
  //           data.map((powerBank, index) => (
  //             <TableRow key={index}>
  //               <TableCell>{powerBank.powerBankId}</TableCell>
  //               <TableCell>{powerBank.status}</TableCell>
  //               <TableCell>
  //                 {powerBank.lastUpdated ? formatTimestamp(powerBank.lastUpdated).toLocaleString() : "N/A"}
  //               </TableCell>
  //               <TableCell>{powerBank.batteryLevel}</TableCell>
  //             </TableRow>
  //           ))
  //         ) : (
  //           <TableRow>
  //             <TableCell colSpan={4} align="center">
  //               No power bank states found.
  //             </TableCell>
  //           </TableRow>
  //         )}
  //       </TableBody>
  //     </Table>
  //   </TableContainer>
  // );

  // return (
  //   <Container maxWidth="lg">
  //     <Typography variant="h4" align="center" gutterBottom>
  //       Dashboard
  //     </Typography>
  //     <FormControl fullWidth style={{ marginBottom: '20px' }}>
  //       <InputLabel id="view-select-label">Select View</InputLabel>
  //       <Select
  //         labelId="view-select-label"
  //         value={view}
  //         label="Select View"
  //         onChange={(e) => setView(e.target.value)}
  //       >
  //         <MenuItem value="userPayments">User Payments</MenuItem>
  //         <MenuItem value="powerBankStates">Power Bank States</MenuItem>
  //       </Select>
  //     </FormControl>
  //     {loading ? (
  //       <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
  //         <CircularProgress />
  //       </div>
  //     ) : (
  //       <>
  //         {view === 'userPayments' && renderUserPayments()}
  //         {view === 'powerBankStates' && renderPowerBankStates()}
  //       </>
  //     )}
  //   </Container>
  // );

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Dashboard
      </Typography>
    </Container>
  );
};

export default Dashboard;
