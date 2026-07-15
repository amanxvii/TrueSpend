const OAUTH = {
  GOOGLE_OAUTH: "oauth_google",
  OAUTH_GITHUB: "oauth_github",
  OAUTH_APPLE: "oauth_apple",
};

const CATEGORY_KEY = {
  FOOD: "Food",
  TRANSPORT: "Transport",
  GROCERIES: "Groceries",
  ENTERTAINMENT: "Entertainment",
  BILLS: "Bills",
};

const MAP_CATEGORY_TO_ICON = {
  [CATEGORY_KEY.FOOD]:
    "https://cdn-icons-png.flaticon.com/128/5359/5359085.png",
  [CATEGORY_KEY.TRANSPORT]:
    "https://cdn-icons-png.flaticon.com/128/2357/2357242.png",
  [CATEGORY_KEY.GROCERIES]:
    "https://cdn-icons-png.flaticon.com/128/4168/4168659.png",
  [CATEGORY_KEY.ENTERTAINMENT]:
    "https://cdn-icons-png.flaticon.com/128/4423/4423702.png",
  [CATEGORY_KEY.BILLS]:
    "https://cdn-icons-png.flaticon.com/128/9382/9382189.png",
};

const getFullDate = (timestamp: string) => {
  const date = new Date(timestamp);

  const formatted = `${String(date.getDate()).padStart(2, "0")}/${String(
    date.getMonth() + 1,
  ).padStart(2, "0")}/${date.getFullYear()}`;

  return formatted;
};

export { CATEGORY_KEY, getFullDate, MAP_CATEGORY_TO_ICON, OAUTH };
