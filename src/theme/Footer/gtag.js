function googleanalytics() {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "G-G9VC5S5W87", { anonymize_ip: true });
  }
}

export default googleanalytics;
