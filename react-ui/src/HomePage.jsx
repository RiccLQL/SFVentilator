import React, { useState } from "react";

import ButtonSetting from "./ButtonSetting";

export default function HomePage() {
    const [FIO2, setFIO2] = useState(100);

    return <>
        <ButtonSetting
            description={<>Fraction of inspired O<sub>2</sub></>}
            decimalPlaces={0}
            min={21}
            max={100}
            setter={setFIO2}
            setting={<>FIO<sub>2</sub></>}
            settingID="FIO2"
            unit="percentage"
            value={FIO2}
        />
    </>;
}
