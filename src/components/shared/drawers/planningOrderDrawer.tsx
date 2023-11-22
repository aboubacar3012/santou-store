import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { updateControl } from "@/redux/features/controlsSlice";
import { RootState } from "@/redux/store";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useRouter } from "next/router";
import { BsArrowLeftCircle } from "react-icons/bs";
import { truncateText } from "../../../utils/truncate-text";
import { useState } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  Radio,
} from "@material-tailwind/react";
import { Select, Option } from "@material-tailwind/react";
import { IoCheckmark } from "react-icons/io5";
import { updateTimeToPickup } from "@/redux/features/authSlice";

const PlanningOrderDrawer = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const planningOrderDrawer = useSelector(
    (state: RootState) => state.controls.values.planningOrderDrawer
  );
  const timeToPickup = auth.timeToPickup;
  const [selected, setSelected] = useState<"now" | "later" | null>(null);
  const [day, setDay] = useState<string | null>(null);
  const [period, setPeriod] = useState<string | null>(null);

 


  useEffect(() => {
    if (timeToPickup?.now) setSelected("now");
    else setSelected("later");
  }, [timeToPickup]);

  const handleSave = () => {
    if (day && period && selected === "later") {
      dispatch(updateTimeToPickup({ now: false, day, period }));
      dispatch(updateControl({ planningOrderDrawer: false }));
    } else {
      dispatch(updateTimeToPickup({ now: true, day: null, period: null }));
      dispatch(updateControl({ planningOrderDrawer: false }));
    }
  };


  

  return (
    <Drawer
      placement="bottom"
      open={planningOrderDrawer}
      onClose={() => dispatch(updateControl({ planningOrderDrawer: false }))}
      className="p-4 rounded-t-2xl rounded-t-3xl"
    >
      <div className="flex items-center justify-between">
        <Typography variant="h5" color="blue-gray">
          CRÉNEAU
        </Typography>
        <IconButton
          variant="text"
          color="blue-gray"
          onClick={() =>
            dispatch(updateControl({ planningOrderDrawer: false }))
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </div>

      <div>
        <hr />
        <div>
          <hr />
          <Radio
          onChange={(e) => console.log(e)}
            crossOrigin={undefined}
            name="type"
            label="Maintenant"
            icon={<IoCheckmark className="text-green-500" />}
            checked={selected === "now"}
            onClick={() =>
              dispatch(
                updateTimeToPickup({ now: true, day: null, period: null })
              )
            }
          />
          <hr />
          <Radio
          onChange={(e) => console.log(e)}
            crossOrigin={undefined}
            name="type"
            label="Plannifier pour plus tard"
            icon={<IoCheckmark className="text-green-500" />}
            checked={selected === "later"}
            onClick={() =>
              dispatch(
                updateTimeToPickup({ now: false, day: null, period: null })
              )
            }
          />
          {selected === "later" && (
            <div>
              <div className="my-2">
                <Select
                  onChange={(e: any) => setDay(e)}
                  label="Choisir le jour"
                  value={day ? day : "samedi"}
                >
                  <Option disabled={true} value="lundi">Lundi</Option>
                  <Option disabled={true} value="mardi">Mardi</Option>
                  <Option disabled={true} value="mercredi">Mercredi</Option>
                  <Option disabled={true} value="jeudi">Jeudi</Option>
                  <Option disabled={true} value="vendredi">Vendredi</Option>
                  <Option value="samedi">Samedi</Option>
                  <Option value="dimanche">Dimanche</Option>
                </Select>
              </div>
              <div className="my-2">
                <Select
                  onChange={(e: any) => setPeriod(e)}
                  label="Choisir la période"
                  value={period ? period : "matin"}
                >
                  <Option value="matin">Matin 9h - 12h</Option>
                  <Option value="midi">Midi 12h - 14h</Option>
                  <Option value="soir">Soir 14h - 18h</Option>
                  <Option disabled value="nuit">
                    Nuit 18h - 23h
                  </Option>
                </Select>
              </div>
            </div>
          )}
          <hr />
        </div>
      </div>
      <div className="p-2">
        <Button onClick={handleSave} color="blue" fullWidth>
          Enregistrer
        </Button>
      </div>
    </Drawer>
  );
};

export default PlanningOrderDrawer;
