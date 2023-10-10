export const GlobalDebug = (() => {
  const savedConsole: Console = console;

  /**
   * @param {boolean} debugOn
   * @param {boolean} suppressAll
   */
  return function (debugOn: boolean, suppressAll: boolean): void {
    const suppress: boolean = suppressAll || false;

    if (!debugOn) {
      // suppress the default console functionality
      console = {} as Console;
      console.log = () => {};

      // suppress all types of consoles
      if (suppress) {
        console.info = () => {};
        console.warn = () => {};
        console.error = () => {};
      } else {
        console.info = savedConsole.info;
        console.warn = savedConsole.warn;
        console.error = savedConsole.error;
      }
    } else {
      console = savedConsole;
    }
  };
})();
