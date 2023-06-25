import { useCallback, useEffect, useState } from "react";

type Something = {
    something: number;
};

export function Dummy(): JSX.Element {
    const [value, setValue] = useState<Something>({ something: 0 });
    const [flag, setFlag] = useState<boolean>(false);

    const handleOnClick = useCallback((): void => {
        setFlag(true);
    }, [setFlag]);

    useEffect(() => {
        console.log(`flag: ${flag}`);

        if (!flag) {
            return;
        }

        console.log(value);

        setFlag(false);

        // This will not trigger an infinite loop
        // setValue({ something: 10 });

        // This will trigger an infinite loop
        Promise.resolve().then(() => {
            setValue({ something: 420 });
        });
    }, [flag, value]);

    return (
        <div>
            <button onClick={handleOnClick}>Trigger</button>
        </div>
    );
}
