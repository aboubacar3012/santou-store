import { useRouter } from "next/router";
import UnavailableComponent from "../../components/unavailable";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import NeedToConnectComponent from "@/components/shared/need-to-connect";

const FavoritesScreenPage = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  if(!isAuthenticated)
  return <NeedToConnectComponent />

  
  return (
    <>
      <UnavailableComponent />
    </>
  )

};

export default FavoritesScreenPage;
