import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useRouter } from "next/router";
 
const CallToVisiteMenu = () => {
  const router = useRouter();

  const handleVisiteMenu = () => {
    router.push("/afrograille?mode=delivery");
  }
  return (
    <Card className="w-full max-w-[48rem] flex-col p-2">
      <CardHeader
        shadow={true}
        floated={false}
        className="m-0 w-full shrink-0 rounded"
      >
        <img
          src="https://kelianfood.com/wp-content/uploads/2022/02/IMG_1261.jpg"
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h6" color="gray" className="mb-2">
          Savourez l&apos;Afrique chez Afrograille!
        </Typography>
        <Typography color="gray" className="mb-2 font-normal">
        Explorez notre menu varié de plats, sauces et de jus faits maison. Laissez-vous emporter par des saveurs uniques et une expérience gustative inoubliable.
        </Typography>
        <div className="flex justify-center items-center">
          <Button onClick={handleVisiteMenu} variant="text" className="flex justify-center items-center gap-2 bg-gray-500">
          <span>Visitez notre menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </Button>
        </div>

   
      </CardBody>
    </Card>
  );
}
export default CallToVisiteMenu;