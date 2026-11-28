export function detectOS() {
  if (typeof navigator === "undefined") return "mac";
  const userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.includes("win")) return "windows";
  if (userAgent.includes("linux")) return "linux";
  return "mac";
}
