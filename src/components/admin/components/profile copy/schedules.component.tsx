import {
  Button,
  Card,
  Option,
  CardBody,
  Dialog,
  DialogBody,
  DialogFooter,
  IconButton,
  Input,
  Select,
} from '@material-tailwind/react';
import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

interface HourProps {
  day: string;

  start: string;
  end: string;

  isEditMode: boolean;
  restaurantInfo: any;
}

export default function Schedule({ day, start, end, isEditMode }: HourProps) {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
  };
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    console.log('open');
    setOpen(!open);
  };

  return (
    <>
      <Card className="flex-col mb-5 h-fit">
        <CardBody className="flex flex-col">
          <div className="mb-4">
            <Select value={day} disabled={!isEditMode} label="Jour">
              <Option value="lundi">Lundi</Option>
              <Option value="mardi">Mardi</Option>
              <Option value="mercredi">Mercredi</Option>
              <Option value="jeudi">Jeudi</Option>
              <Option value="vendredi">Vendredi</Option>
              <Option value="samedi">Samedi</Option>
              <Option value="dimanche">Dimanche</Option>
            </Select>
          </div>
          <div className="mt-2">
            <Input
              label="Heure d'ouverture"
              disabled={!isEditMode}
              value={start}
              crossOrigin={undefined}
            />
          </div>
          <div className="mt-2">
            <Input
              label="Heure de fermeture"
              disabled={!isEditMode}
              value={end}
              crossOrigin={undefined}
            />
          </div>
          <div className="mt-2 flex justify-end">
            <IconButton
              className="mx-2"
              disabled={!isEditMode}
              onClick={() => handleOpen()}
            >
              <FaTrash style={{ width: 20, height: 20 }} />
            </IconButton>
          </div>
        </CardBody>
      </Card>
      <Dialog className="w-10" open={open} handler={() => handleOpen()}>
        <DialogBody divider>
          Voulez vous vraiment supprimer cet horaire ?
        </DialogBody>

        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => handleOpen()}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={() => handleOpen()}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
