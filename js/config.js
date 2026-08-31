window.DT4U = {
  brand: "digitaltech4u",
  tagline: "India's Best Web Agency for Growing Businesses",
  email: "developersoftware.support@gmail.com",
  phoneDisplay: "Email us 24/7",
  address: "B-752 Anand Nagar, Gwalior",
  pincode: "474012",
  fullAddress: "B-752 Anand Nagar, Gwalior, Madhya Pradesh 474012, India",
  stats: {
    customers: "100+",
    developers: "20+",
    startingPrice: "₹4,999",
    response: "24 hours",
    support: "24/7"
  },
  formEndpoint: "https://formsubmit.co/ajax/developersoftware.support@gmail.com",
  zoho: {
    popout: "https://desk.zoho.in/portal/api/feedbackwidget/276969000000361004?orgId=60085600486&displayType=popout",
    embed: "https://desk.zoho.in/portal/api/feedbackwidget/276969000000361004?orgId=60085600486&displayType=embeded",
    iframeScript: "https://desk.zoho.in/portal/api/feedbackwidget/276969000000361004?orgId=60085600486&displayType=iframe",
    iframeSrc: "https://desk.zoho.in/support/fbw?formType=AdvancedWebForm&fbwId=edbsnc17663b2559a719532c7a97509bd6245cb4217a569790e1e48a0e5c08246de23&xnQsjsdp=edbsn9b766b4c1fd9df741d6753e7ec7ba2ae&mode=showNewWidget&displayType=iframe"
  },
  cities: [
    { slug: "bhopal", name: "Bhopal", image: "city-bhopal.png" },
    { slug: "delhi", name: "Delhi", image: "city-delhi.png" },
    { slug: "indore", name: "Indore", image: "city-indore.png" },
    { slug: "gwalior", name: "Gwalior", image: "city-gwalior.png" },
    { slug: "mumbai", name: "Mumbai", image: "city-delhi.png" },
    { slug: "bengaluru", name: "Bengaluru", image: "city-bhopal.png" },
    { slug: "pune", name: "Pune", image: "city-indore.png" },
    { slug: "hyderabad", name: "Hyderabad", image: "city-gwalior.png" },
    { slug: "jaipur", name: "Jaipur", image: "city-delhi.png" },
    { slug: "lucknow", name: "Lucknow", image: "city-bhopal.png" }
  ]
};

window.dt4uBase = function () {
  return document.documentElement.getAttribute("data-base") || ".";
};

window.dt4uUrl = function (path) {
  const base = window.dt4uBase().replace(/\/$/, "");
  return base + "/" + String(path).replace(/^\//, "");
};
