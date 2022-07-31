import {useEffect, useMemo} from "react";
import {forOwn, isFunction, isArray} from "lodash";
import {KEY_CODES} from "../constants";

const registeredKeys : { [key: string]: any } = {};


const init = () => {
    document.addEventListener("keydown", (event) => {
        if (event.shiftKey || event.altKey || event.metaKey || event.ctrlKey) {
            return;
        }

        const callbacks = registeredKeys[event.keyCode] || [];

        if (!isArray(callbacks) ||
        !isFunction(callbacks[callbacks.length - 1])) {
            return;
        }

        event.preventDefault();

        /* only the last added callback is called */
        callbacks[callbacks.length - 1]();
    });
};

init();

const registerKeys = (keyMap = {}) => {
    forOwn(keyMap, (callback, keyCode) => {
        if (!isFunction(callback)) {
            throw new Error(`Callback for Key Listener should be a function, got: ${typeof callback}`);
        }

        if (isArray(registeredKeys[keyCode])) {
            registeredKeys[keyCode].push(callback);
        } else {
            registeredKeys[keyCode] = [callback];
        }
    });
};

const unregisterKeys = (keyMap = {}) => {
    forOwn(keyMap, (callback, keyCode) => {
        if (!isFunction(callback)) {
            throw new Error(`Callback for Key Listener should be a function, got: ${typeof callback}`);
        }

        if (isArray(registeredKeys[keyCode])) {
            registeredKeys[keyCode] = registeredKeys[keyCode].filter((cb: any) => cb !== callback);
        }
    });
};

const useBackHandler = (callback: () => void) => {
    const keyMap = useMemo(() => (
        callback ? {[KEY_CODES.BACK]: callback,
            [KEY_CODES.ESC]: callback} : {}
    ), [callback]);

    useEffect(() => {
        registerKeys(keyMap);

        return () => unregisterKeys(keyMap);
    }, [keyMap]);
};

export default useBackHandler;
