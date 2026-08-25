const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// ১. ভিসা বা পেপারস স্ট্যাটাস চেক করার এপিআই (মক লজিক)
app.post('/api/check-status', (req, res) => {
    const { serviceType, trackingNumber } = req.body;

    if (!trackingNumber) {
        return res.status(400).json({ success: false, message: 'সঠিক ট্র্যাকিং নম্বর বা পাসপোর্ট নম্বর দিন।' });
    }

    // এখানে আপনি রিয়েল এপিআই (API) বা স্ক্র্যাপিং কোড যুক্ত করতে পারবেন
    // সাময়িক ডেমো রেসপন্স:
    setTimeout(() => {
        res.json({
            success: true,
            service: serviceType,
            number: trackingNumber,
            status: 'বৈধ (Active)',
            expiryDate: '2027-12-31',
            message: 'আপনার সেবাটি সফলভাবে যাচাই করা হয়েছে। স্ট্যাটাস সচল রয়েছে।'
        });
    }, 1000);
});

// ২. পেমেন্ট রিসিভ করার এপিআই (বিকাশ/নগদ বা গেমওয়ে সিমুলেশন)
app.post('/api/process-payment', (req, res) => {
    const { amount, paymentMethod, userNumber } = req.body;
    
    // পেমেন্ট প্রসেসিং লজিক এখানে থাকবে
    res.json({
        success: true,
        transactionId: 'TXN-' + Math.floor(Math.random() * 100000000),
        message: `${paymentMethod} এর মাধ্যমে ${amount} টাকা সফলভাবে পেমেন্ট হয়েছে!`
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
