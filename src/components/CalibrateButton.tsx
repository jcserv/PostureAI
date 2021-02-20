import { Button } from "@chakra-ui/react";

import React from "react";

interface CalibrationProps {
    handler: () => void;
}

export const Calibration:React.FC<CalibrationProps> = ({handler}):JSX.Element => {
    return(
        <Button onClick={handler}>Calibrate</Button>
    )
}