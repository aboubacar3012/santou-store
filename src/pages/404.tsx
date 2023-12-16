import Link from 'next/link';

const Custom404 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Page non trouvée </h1>
      <p className="text-gray-600 mb-8">Désolé, la page que vous recherchez n&apos;existe pas.</p>
      <Link className="text-blue-500 hover:underline" href="/screens/home-screen">
          Retourner à la page d&apos;accueil
      </Link>
    </div>
  );
};

export default Custom404;
