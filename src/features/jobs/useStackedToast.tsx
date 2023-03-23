import { ToastOptions, useIonToast } from "@ionic/react";
import { HookOverlayOptions } from "@ionic/react/dist/types/hooks/HookOverlayOptions";
import { useState } from "react";

/**
 * allow send multiple toasts on top of each other
 * @returns present function
 */
function useStackedToast() {
  const [toast1] = useIonToast();
  const [toast2] = useIonToast();
  const [toast3] = useIonToast();
  const [toast4] = useIonToast();
  const [toast5] = useIonToast();
  const [toast6] = useIonToast();
  const [toast7] = useIonToast();
  const [toast8] = useIonToast();
  const [toast9] = useIonToast();
  const [toast10] = useIonToast();

  const toasts = [
    toast1,
    toast2,
    toast3,
    toast4,
    toast5,
    toast6,
    toast7,
    toast8,
    toast9,
    toast10,
  ];

  const [index, setIndex] = useState(0);

  return function present(options: ToastOptions & HookOverlayOptions) {
    toasts[index](options);
    setIndex((index + 1) % toasts.length);
  };
}

export default useStackedToast;
