import {Select} from "@chakra-ui/react";
import React from "react";

interface DDprops {
    devices: any[];
}


export const Devicedropdown:React.FC<DDprops> = ({devices}):JSX.Element => {
    console.log(devices);
    return(
        <Select placeholder="Select Device">
            {
            devices.map((device, key) => <option value={device.label}>{device.label}</option>)
            }
        </Select>
    )
}