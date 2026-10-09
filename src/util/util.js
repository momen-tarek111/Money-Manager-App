export const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return "";

  const numStr = num.toString();
  const parts = numStr.split(".");

  let integerPart = parts[0];
  const fractionalPart = parts[1];

  const lastThree = integerPart.substring(integerPart.length - 3);
  const otherNumbers = integerPart.substring(0, integerPart.length - 3);

  if (otherNumbers !== "") {
    // Insert commas after every 2 digits within the remaining prefix
    const formattedOtherNumbers = otherNumbers.replace(
      /\B(?=(\d{2})+(?!\d))/g,
      ",",
    );
    integerPart = formattedOtherNumbers + "," + lastThree;
  } else {
    integerPart = lastThree;
  }
  // if(fractionalPart){
  //     console.log(fractionalPart)
  //     console.log(`${integerPart}.${fractionalPart}`)
  // }else{
  //     console.log(integerPart)
  // }
  return fractionalPart ? `${integerPart}.${fractionalPart}` : integerPart;
};

export const prepareIncomeLineChartData = (transactions = []) => {
    if (!transactions || transactions.length === 0) return [];

    // 1. Sort transactions chronologically
    const sortedTransactions = [...transactions].sort(
        (a, b) => new Date(a.date) - new Date(b.date),
    );

    // 2. Group incomes by date
    const groupedData = sortedTransactions.reduce((acc, item) => {
    const rawDate = item.date ? item.date.split("T")[0] : "";
    if (!rawDate) return acc;

        // Format date display (e.g. "1st Jul" or "1 Jul")
        const dateObj = new Date(rawDate);
        const day = dateObj.getDate();
        const month = dateObj.toLocaleString("en-US", { month: "short" });

        // Ordinal suffix (1st, 2nd, 3rd, 4th, etc.)
        const getOrdinal = (n) => {
        const s = ["th", "st", "nd", "rd"];
        const v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };
    const formattedDate = `${getOrdinal(day)} ${month}`;

    if (!acc[rawDate]) {
        acc[rawDate] = {
            rawDate,
            date: formattedDate,
            totalAmount: 0,
            details: {}, // Maps category/name -> total for that date
        };
    }

    acc[rawDate].totalAmount += Number(item.amount || 0);

    // Group items by categoryName (or item name if categoryName is missing)
    const categoryKey = item.categoryName || item.name || "Other";
    acc[rawDate].details[categoryKey] =
    (acc[rawDate].details[categoryKey] || 0) + Number(item.amount || 0);

    return acc;
    }, {});

  // 3. Convert object to array for Recharts
  return Object.values(groupedData);
};
export const toLocalISOString = (date = new Date()) => {
  const pad = (num) => String(num).padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  // Calculate local timezone offset in +HH:MM / -HH:MM format
  const offsetMinutes = date.getTimezoneOffset();
  const offsetSign = offsetMinutes > 0 ? "-" : "+";
  const absOffset = Math.abs(offsetMinutes);
  const offsetHours = pad(Math.floor(absOffset / 60));
  const offsetMins = pad(absOffset % 60);

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${offsetSign}${offsetHours}:${offsetMins}`;
};
