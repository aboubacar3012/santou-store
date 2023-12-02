'use client';
import { HeaderNavbar } from '@/components/admin/components/navbar/navbar';
import Orders from '@/components/admin/components/orders/orders';
import { MobileSidebar } from '@/components/admin/components/sidebar/mobile-sidebar';
import { DesktopSidebar } from '@/components/admin/components/sidebar/sidebar';
import isMobileDevice from '@/hooks/isMobileDevice';
import { RootState } from '@/redux/store';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const AdminScreenPage = () => {
  const router = useRouter();
  // const userInfos = useSelector((state: RootState) => state.userInfos);
  const controls = useSelector((state: RootState) => state.controls.values);

  const isMobile = isMobileDevice();

  const PageIndisponible = () => {
    return (
      <div className="flex items-center justify-center">
        <div className="bg-white shadow-md rounded p-4 max-w-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Page Indisponible
          </h2>
          <p className="text-gray-600">
            Cette page n&apos;est pas disponible actuellement. Elle sera bientôt
            disponible. Veuillez réessayer plus tard.
          </p>
        </div>
      </div>
    );
  };

  const pageToShow = () => {
    // if (controls.dashboardScreen) return <PageIndisponible />;
    // else if (controls.ordersScreen) return <PageIndisponible />;
    // else if (controls.summaryScreen) return <PageIndisponible />;
    // else if (controls.articleScreen) return <PageIndisponible />;
    // else if (controls.formulaScreen) return <PageIndisponible />;
    // else if (controls.profileScreen) return <PageIndisponible />;
    // else if (controls.historyScreen) return <PageIndisponible />;
    return <Orders />;
  };

  return (
    //Main container
    <main className="flex flex-col overflow-y-clip h-full ">
      <HeaderNavbar />

      <div className="flex h-full">
        <div className="h-full">
          {!isMobile ? (
            <DesktopSidebar />
          ) : (
            <MobileSidebar />
          )}
        </div>

        <div className="w-full flex justify-center items-start mt-4">
          {/* Ecran a afficher */}
          {pageToShow()}
        </div>
      </div>
    </main>
  );
}


export default AdminScreenPage;