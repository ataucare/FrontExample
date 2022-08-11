export function envDisplayFooter(){
    const displayFooter = process.env.VUE_APP_DISPLAY_FOOTER;
    if (!displayFooter) {
      return false;
    }
    return displayFooter == "true";
}