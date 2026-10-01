// "Hide results" lives on <html data-hide-results> so plain CSS can hide results before React loads
// (no flash of spoilers). The choice is remembered on this device only.
export const SPOILER_KEY = "gildra-hide-results";
export const SPOILER_ATTR = "data-hide-results";

export const SPOILER_BOOT = `try{if(localStorage.getItem("${SPOILER_KEY}")==="1")document.documentElement.setAttribute("${SPOILER_ATTR}","")}catch(e){}`;
