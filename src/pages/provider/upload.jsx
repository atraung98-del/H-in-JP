
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import ProviderNav from "./Dashboard";
import BackupIcon from "@mui/icons-material/Backup";
import "../design.css";

const API = "http://localhost:8080/api";
const MAX_PHOTOS = 10;

export default function Uploads({ propertyId, accessToken }) {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    property: "",
    rent: "",
    deposit: "",
    date: "",
    floor: "",
    layout: "",
    bedcount: "",
    description: "",
  });

  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  // Effect 1: Create and clean up photo preview URLs.
  useEffect(() => {
    const urls = images.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files || []);
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    const validFiles = selected.filter((file) => {
      if (!allowedTypes.includes(file.type)) {
        alert(`${file.name}: Please select a JPEG, PNG, or WebP image.`);
        return false;
      }
      return true;
    });

    setImages((prev) => {
      const combined = [...prev, ...validFiles];

      if (combined.length > MAX_PHOTOS) {
        alert(`You can upload a maximum of ${MAX_PHOTOS} photos.`);
      }

      return combined.slice(0, MAX_PHOTOS);
    });

    // Allows selecting the same file again later.
    e.target.value = "";
  };

  const deletePhoto = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!propertyId) {
    //   alert("Please select a property before creating a room.");
    //   return;
    // }

    // if (!accessToken) {
    //   alert("Please log in again. Your access token is missing.");
    //   return;
    // }

    setLoading(true);

    try {
      // Step 1: Create the room under the selected property.
      const roomResponse = await axios.post(
        `${API}/properties/${propertyId}/rooms`,
        {
          title: formData.title,
          property_type: formData.property,
          price: Number(formData.rent),
          deposit: Number(formData.deposit),
          available_from: formData.date,
          floor: Number(formData.floor),
          layout: formData.layout,
          description: formData.description,
          bed_count: Number(formData.bedcount),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );

      // Adapt this extraction if your API returns a different JSON shape.
      const room =
        roomResponse.data?.data?.room ??
        roomResponse.data?.data ??
        roomResponse.data?.room ??
        roomResponse.data;

      const roomId = room?.id;

      if (!roomId) {
        throw new Error(
          "Room created, but no room ID was found in the API response."
        );
      }

      // Step 2: Upload photos against the newly created room ID.
      const uploadResults = await Promise.allSettled(
        images.map((file) => {
          const data = new FormData();
          data.append("photo", file);

          return axios.post(
            `${API}/rooms/${roomId}/photos`,
            data,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
              withCredentials: true,
            }
          );
        })
      );

      const successful = uploadResults.filter(
        (result) => result.status === "fulfilled"
      ).length;

      const failed = uploadResults.length - successful;

      if (failed > 0) {
        console.error(
          "Some photos failed:",
          uploadResults.filter((result) => result.status === "rejected")
        );

        alert(
          `Room created successfully. ${successful} photo(s) uploaded; ${failed} photo(s) failed.`
        );
      } else {
        alert(
          `Room created successfully! ${successful} photo(s) uploaded.`
        );
      }

      console.log("Created room:", room);
      console.log("Photo upload results:", uploadResults);

      // Reset the form after room creation.
      setFormData({
        title: "",
        property: "",
        rent: "",
        deposit: "",
        date: "",
        floor: "",
        layout: "",
        bedcount: "",
        description: "",
      });
      setImages([]);
    } catch (error) {
      console.error(
        "Room creation/upload error:",
        error.response?.data || error
      );

      alert(
        error.response?.data?.error?.message ||
        error.response?.data?.message ||
        error.message ||
        "Unable to create the room."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="navigate">
      <ProviderNav />

      <form className="Property-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Room Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Property Type</label>
          <select
            name="property"
            value={formData.property}
            onChange={handleChange}
            required
          >
            <option value="">Select property type</option>
            <option value="Apartment">Apartment</option>
            <option value="One room">One room</option>
            <option value="Share house">Share house</option>
          </select>
        </div>

        <div className="form-group">
          <label>Monthly Rent (¥)</label>
          <input
            type="number"
            name="rent"
            min="0"
            value={formData.rent}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Deposit (¥)</label>
          <input
            type="number"
            name="deposit"
            min="0"
            value={formData.deposit}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Available From</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Floor</label>
          <select
            name="floor"
            value={formData.floor}
            onChange={handleChange}
            required
          >
            <option value="">Select floor</option>
            {[1, 2, 3, 4, 5].map((floor) => (
              <option key={floor} value={floor}>
                {floor}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Layout</label>
          <select
            name="layout"
            value={formData.layout}
            onChange={handleChange}
            required
          >
            <option value="">Select layout</option>
            <option value="1K">1K</option>
            <option value="2K">2K</option>
            <option value="3K">3K</option>
          </select>
        </div>

        <div className="form-group">
          <label>Bed Count</label>
          <input
            type="number"
            name="bedcount"
            min="0"
            value={formData.bedcount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group full-width">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            maxLength={1500}
            rows={6}
            required
          />
        </div>

        <div className="uploadPhoto">
          <h3>Upload Room Photos</h3>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            hidden
            onChange={handleFileChange}
          />

          <div className="imageSession">
            <BackupIcon
              style={{ fontSize: 50, color: "#e32a71" }}
            />
            <p>Choose photos of your room</p>
            <button
              type="button"
              className="uploadBtn"
              onClick={() => fileInputRef.current?.click()}
              disabled={loading}
            >
              Browse Files
            </button>
            <p>{images.length}/{MAX_PHOTOS} photos selected</p>
          </div>

          <div className="photo-grid">
            {previewUrls.map((url, index) => (
              <div className="photo-item" key={`${url}-${index}`}>
                <img
                  src={url}
                  alt={`Room preview ${index + 1}`}
                  width="120"
                  height="90"
                  style={{
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
                <button
                  type="button"
                  onClick={() => deletePhoto(index)}
                  disabled={loading}
                  aria-label={`Remove photo ${index + 1}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="submit">
          <button
            type="button"
            className="cancle"
            onClick={() => {
              setFormData({
                title: "",
                property: "",
                rent: "",
                deposit: "",
                date: "",
                floor: "",
                layout: "",
                bedcount: "",
                description: "",
              });
              setImages([]);
            }}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="submit1"
            disabled={loading}
          >
            {loading ? "Posting..." : "Post Room"}
          </button>
        </div>
      </form>
    </div>
  );
}
