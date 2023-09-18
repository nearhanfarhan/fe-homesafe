import { Redirect } from "expo-router";
import { auth } from "../firebase";

export default function RootPage() {
  return (
    <> 
      {auth.currentUser ? ( 
        <Redirect href="/home" />
      ) : (
        <Redirect href="/login" />
      )}
    </> 
  );
}