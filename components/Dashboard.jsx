import { Button } from "@mantine/core";
import React from "react";
import Link from "next/link";
import { auth } from "../firebase/firebase.config";

const Dashboard = () => {
  return (
    <Button bg={"white"} c={"purple"}>
      <Link href={`/dashboard/${auth.currentUser.uid}`}>DASHBOARD</Link>
    </Button>
  );
};

export default Dashboard;
