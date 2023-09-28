import { SafeArea } from "capacitor-plugin-safe-area";

type Insets = {
  insets: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
};

export async function setSafeArea() {
  const insets: Insets = await SafeArea.getSafeAreaInsets();
  const { top, bottom, left, right } = insets.insets;

  const safeAreaStyle = `padding-top: ${top}px; padding-bottom: ${bottom}px; padding-left: ${left}px; padding-right: ${right}px;`;
  const nextElement = document.getElementById("__next");
  if (nextElement !== null) {
    nextElement.setAttribute("style", safeAreaStyle);
  }
}
