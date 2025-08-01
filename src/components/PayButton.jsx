import React from 'react'
import { RiArrowRightSLine } from "react-icons/ri";
import { FaRupeeSign } from "react-icons/fa";

const PayButton = ({ upiid, pn, am }) => {

    const [url, setURL] = React.useState({ tid: "", tr: "" });


    const handlePaytem = async () => {
        try {
            const randomFourDigit = Math.floor(1000 + Math.random() * 9000);
            const tid = `TID-${Date.now() + randomFourDigit}`;
            const tr = `TR-${Date.now() + randomFourDigit}`;
            setURL({ tid: tid, tr: tr })
            const PayURL = `upi://pay?pa=${upiid}&pn=${pn}&tid=${tid}&tr=${tr}&am=${am}&cu=INR&url=https://hdshort.netlify.app/`;
            console.log("Pay URL:", PayURL);

            const res = await fetch("http://localhost:5000/api/transation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    upiid: upiid,
                    pn: pn,
                    am: am,
                    tid: tid,
                    tr: tr,
                    tn: "Payment for services by HDPay",
                    cu: "INR",
                    call_back_url: "https://hdshort.netlify.app/",
                    PayURL: PayURL
                })
            });

            const data = await res.json();

            if (!res.ok) {
                console.error("Error in payment request:", data);
                return;
            }

            console.log("Payment request successful:", data);

        } catch (error) {
            console.error("Error during payment:", error);
        }
    };

    return (
        <>
            <button
                onClick={handlePaytem}
                className="btn btn-outline h-auto px-4 py-2 border border-gray-200 rounded-full shadow-sm flex items-center space-x-4"
            >
                {/* UPI Icons */}
                <div className="flex items-center space-x-[-8px]">
                    <div className="avatar">
                        <div className="w-10 rounded-full border border-gray-200 bg-white">
                            <img src="./assets/Gpay.webp" alt="GPay" />
                        </div>
                    </div>
                    <div className="avatar">
                        <div className="w-10 rounded-full border border-gray-200 bg-white">
                            <img src="./assets/PhonePe.webp" alt="PhonePe" />
                        </div>
                    </div>
                    <div className="avatar">
                        <div className="w-10 rounded-full border border-gray-200 bg-white">
                            <img src="./assets/Paytm.webp" alt="Paytm" />
                        </div>
                    </div>
                </div>

                {/* Text & Amount */}
                <div className="flex flex-1 items-center justify-between text-left">
                    <div className="ml-2">
                        <p className="text-sm font-semibold text-gray-900">Pay Securely</p>
                        <p className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                            with UPI
                            <span className="flex items-center font-bold">
                                <FaRupeeSign className="text-sm" />
                                {am}
                            </span>
                        </p>
                    </div>
                    <div className="ml-2">
                        <RiArrowRightSLine size={30} className="text-gray-600" />
                    </div>
                </div>
            </button>
            <p>Transtion Id : {url.tid}, Transtion Referance No : {url.tr}</p>
        </>
    );
};

export default PayButton;
