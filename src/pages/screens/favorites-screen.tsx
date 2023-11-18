import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import UnavailableComponent from "../../components/unavailable";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import NeedToConnectComponent from "@/components/shared/need-to-connect";

declare const window: any;

const MissionsScreen = dynamic(() => import('./missions-screen'), {
  loading: () => (
    <div className="flex justify-content-center align-items-center">
      <h1>Loading .....</h1>
    </div>
  ),
  ssr: false,
});

const FavoritesScreenPage = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  
 

  if(!isAuthenticated)
    return <NeedToConnectComponent />

  
  return (
    <>
      <UnavailableComponent />
      {/* <MissionsScreen /> */}
    </>
  )

};

export default FavoritesScreenPage;
