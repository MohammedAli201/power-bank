import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

const PreventDoubleUse = ({ paymentInfo }) => {
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const collectionName = 'payment_info';

      try {
        const collectionRef = collection(db, collectionName);
        const querySnapshot = await getDocs(collectionRef);

        if (querySnapshot.empty) {
          console.log("No matching documents.");
          setLoading(false);
          return;
        }

        const fetchedData = [];
        querySnapshot.forEach((doc) => {
          fetchedData.push(doc.data());
        });
        console.log("Fetched Data:", fetchedData);

        checkForDuplicate(fetchedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching documents: ", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [paymentInfo]);

  const checkForDuplicate = (fetchedPayments) => {
    let foundDuplicate = false;
    fetchedPayments.forEach(paymentDoc => {
      if (paymentDoc.pyaments) {
        paymentDoc.pyaments.forEach(payment => {
          if (payment.mobileNumber === paymentInfo.mobileNumber && payment.paymentId === paymentInfo.paymentId) {
            foundDuplicate = true;
          }
        });
      }
    });

    if (foundDuplicate) {
      setIsDuplicate(true);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isDuplicate) {
    return (
      <div>
        This payment has already been used
      </div>
    );
  }

  return (
    <div>
      This will try to prevent the double use of the service
    </div>
  );
}

export default PreventDoubleUse;
