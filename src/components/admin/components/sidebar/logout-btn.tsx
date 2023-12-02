'use client';
import { BiLogOutCircle } from 'react-icons/bi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

const LogoutBtn = () => {
  // Access the client
  const queryClient = useQueryClient();

  const router = useRouter();
  const dispatch = useDispatch();

  // Mutation
  // const mutation = useMutation(() => logout(), {
  //   onSuccess: () => {
  //     // dispatch(logoutFn());
  //   },
  //   onError: () => {
  //     return;
  //   },
  // });

  const handleLogout = async () => {
    // mutation.mutate();
  };

  return (
    <div className="absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full flex bg-white dark:bg-gray-800 z-20">
      <button
        onClick={handleLogout}
        type="button"
        className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        <BiLogOutCircle className="inline-block w-5 h-5 mr-2" />
        Se déconnecter
      </button>
    </div>
  );
};

export default LogoutBtn;
