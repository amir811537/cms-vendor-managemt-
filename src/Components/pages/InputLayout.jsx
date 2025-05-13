import { useState, useEffect } from "react";
import axios from "axios";
import Home2, { CustomerDetail } from "./Home2";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";

const InputLayout = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    phone: "",
    orderHistory: "",
    sale: "",
  });

  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/cms");
        setAllData(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.toString(), // ensure it's a string
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const now = new Date();
    const formattedDate = now.toLocaleDateString("bn-BD", {
      day: "2-digit",
      month: "long",
      year: "2-digit",
    });

    const newEntry = {
      ...formData,
      date: formattedDate,
    };

    try {
      await axios.post("http://localhost:5000/cms", newEntry);
      setAllData((prev) => [...prev, newEntry]);
      setFormData({
        name: "",
        location: "",
        phone: "",
        orderHistory: "",
        sale: "",
      });
      alert("Data added successfully!");
    } catch (err) {
      console.error("Error submitting data:", err);
      alert("Failed to add data.");
    }
  };

  const handleDownload = async () => {
    setLoading(true);
    const blob = await pdf(<CustomerDetail data={allData} />).toBlob();
    saveAs(blob, "Customer_Report.pdf");
    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen items-center gap-6 p-4 bg-gray-100">
      <div className="w-full max-w-4xl bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Add Customer Data</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Customer Name"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full border p-2 rounded"
            required
          />
          <textarea
            name="orderHistory"
            value={formData.orderHistory}
            onChange={handleChange}
            placeholder="Order Description"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="number"
            name="sale"
            value={formData.sale}
            onChange={handleChange}
            placeholder="Sale Amount (৳)"
            className="w-full border p-2 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>

        <div className="mt-6 text-right">
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            disabled={loading}
          >
            {loading ? "Downloading..." : "Download PDF"}
          </button>
        </div>

        <div className="mt-8">
          <Home2 allData={allData} />
        </div>
      </div>
    </div>
  );
};

export default InputLayout;
