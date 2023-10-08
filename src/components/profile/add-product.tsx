import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
  Textarea,
} from "@material-tailwind/react";

const AddProduct = () => {
  return (
    <Card className="w-full py-0">
      <CardBody className="flex flex-col gap-2">
        <Input crossOrigin={undefined} label="Nom du produit" size="md" />
        <div>
          <label className="flex  items-center py-2 px-4  bg-white text-blue rounded-lg shadow-lg tracking-wide  border border-blue">
            <svg
              className="w-6 h-6"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <span className="mt-1 px-2 text-base leading-normal">
              Image du produit
            </span>
            <input type="file" className="hidden" />
          </label>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
            JPEG, PNG, JPG (MAX. 800x400px).
          </p>
        </div>
        <Input crossOrigin={undefined} label="Category" size="md" />
        <Input type="number" crossOrigin={undefined} label="Prix" size="md" />
        <Textarea label="Description du produit" />
      </CardBody>
      <CardFooter className="pt-0">
        <Button variant="gradient" fullWidth>
          Enregistrer
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddProduct;
